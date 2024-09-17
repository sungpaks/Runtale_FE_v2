import styles from "./Signup.module.css";
import * as React from "react";
import { useState } from "react";
import requestApi from "../../api/api";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

export default function Signup() {
	const SIZE = 150;

	const [step, setStep] = useState(1); // 현재 단계
	const [loginId, setLoginId] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [nickname, setNickname] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();
	const [signupSuccess, setSignupSuccess] = useState(false);

	const handleNextStep = () => {
		if (step < 4) {
			setStep(step + 1);
		} else {
			handleSignup(); // 마지막 단계에서는 회원가입 처리
		}
	};

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
				<h3 style={{ fontFamily: 'Chosunilbo_myungjo' }}>회원가입</h3>
				<p className={styles.StepIndicator}>
					<span className={step === 1 ? styles.ActiveStep : styles.InactiveStep}>1</span> &nbsp;
					<span className={step === 2 ? styles.ActiveStep : styles.InactiveStep}>2</span> &nbsp;
					<span className={step === 3 ? styles.ActiveStep : styles.InactiveStep}>3</span> &nbsp;
					<span className={step === 4 ? styles.ActiveStep : styles.InactiveStep}>4</span>
				</p>
				<div className={`${styles["TextBoxWrap"]}`}>
					{step === 1 && (
						<input
							type="text"
							placeholder="이름을 입력해주세요."
							value={nickname}
							onChange={(e) => setNickname(e.target.value)}
							className={styles.InputField}
						/>
					)}

					{step === 2 && (
						<input
							type="text"
							placeholder="사용할 아이디를 입력해주세요."
							value={loginId}
							onChange={(e) => setLoginId(e.target.value)}
							className={styles.InputField}
						/>
					)}

					{step === 3 && (
						<input
							type="password"
							placeholder="사용할 비밀번호를 입력해주세요."
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className={styles.InputField}
						/>
					)}

					{step === 4 && (
						<input
							type="password"
							placeholder="다시 한번 비밀번호를 입력해주세요."
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							className={styles.InputField}
						/>
					)}
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
						onClick={handleNextStep}
					>
					</Button>
					<span className={`${styles["LoginText"]}`}>{step === 4 ? '회원가입 하기' : '다음'}</span>
				</div>
			<div className={`${styles["SignupWrap"]}`}>
				<div className={`${styles["SignupText"]}`}>
					이미 계정이 있으신가요?
				</div>
				<div className={`${styles["Signupbtnbox"]}`}>
					<button
						onClick={() => navigate("/login")}
						className={`${styles["Signupbtn"]}`}
						style={{ fontFamily: "Chosunilbo_myungjo", color: "#F5B65DCC", background: "none" }}
					>
						로그인
					</button>
				</div>
			</div>
		</div>
	);
}
