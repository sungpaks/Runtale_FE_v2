import { Box, Button, Container } from "@mui/material";
import { useContext, useState } from "react";
import TitleBar from "../../layouts/Layout/title-bar/TitleBar";
import AuthContext from "../../context/AuthContext";
import requestApi from "../../api/api";

export default function Home() {
	const { userId, setUserId } = useContext(AuthContext);
	const [userInfo, setUserInfo] = useState(); //api로 가져오기
	const handleLogout = async () => {
		const response = await requestApi
			.post("/logout")
			.then((res) => {
				setUserId(-1);
			})
			.catch((err) => console.log(err));
	};

	return (
		<div>
			<TitleBar hasPreviousButton={false} />

			<Button variant="outlined" onClick={handleLogout}>
				로그아웃
			</Button>
		</div>
	);
}
