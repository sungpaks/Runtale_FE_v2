import { Box, Container } from "@mui/material";
import { useState } from "react";
import TitleBar from "../../layouts/Layout/title-bar/TitleBar";

export default function Home() {
	const [userInfo, setUserInfo] = useState(); //api로 가져오기

	return (
		<Container maxWidth="sm">
			<TitleBar hasPreviousButton={false} />
		</Container>
	);
}
