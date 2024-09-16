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
				<h3 style={{ fontFamily: 'Chosunilbo_myungjo' }}>로그인</h3>
				<div className={`${styles["TextBoxWrap"]}`}>
					<div className={styles.inputGroup}>
						<input
							type="text"
							id="loginId"
							placeholder="ID"
							value={loginId}
							onChange={(e) => setLoginId(e.target.value)}
							className={styles.customInput}
						/>
						<span className={styles.iconRight}>
							<svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path fillRule="evenodd" clipRule="evenodd" d="M8.90456 3.67061C9.10822 3.4409 9.2662 3.38734 9.36863 3.38734C9.47106 3.38734 9.62904 3.4409 9.8327 3.67061C10.0358 3.89973 10.2418 4.26006 10.425 4.74862C10.7499 5.61496 10.9727 6.80225 11.0177 8.14398H7.71953C7.7646 6.80225 7.98734 5.61496 8.31222 4.74862C8.49543 4.26006 8.70142 3.89973 8.90456 3.67061ZM6.71008 8.14398C6.75538 6.70414 6.99333 5.39223 7.36753 4.39437C7.46641 4.13069 7.577 3.883 7.69957 3.65762C5.76511 4.3043 4.3313 6.04426 4.13165 8.14398H6.71008ZM4.1317 9.1529H6.7101C6.75544 10.5925 6.99338 11.9042 7.36753 12.902C7.46641 13.1657 7.57701 13.4133 7.69958 13.6387C5.76528 12.9921 4.33155 11.2524 4.1317 9.1529ZM7.71955 9.1529H11.0177C10.9726 10.4944 10.7499 11.6815 10.425 12.5477C10.2418 13.0363 10.0358 13.3966 9.8327 13.6257C9.62904 13.8554 9.47106 13.909 9.36863 13.909C9.2662 13.909 9.10822 13.8554 8.90456 13.6257C8.70142 13.3966 8.49543 13.0363 8.31222 12.5477C7.98739 11.6815 7.76466 10.4944 7.71955 9.1529ZM12.0272 9.1529C11.9818 10.5925 11.7439 11.9042 11.3697 12.902C11.2708 13.1657 11.1602 13.4133 11.0377 13.6387C12.972 12.9921 14.4057 11.2524 14.6056 9.1529H12.0272ZM15.6384 8.64261C15.6354 5.18248 12.8295 2.37842 9.36863 2.37842C5.90594 2.37842 3.09888 5.18548 3.09888 8.64817C3.09888 12.1109 5.90594 14.9179 9.36863 14.9179C12.8293 14.9179 15.6351 12.1142 15.6384 8.65431C15.6384 8.65236 15.6384 8.6504 15.6384 8.64844C15.6384 8.64649 15.6384 8.64455 15.6384 8.64261ZM14.6056 8.14398H12.0272C11.9819 6.70414 11.7439 5.39223 11.3697 4.39437C11.2708 4.13069 11.1603 3.883 11.0377 3.65762C12.9721 4.3043 14.406 6.04426 14.6056 8.14398Z" fill="#909090" />
							</svg>
						</span>
					</div>

					<div className={styles.inputGroup}>
						<input
							type="password"
							id="password"
							placeholder="PASSWORD"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className={styles.customInput}
						/>
						<span className={styles.iconRight}>
							<svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M15.3026 6.07062L14.7663 6.00358L15.3026 6.07062C15.3724 5.51293 15.0646 4.97641 14.548 4.75501L9.86537 2.74816C9.54813 2.6122 9.18903 2.6122 8.87178 2.74816L4.18913 4.75501C3.67254 4.97641 3.3648 5.51293 3.43451 6.07062L3.93632 10.0851C4.08931 11.309 4.70152 12.4291 5.64907 13.2187L8.56121 15.6455C9.0289 16.0353 9.70826 16.0353 10.176 15.6455L13.0881 13.2187C14.0356 12.4291 14.6478 11.309 14.8008 10.0851L15.3026 6.07062Z" stroke="#909090" stroke-width="1.08099" stroke-linecap="round" />
								<path d="M7.02644 9.369L9.05779 11.4004C9.21858 11.5611 9.48627 11.5346 9.6124 11.3454L12.4915 7.02686" stroke="#909090" stroke-width="1.08099" stroke-linecap="round" />
							</svg>
						</span>
					</div>
				</div>
				<div className={`${styles["bottom-Wrap"]}`}>
					<Button
						variant="contained"
						disableElevation
						sx={{
							width: "234px",
							height: "50px",
							backgroundColor: "#624925",
							borderRadius: "100px",
							color: "#FFFFFF",
							fontWeight: "bold",
							fontFamily: "Chosunilbo_myungjo",
							background: "rgba(245, 182, 93, 0.3)",
							filter: "blur(4px)",
							"&:hover": {
								background: "rgba(245, 182, 93, 0.4)",
							},
						}}
						onClick={handleLogin}
					>
					</Button>
					<span className={`${styles["LoginText"]}`}>로그인</span>
				</div>
			</div>
			<div className={`${styles["SignupWrap"]}`}>
				<div className={`${styles["SignupText"]}`}>
					아직 회원이 아니신가요?
				</div>
				<div className={`${styles["Signupbtnbox"]}`}>
					<button
						onClick={() => navigate("/signup")}
						className={`${styles["Signupbtn"]}`}
						style={{ fontFamily: "Chosunilbo_myungjo", color: "#F5B65DCC", background: "none" }}
					>
						회원가입
					</button>
				</div>
			</div>
		</div>
	);
}
