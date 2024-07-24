import { Box, Button, Container } from "@mui/material";
import { useContext, useState } from "react";
import TitleBar from "../../layouts/Layout/title-bar/TitleBar";
import AuthContext from "../../context/AuthContext";
import requestApi from "../../api/api";
import Profile from "./profile/Profile";
import Tutorial from "./tutorial/Tutorial";

export default function Home() {
	const { userId, setUserId } = useContext(AuthContext);
	const [userInfo, setUserInfo] = useState(); //api로 가져오기
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

	return (
		<Box p={2}>
			<Profile />
			<Tutorial />
			<Box height="400px"></Box>
			<Button variant="outlined" onClick={handleLogout} sx={{ marginBottom: '80px' }}>
				로그아웃
			</Button>
		</Box>
	);
}
