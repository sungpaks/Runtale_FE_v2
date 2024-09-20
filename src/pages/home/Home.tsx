import { Box, Button } from "@mui/material";
import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import requestApi from "../../api/api";
import Profile from "./profile/Profile";
import Tutorial from "./tutorial/Tutorial";
import TopPercentage from "./toppercentage/TopPercentage";
import { useQuery } from "react-query";
import { getUserTier, postLogout } from "../../api/api";
import CustomFadeLoader from "../../components/CustomFadeLoader";
import { Padding } from "@mui/icons-material";

export interface Tier {
	description: string;
	imageUrl: string;
	percentile: number;
	tierName: string;
	nickname: string;
	progress: number;
}

export default function Home() {
	const { userId, setUserId } = useContext(AuthContext);
	const { isSuccess, data } = useQuery({
		queryKey: "userTier",
		queryFn: async () => await getUserTier({ userId }),
	});

	const handleLogout = async () => {
		const response = await postLogout();
		if (response?.data?.status !== 200) console.log(response);
		setUserId(-1); //에러 떠도 강제로 로그아웃
		//에러가 지금 expire time 지나면 로그아웃이 먹통인가봄. 그럴만하긴해
	};
	if (!isSuccess) return <CustomFadeLoader />;
	const tier: Tier = data.data.data;
	return (
		<Box p={2} position="relative">
			<Box mb={-9}>
				<Profile tier={tier} username={tier.nickname} userId={userId} />
			</Box>
			<Box mb={6}>
				<TopPercentage />
			</Box>
			<Tutorial />
		</Box>
	);
}
