import { Box } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Map } from "react-kakao-maps-sdk";
import Tracker from "./tracker/Tracker";
import { postRunning, getRunning } from "../../api/api";
import { getDistance, getPace } from "../../utils/running_util";
import { useNavigate } from "react-router-dom";
import Status from "./status/Status";
import Scene from "./scene/Scene";
import AudioPlayer, { SOUND } from "../../components/AudioPlayer";
import VolumeControl from "../../components/VolumeControl";
import styles from "./Running.module.css";

interface PathType {
	lat: number;
	lng: number;
}

export default function Running() {
	const geo: Geolocation = navigator.geolocation;
	const [latitude, setLatitude] = useState<number>(0);
	const [longitude, setLongitude] = useState<number>(0);
	const [prevLatitude, setPrevLatitude] = useState<number>(0);
	const [prevLongitude, setPrevLongitude] = useState<number>(0);
	const [runningId, setRunningId] = useState<number>();
	const [distance, setDistance] = useState<number>(0);
	const [pace, setPace] = useState<number>(0);
	const navigate = useNavigate();
	const elapsedTime = useRef(0);
	const geolocationId = useRef(0);
	const geoOption = {
		enableHighAccuracy: true,
		timeout: 5000,
		maximumAge: 0,
	};
	const [locations, setLocations] = useState<PathType[]>([]);
	const [showScenario, setShowScenario] = useState(true);
	const [checkpointAudioFile, setCheckpointAudioFile] = useState<string>("");
	const MAX_WIDTH = "480px";
	const [isSoundEnd, setIsSoundEnd] = useState(true);

	const refreshPosition = () => {
		/** 위치 정보 새로 가져옴 */
		geo.getCurrentPosition(
			(g) => {
				setLatitude((prev) => {
					setPrevLatitude(prev);
					return g.coords.latitude;
				});
				setLongitude((prev) => {
					setPrevLongitude(prev);
					return g.coords.longitude;
				});
			},
			undefined,
			geoOption,
		);
	};

	const updatePositionManualy = (map) => {
		/** 맵 드래그하여 수동으로 위치 업데이트 (테스트용) */
		const current = map.getCenter();
		setLatitude((prev) => {
			setPrevLatitude(prev);
			return current.getLat();
		});
		setLongitude((prev) => {
			setPrevLongitude(prev);
			return current.getLng();
		});
	};

	// async function startNewRunning() {
	// 	/** 새롭게 러닝 상태를 시작함 */
	// 	console.log("new running");
	// 	await postRunning({
	// 		distance: distance,
	// 		pace: pace,
	// 		targetPace: 0, //실제 목표 페이스 추가
	// 		targetDistance: 0, //실제 목표 거리 추가
	// 		scenarioId: 1, //실제 시나리오 id 추가
	// 		latitude: latitude,
	// 		longitude: longitude,
	// 	})
	// 		.then((res) => {
	// 			setRunningId(res.data.data.id);
	// 			localStorage.setItem("runningId", res.data.data.id.toString());
	// 		})
	// 		.catch((err) => console.log(err));
	// 	refreshPosition();
	// }

	async function getPrevRunningInfo(prevRunningInfo) {
		/** 이전 러닝 정보를 가져와 복원 */
		setRunningId(prevRunningInfo.data.data.id);
		setDistance(prevRunningInfo.data.data.distance);
		setLocations(
			prevRunningInfo.data.data.locations.map((location) => ({
				lat: location.latitude,
				lng: location.longitude,
			})),
		);
		setPace(prevRunningInfo.data.data.pace);
	}

	const handleClickPlusButton = () => {
		setIsSoundEnd(false);
		setTimeout(() => {
			setLongitude((prev) => prev + 0.001125);
			setTimeout(() => {
				setLatitude((prev) => prev + 0.001125);
				setTimeout(() => {
					setLongitude((prev) => prev - 0.001125);
					setTimeout(() => {
						setLatitude((prev) => prev - 0.001125);
						setIsSoundEnd(true);
					}, 500);
				}, 500);
			}, 500);
		}, 500);
	};

	const onClickEnd = async () => {
		/** 러닝 끝내기 */
		let targetPace;
		try {
			const res = await postRunning({
				id: runningId,
				endTime: new Date(Date.now()),
				distance: distance,
				pace: pace,
				longitude: longitude,
				latitude: latitude,
			});
			targetPace = res.data.data.targetPace;
		} catch (err) {
			navigate("/error");
		}
		elapsedTime.current = parseInt(localStorage.getItem("curTime"));
		localStorage.removeItem("runningId");
		localStorage.removeItem("curTime");
		navigate("/running/end", {
			state: {
				distance: distance,
				pace: pace,
				time: elapsedTime.current,
				targetPace: targetPace,
			},
		});
	};

	/** 마운트 시 위치 이벤트 리스너 등록 */
	useEffect(() => {
		const checkPrevRunning = async () => {
			/** 이전 러닝 정보가 있는지 먼저 확인 */
			const prevRunningId = localStorage.getItem("runningId");
			if (!prevRunningId) return [false, undefined];
			const runningId = parseInt(prevRunningId);
			const prevRunningInfo = await getRunning({ runningId });
			return [
				prevRunningInfo.data.data.status === "IN_PROGRESS",
				prevRunningInfo,
			];
		};
		checkPrevRunning().then((res) => {
			const [hasPrevRunning, prevRunningInfo] = res;
			if (hasPrevRunning) {
				//기존에 러닝이 진행 중이었음 : 복원
				getPrevRunningInfo(prevRunningInfo);
			} else {
				//기존 러닝 없으면 home으로 redirect
				navigate("/home");
			}
		});

		/** geolocation position 이벤트 리스너 등록 */
		const geoId = geo.watchPosition(
			(g) => {
				if (g.coords.accuracy > 100) return;
				setLatitude((prev) => {
					setPrevLatitude(prev);
					return g.coords.latitude;
				});
				setLongitude((prev) => {
					setPrevLongitude(prev);
					return g.coords.longitude;
				});
			},
			undefined,
			geoOption,
		);
		geolocationId.current = geoId;

		return () => {
			if (geolocationId) geo.clearWatch(geoId);
		};
	}, []);

	/** 위치 정보 바뀌면, 거리 페이스 러닝 상태 등 갱신 */
	useEffect(() => {
		if (!latitude || !longitude) return;

		const curDistance = getDistance(
			prevLatitude,
			prevLongitude,
			latitude,
			longitude,
		);

		if (distance > 3.5) {
			onClickEnd();
			return;
		}

		const curPace = getPace(
			distance,
			parseInt(localStorage.getItem("curTime")) | 0.001,
		);
		postRunning({
			scenarioId: 1,
			id: runningId,
			distance: distance + curDistance,
			pace: curPace,
			latitude: latitude,
			longitude: longitude,
		})
			.then((res) => {
				console.log(res.data.data);
				if (res.data.data.audioUrl) {
					setCheckpointAudioFile(res.data.data.audioUrl);
				}
			})
			.catch((error) => {});
		setDistance((prev) => prev + curDistance);
		setPace(curPace);
	}, [latitude, longitude]);

	if (latitude === 0 || longitude === 0) {
		refreshPosition();
	}
	return (
		<Box>
			{showScenario ? (
				<Scene distance={distance} pace={pace} />
			) : latitude === 0 || longitude === 0 ? (
				<>잠시만요... 지도를 준비중입니다</>
			) : (
				<>
					<Map
						center={{ lat: latitude, lng: longitude }}
						style={{
							width: "100%",
							height: "70vh",
							zIndex: 0,
							position: "fixed",
							top: 0,
							maxWidth: MAX_WIDTH,
						}}
						level={2}
					>
						<Tracker
							longitude={longitude}
							latitude={latitude}
							locations={locations}
						/>
					</Map>
					<Box
						sx={{
							position: "fixed",
							top: 0,
							left: "50%",
							transform: "translateX(-50%)",
							zIndex: 3,
							width: "auto",
							backgroundColor: "white",
							display: "inline-block",
							whiteSpace: "nowrap",
						}}
					>
						*PC웹에서는 정확한 위치 반영이 어렵습니다.*
					</Box>
				</>
			)}
			<Box
				sx={{
					position: "fixed",
					bottom: "0",
					width: "100%",
					maxWidth: MAX_WIDTH,
					height: "80px",
				}}
			>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-evenly",
					}}
				>
					<button
						className={styles.button}
						onClick={handleClickPlusButton}
						disabled={!isSoundEnd}
					>
						{isSoundEnd ? "이동하기 (DEMO)" : "wait.. "}
					</button>

					<button className={styles.button} onClick={onClickEnd}>
						러닝 종료
					</button>
					<button
						className={styles.button}
						onClick={() => setShowScenario((prev) => !prev)}
					>
						{!showScenario ? "시나리오 화면" : "지도 보기"}
					</button>
				</Box>
				<AudioPlayer filename={SOUND.뛰는소리} play loop />
				<AudioPlayer filename={SOUND.바람소리} play loop />
				{checkpointAudioFile ? (
					<AudioPlayer
						filename={checkpointAudioFile}
						play
						setCheckpointAudioFile={setCheckpointAudioFile}
						setIsEnd={setIsSoundEnd}
					/>
				) : undefined}
				<VolumeControl />
				{/* <RandomEffectSound /> */}
				<Status distance={distance} pace={pace} />
			</Box>
		</Box>
	);
}
