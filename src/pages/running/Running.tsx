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

	const trackerTest = (map) => {
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

	const onClickStart = (e) => {
		postRunning({ distance: distance, pace: pace }).then((res) => {
			setRunningId(res.data.data.id);
		});
		refreshPosition();
		setStartTime(performance.now());
	};
	const onClickEnd = (e) => {
		postRunning({
			id: runningId,
			endTime: new Date(Date.now()),
			distance: distance,
			pace: pace,
		}).then((res) => console.log(res.data.data));
		setIsEnd(true);
	};

	/** 마운트 시 위치 이벤트 리스너 등록 */
	useEffect(() => {
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

		const curPace = getPace(curDistance, performance.now() - startTime);

		postRunning({
			id: runningId,
			distance: distance + curDistance,
			pace: curPace,
		});

		setDistance((prev) => prev + curDistance);
		setPace(curPace);
	}, [latitude, longitude]);

	if (!runningId)
		return (
			<Button
				sx={{ justifyContent: "center" }}
				variant="contained"
				onClick={onClickStart}
			>
				러닝 시작하기!
			</Button>
		);
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
					<Tracker longitude={longitude} latitude={latitude} />
				</Map>
			)}
			<Status distance={distance} startTime={startTime} pace={pace} />
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
