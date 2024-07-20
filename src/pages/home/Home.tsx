import { Button } from "@mui/material";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import requestApi from "../../api/api";

export default function Home() {
	const { userId, setUserId } = useContext(AuthContext);
	const handleLogout = async () => {
		const response = await requestApi
			.post("/logout")
			.then((res) => {
				setUserId(-1);
			})
			.catch((err) => console.log(err));
	};
	return (
		<>
			<h1>HOME</h1>
			<Button variant="outlined" onClick={handleLogout}>
				로그아웃
			</Button>
		</>
	);
}
