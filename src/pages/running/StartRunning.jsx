import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import styles from "./StartRunning.module.css";
import { postRunning } from "../../api/api";

export default function StartRunning() {
	const [countdown, setCountdown] = useState(null);
	const navigate = useNavigate();
	const location = useLocation();
	const targetPace = location.state.targetPace;
	const geo = navigator.geolocation;
	const position = useRef({ latitude: 0, longitude: 0 });

	useEffect(() => {
		geo.getCurrentPosition((g) => {
			position.current.latitude = g.coords.latitude;
			position.current.longitude = g.coords.longitude;
		});
	}, []);

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
		localStorage.removeItem("runningId");
		localStorage.removeItem("curTime");
		postRunning({
			distance: 0,
			pace: 0,
			targetPace: targetPace,
			targetDistance: 3, //실제 값 추가
			scenarioId: 1, //실제 값 추가
			latitude: position.current.latitude,
			longitude: position.current.longitude,
		}).then((res) => {
			localStorage.setItem("runningId", res.data.data.id.toString());
		});

		setCountdown(3);
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
