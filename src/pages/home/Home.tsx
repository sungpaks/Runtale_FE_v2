import { Box, Button, Container } from "@mui/material";
import { useContext, useState } from "react";
import TitleBar from "../../layouts/Layout/title-bar/TitleBar";
import AuthContext from "../../context/AuthContext";
import requestApi from "../../api/api";
import Profile from "./profile/Profile";
import Tutorial from "./tutorial/Tutorial";
import TopPercentage from "./toppercentage/TopPercentage";
import { useQuery } from "react-query";
import { getUserTier, getUserInfo } from "../../api/api";

export interface Tier {
	description: string;
	imageUrl: string;
	percentile: number;
	tierName: string;
}
export interface UserInfo {
	id: number;
	loginId: string;
	nickname: string;
}

export default function Home() {
	const { userId, setUserId } = useContext(AuthContext);
	const { isSuccess: userTierSuccess, data: userTier } = useQuery({
		queryKey: "userTier",
		queryFn: async () => await getUserTier({ userId }),
	});
	const { isSuccess: userInfoSuccess, data: userInfo } = useQuery({
		queryKey: "userInfo",
		queryFn: async () => await getUserInfo({ userId }),
	});

	const handleLogout = async () => {
		const response = await requestApi
			.post("/logout")
			.then((res) => {})
			.catch((err) => {
				console.log(err);
			});
		setUserId(-1); //에러 떠도 강제로 로그아웃
		//에러가 지금 expire time 지나면 로그아웃이 먹통인가봄. 그럴만하긴해
	};
	if (!userTierSuccess || !userInfoSuccess) return;
	const tier: Tier = userTier.data.data;
	const user: UserInfo = userInfo.data.data;
	console.log(user, tier);
	return (
		<Box p={2}>
			<Profile tier={tier} username={user.nickname} userId={user.id} />
			<TopPercentage />
			<Tutorial />
			<Box height="400px"></Box>
			<Button
				variant="outlined"
				onClick={handleLogout}
				sx={{ marginBottom: "80px" }}
			>
				로그아웃
			</Button>
		</Box>
	);
}
