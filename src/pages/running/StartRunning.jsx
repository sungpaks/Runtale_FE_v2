import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import styles from "./StartRunning.module.css";

export default function StartRunning() {
	const [countdown, setCountdown] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		let timer;

		if (countdown !== null && countdown > 0) {
			timer = setTimeout(() => {
				setCountdown((prevCountdown) =>
					prevCountdown ? prevCountdown - 1 : 0,
				);
			}, 1000);
		} else if (countdown === 0) {
			navigate("/running");
		}

		return () => clearTimeout(timer);
	}, [countdown, navigate]);

	const handleStartRunning = () => {
		setCountdown(3);
		localStorage.removeItem("runningId");
		localStorage.removeItem("curTime");
	};

	return (
		<div className={styles.Container}>
			{countdown !== null ? (
				<div className={styles.CountdownContainer}>
					<p className={styles.Countdown}>{countdown}</p>
				</div>
			) : (
				<>
					<Button
						variant="contained"
						disableElevation
						sx={{
							borderRadius: "100px",
							width: "200px",
							height: "70px",
							backgroundColor: "#FB8C26",
							color: "#FFFFFF",
							fontFamily: "Pretendard-bold",
							"&:hover": {
								backgroundColor: "#DD7D24",
							},
							fontSize: "25px",
						}}
						onClick={handleStartRunning}
					>
						러닝 시작
					</Button>
					<Button
						variant="contained"
						disableElevation
						sx={{
							mt: 4,
							borderRadius: "100px",
							width: "100px",
							height: "50px",
							backgroundColor: "#303335",
							color: "#FFFFFF",
							fontFamily: "Pretendard-regular",
							"&:hover": {
								backgroundColor: "#202223",
							},
							fontSize: "15px",
						}}
						onClick={() => navigate(-1)}
					>
						중단
					</Button>
				</>
			)}
		</div>
	);
}
