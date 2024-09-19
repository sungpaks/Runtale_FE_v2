import { useState, useEffect, useContext } from "react";
import styles from "./SetPace.module.css";
import Title from "../../components/Title";
import { Box, Button } from "@mui/material";
import requestApi from "../../api/api";
import AuthContext from "../../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { getRunning } from "../../api/api";
import PaceInput from "./pace-input/PaceInput";
import CharactersSlideShow from "./characters-slide-show/CharactersSlideShow";

export default function SetDistance() {
	const [nickname, setNickname] = useState("");
	const [minutes, setMinutes] = useState("");
	const [seconds, setSeconds] = useState("");
	const { userId, isAuthenticated } = useContext(AuthContext);
	const navigate = useNavigate();
	const location = useLocation();
	const { scenarioId } = location.state;
	const prevRunningId = localStorage.getItem("runningId");
	const [showCharacters, setShowCharaters] = useState(false);

	useEffect(() => {
		if (!prevRunningId) return;
		const runningId = parseInt(prevRunningId);
		getRunning({ runningId })
			.then((res) => {
				if (res.data.data.status === "IN_PROGRESS") {
					navigate("/running");
				}
				/**
				 * TODO : 이 타이밍에 "이전 러닝 진행상황 복구할까?말까?를 물어보면 좋을 듯 !"
				 */
			})
			.catch(() => {
				localStorage.removeItem("runningId");
				localStorage.removeItem("curTime");
			});
	});

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

	if (scenarioId >= 2) {
		return (
			<>
				<h1>돈내세용</h1>
				<Button variant="outlined" onClick={() => navigate(-1)}>
					뒤로가기
				</Button>
			</>
		);
	}
	if (showCharacters) {
		return (
			<CharactersSlideShow
				minutes={minutes}
				seconds={seconds}
				scenarioId={scenarioId}
			/>
		);
	}
	return (
		<Box p={1} className={styles["set-pace-container"]}>
			<div className={`${styles["Content-Container"]}`}>
				<Box component="picture">
					<PaceInput
						minutes={minutes}
						handleMinutesChange={handleMinutesChange}
						seconds={seconds}
						handleSecondsChange={handleSecondsChange}
					/>
				</Box>
				<Title level={2} style={{ color: "#909090" }}>
					<span
						style={{
							color: "#F5B65D",
							fontWeight: "bold",
						}}
					>
						{nickname}
					</span>{" "}
					님의 <br /> 목표 페이스
				</Title>
				<p style={{ margin: 0, fontSize: "13px", color: "#909090" }}>
					* 🔊시나리오 진행 시 이어폰 착용을 권장합니다 *
				</p>
				<button
					className={styles["start-button"]}
					onClick={() => setShowCharaters(true)}
				>
					시나리오 시작하기
				</button>
			</div>
		</Box>
	);
}
