import styles from "./Login.module.css";
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Lock from "@mui/icons-material/Lock";
import Button from "@mui/material/Button";
import { useState, useContext } from "react";
import requestApi from "../../api/api";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
	const [loginId, setLoginId] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const authContext = useContext(AuthContext);
	const navigate = useNavigate();

	const handleLogin = async () => {
		try {
			const response = await requestApi.post("/login", {
				loginId,
				password,
			});
			console.log(response);
			authContext.setUserId(0);
			setError("");
			if (response.data.data)
				authContext.setUserId(response.data.data.userId);
		} catch (err) {
			if (err.response && err.response.status === 401) {
				setError("Invalid credentials");
			} else {
				setError("An error occurred");
			}
		}
	};

	return (
		<div className={`${styles["Container"]}`}>
			<div className={`${styles["Content-Container"]}`}>
				<h3>로그인</h3>
				<div className={`${styles["TextBoxWrap"]}`}>
					<Box sx={{ "& > :not(style)": { m: 1 }, width: "300px" }}>
						<Box
							sx={{
								display: "flex",
								alignItems: "flex-end",
								mb: 2,
							}}
						>
							<TextField
								id="loginId"
								label="ID"
								fullWidth
								value={loginId}
								onChange={(e) => setLoginId(e.target.value)}
								sx={{ marginBottom: "20px" }} // 각 TextField 간에 간격 추가
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<AccountCircle
												sx={{
													color: "action.active",
													mr: 1,
													my: 0.5,
												}}
											/>
										</InputAdornment>
									),
								}}
							/>
						</Box>
						<Box
							sx={{
								display: "flex",
								alignItems: "flex-end",
								mb: 2,
							}}
						>
							<TextField
								id="password"
								label="PASSWORD"
								fullWidth
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<Lock
												sx={{
													color: "action.active",
													mr: 1,
													my: 0.5,
												}}
											/>
										</InputAdornment>
									),
								}}
							/>
						</Box>
					</Box>
				</div>
				<Button
					variant="contained"
					disableElevation
					sx={{
						mt: 2,
						width: "300px",
						height: "50px",
						backgroundColor: "#1890FF", // 원하는 배경색
						color: "#FFFFFF", // 원하는 텍스트 색
						fontWeight: "bold", // 텍스트 두께
						"&:hover": {
							backgroundColor: "#096DD9", // 호버 시 배경색
						},
					}}
					onClick={handleLogin}
				>
					로그인
				</Button>
			</div>
			<div className={`${styles["SignupWrap"]}`}>
				<div className={`${styles["SignupText"]}`}>
					아직 회원이 아니신가요?
				</div>
				<div className={`${styles["Signupbtnbox"]}`}>
					<button
						onClick={() => navigate("/signup")}
						className={`${styles["Signupbtn"]}`}
					>
						회원가입
					</button>
				</div>
			</div>
		</div>
	);
}
