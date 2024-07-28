import styles from "./Signup.module.css";
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Lock from "@mui/icons-material/Lock";
import Flag from "@mui/icons-material/Flag";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { useState } from "react";
import requestApi from "../../api/api";
import { useNavigate } from "react-router-dom";

export default function Signup() {
	const SIZE = 150;

	const [loginId, setLoginId] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [nickname, setNickname] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();
	const [signupSuccess, setSignupSuccess] = useState(false);

	const handleSignup = async () => {
		if (password !== confirmPassword) {
			alert('비밀번호 불일치');
		}

		try {
			const response = await requestApi.post('/users/signup', {
				loginId,
				password,
				nickname,
			});
            navigate('/success', { state: { loginId, password, nickname } });

		} catch (err) {
			if (err.response && err.response.status === 409) {
			    alert('User already exists');
			} else {
				alert('An error occurred');
			}
		}
	};

	return (
		<div className={`${styles["Container"]}`}>
			<div className={`${styles["Content-Container"]}`}>
				<h3>회원가입</h3>
				<div className={`${styles["TextBoxWrap"]}`}>
					<Box sx={{ "& > :not(style)": { m: 1 }, width: "300px" }}>
                        <Box sx={{ display: "flex", alignItems: "flex-end", mb: 2 }}>
							<TextField
								id="nickname"
								label="NAME"
								fullWidth
								placeholder="이름을 입력해 주세요"
								value={nickname}
								onChange={(e) => setNickname(e.target.value)}
								sx={{ marginBottom: "20px" }}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<Flag sx={{ color: "action.active", mr: 1, my: 0.5 }} />
										</InputAdornment>
									),
								}}
							/>
						</Box>
                        <Box sx={{ display: "flex", alignItems: "flex-end", mb: 2 }}>
							<TextField
								id="loginId"
								label="ID"
								fullWidth
								placeholder="사용할 아이디를 입력해 주세요"
								value={loginId}
								onChange={(e) => setLoginId(e.target.value)}
								sx={{ marginBottom: "20px" }}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
										</InputAdornment>
									),
								}}
							/>
						</Box>
						<Box sx={{ display: "flex", alignItems: "flex-end", mb: 2 }}>
							<TextField
								id="password"
								label="PASSWORD"
								fullWidth
								placeholder="사용할 비밀번호를 입력해 주세요"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								sx={{ marginBottom: "20px" }}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<Lock sx={{ color: "action.active", mr: 1, my: 0.5 }} />
										</InputAdornment>
									),
								}}
							/>
						</Box>
						<Box sx={{ display: "flex", alignItems: "flex-end", mb: 2 }}>
							<TextField
								id="confirmPassword"
								label="CONFIRM PASSWORD"
								fullWidth
								placeholder="사용할 비밀번호를 재입력해 주세요"
								type="password"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<Lock sx={{ color: "action.active", mr: 1, my: 0.5 }} />
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
					onClick={handleSignup}
				>
					회원가입
				</Button>
			</div>
			<div className={`${styles["SignupWrap"]}`}>
				<div className={`${styles["SignupText"]}`}>
					이미 계정이 있으신가요?
				</div>
				<div className={`${styles["Signupbtnbox"]}`}>
					<button className={`${styles["Signupbtn"]}`} onClick={() => navigate('/login')}>
						로그인
					</button>
				</div>
			</div>
		</div>
	);
}
