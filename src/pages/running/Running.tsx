import { Box, Button } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Map, MapMarker, Polyline } from "react-kakao-maps-sdk";
import Tracker from "./tracker/Tracker";
import { postRunning, getRunning } from "../../api/api";
import { getDistance, getPace } from "../../utils/running_util";
import { useNavigate } from "react-router-dom";
import RunningEnd from "./end/RunningEnd";
import Status from "./status/Status";

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
	const [testMode, setTestMode] = useState<boolean>(false);
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

	const onClickEnd = async (e) => {
		/** 러닝 끝내기 */
		await postRunning({
			id: runningId,
			endTime: new Date(Date.now()),
			distance: distance,
			pace: pace,
			targetPace: 0, //실제 값 넣어야 함
			targetDistance: 0, //실제 값 넣어야 함
			scenarioId: 1, //실제 값 넣어야 함
			longitude: longitude,
			latitude: latitude,
		}).then((res) => {
			//console.log(res.data.data);
		});
		elapsedTime.current = parseInt(localStorage.getItem("curTime"));
		localStorage.removeItem("runningId");
		localStorage.removeItem("curTime");
		navigate("/running/end", {
			state: {
				distance: distance,
				pace: pace,
				time: elapsedTime.current,
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
		setDistance((prev) => prev + curDistance);

		const curPace = getPace(
			distance,
			parseInt(localStorage.getItem("curTime")) | 0.001,
		);
		setPace(curPace);

		postRunning({
			scenarioId: 1, //실제 시나리오 넣어야 함
			id: runningId,
			distance: distance + curDistance,
			pace: curPace,
			targetPace: 0, //실제 목표 페이스, 거리 넣어야 함
			targetDistance: 0,
			latitude: latitude,
			longitude: longitude,
		});
	}, [latitude, longitude]);

	if (latitude === 0 || longitude === 0) {
		refreshPosition();
	}
	return (
		<Box>
			{latitude === 0 || longitude === 0 ? undefined : (
				<Map
					center={{ lat: latitude, lng: longitude }}
					style={{ width: "100%", height: "70vh", zIndex: 0 }}
					level={2}
					onDragEnd={
						testMode
							? (map) => updatePositionManualy(map)
							: undefined
					}
				>
					<Tracker
						longitude={longitude}
						latitude={latitude}
						locations={locations}
					/>
				</Map>
			)}
			<Status distance={distance} pace={pace} />
			<Button
				variant={testMode ? "contained" : "outlined"}
				onClick={() => {
					setTestMode((prev) => !prev);
					if (testMode) {
						geo.clearWatch(geolocationId.current);
						geolocationId.current = 0;
					} else {
						geolocationId.current = geo.watchPosition((g) => {
							setLatitude((prev) => {
								setPrevLatitude(prev);
								return g.coords.latitude;
							});
							setLongitude((prev) => {
								setPrevLongitude(prev);
								return g.coords.longitude;
							});
						});
					}
				}}
			>
				TEST {testMode ? "ON" : "OFF"}
			</Button>
			<Button
				variant="outlined"
				onClick={() => {
					refreshPosition();
				}}
			>
				위치 새로고침
			</Button>

			<Button variant={"outlined"} onClick={onClickEnd}>
				러닝 그만하기
			</Button>
		</Box>
	);
}
