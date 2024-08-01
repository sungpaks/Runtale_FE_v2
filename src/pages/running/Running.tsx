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
	const [startTime, setStartTime] = useState(0);
	const [distance, setDistance] = useState<number>(0);
	const [pace, setPace] = useState<number>(0);
	const [isEnd, setIsEnd] = useState<boolean>(false);
	const geolocationId = useRef(0);
	const geoOption = {
		enableHighAccuracy: true,
		timeout: 5000,
		maximumAge: 0,
	};
	const locations = useRef([]);

	const refreshPosition = () => {
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

	async function startNewRunning() {
		console.log("new running");
		await postRunning({
			distance: distance,
			pace: pace /* TODO : 여기에 목표 페이스, 거리 추가 */,
		}).then((res) => {
			setRunningId(res.data.data.id);
			localStorage.setItem("runningId", res.data.data.id.toString());
		});
		refreshPosition();
		setStartTime(Date.now());
	}

	async function getPrevRunningInfo(prevRunningInfo) {
		console.log("prev running exists");
		setRunningId(prevRunningInfo.data.data.id);
		setDistance(prevRunningInfo.data.data.distance);
		locations.current = prevRunningInfo.data.data.locations.map(
			(location) => ({ lat: location.latitude, lng: location.longitude }),
		);

		//setPace(prevRunningInfo.data.data.pace);
	}

	const onClickEnd = (e) => {
		postRunning({
			id: runningId,
			endTime: new Date(Date.now()),
			distance: distance,
			pace: pace,
		}).then((res) => {
			localStorage.removeItem("runningId");
			localStorage.removeItem("curTime");
			console.log(res.data.data);
		});
		setIsEnd(true);
	};

	/** 마운트 시 위치 이벤트 리스너 등록 */
	useEffect(() => {
		const checkPrevRunning = async () => {
			const prevRunningId = localStorage.getItem("runningId");
			if (!prevRunningId) return [false, undefined];
			const runningId = parseInt(prevRunningId);
			const prevRunningInfo = await getRunning({ id: runningId });
			return [
				prevRunningInfo.data.data.status === "IN_PROGRESS",
				prevRunningInfo,
			];
		};
		checkPrevRunning().then((res) => {
			const [hasPrevRunning, prevRunningInfo] = [...res];
			if (hasPrevRunning) {
				//기존에 러닝이 진행 중이었는데 새로고침함
				getPrevRunningInfo(prevRunningInfo);
			} else {
				//새로 러닝 시작
				startNewRunning();
			}
		});

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
			id: runningId,
			distance: distance + curDistance,
			pace: curPace,
			latitude: latitude,
			longitude: longitude,
		});
	}, [latitude, longitude]);

	if (isEnd) {
		return <RunningEnd distance={distance} pace={pace} />;
	}
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
						locations={locations.current}
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
