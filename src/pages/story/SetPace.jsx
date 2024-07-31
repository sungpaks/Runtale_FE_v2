import { useState, useEffect, useContext } from "react";
import AnimalCrawls from "../../components/AnimalCrawls";
import styles from "./SetPace.module.css";
import Title from "../../components/Title";
import { Box, Button } from "@mui/material";
import requestApi from "../../api/api";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function SetDistance() {
	const SIZE = 200;
	const [nickname, setNickname] = useState("");
	const [minutes, setMinutes] = useState("");
	const [seconds, setSeconds] = useState("");
	const { userId, isAuthenticated } = useContext(AuthContext);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchNickname = async () => {
			if (!isAuthenticated || userId < 0) return;
			try {
				const response = await requestApi.get(`/users/${userId}`);
				if (response.data.status === 200) {
					setNickname(response.data.data.nickname);
				} else {
					console.error(
						"Error fetching nickname:",
						response.data.message,
					);
				}
			} catch (error) {
				console.error("Error fetching nickname:", error);
			}
		};

		fetchNickname();
	}, [isAuthenticated, userId]);

	const handleMinutesChange = (e) => {
		setMinutes(e.target.value);
	};

	const handleSecondsChange = (e) => {
		setSeconds(e.target.value);
	};

	/*const handleSubmit = async () => {
		if (!isAuthenticated || userId < 0 || pace <= 0) return;
		const pace = `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
		try {
			const response = await requestApi.post(
				`/users/${userId}/set-pace`,
				{ pace },
			);
			if (response.data.status === 200) {
				console.log("Pace set successfully");
			} else {
				console.error("Error setting pace:", response.data.message);
			}
		} catch (error) {
			console.error("Error setting pace:", error);
		}
	};*/

	return (
		<Box p={1}>
			<Title
				level={2}
				style={{
					textAlign: "left",
					marginBottom: "30px",
				}}
			>
				<AnimalCrawls animal="🐌" />
			</Title>
			<div className={`${styles["Content-Container"]}`}>
				<h2>
					<span
						style={{
							color: "#1890FF",
							fontFamily: "Pretendard-bold",
						}}
					>
						{nickname}
					</span>{" "}
					님의 오늘 목표 페이스
				</h2>
				<div className={styles.distanceInputContainer}>
					<div className={styles.minuteWrap}>
						<input
							type="number"
							className={styles.distanceInput}
							min="0"
							value={minutes}
							onChange={handleMinutesChange}
						/>
						<span
							style={{
								fontFamily: "Pretendard-bold",
								fontSize: "25px",
							}}
						>
							m
						</span>
					</div>
					<div className={styles.secondWrap}>
						<input
							type="number"
							className={styles.distanceInput}
							min="0"
							max="59"
							value={seconds}
							onChange={handleSecondsChange}
						/>
						<span
							style={{
								fontFamily: "Pretendard-bold",
								fontSize: "25px",
							}}
						>
							s
						</span>
					</div>
				</div>
				<Box component="picture">
					<source
						srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f3c1/512.webp"
						type="image/webp"
					/>
					<img
						src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f3c1/512.gif"
						alt="🏁"
						width={SIZE}
						height={SIZE}
					/>
				</Box>
				<p style={{ margin: 0, fontSize: "13px", color: "#626773" }}>
					오늘도 재밌게 달려볼까요? <br />
					Runtale은 언제나 {nickname} 님의 건강한 러닝을 응원합니다!
				</p>
				<Button
					variant="contained"
					disableElevation
					sx={{
						mt: 1,
						borderRadius: "100px",
						width: "300px",
						height: "50px",
						backgroundColor: "#1890FF",
						color: "#FFFFFF",
						fontFamily: "Pretendard-bold",
						"&:hover": {
							backgroundColor: "#096DD9",
						},
					}}
					onClick={() => navigate("/startrunning")}
				>
					시나리오 시작!
				</Button>
			</div>
		</Box>
	);
}
