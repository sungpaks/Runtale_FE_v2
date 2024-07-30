import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Map, MapMarker, Polyline } from "react-kakao-maps-sdk";
import Tracker from "./tracker/Tracker";

interface PathType {
	lat: number;
	lng: number;
}

export default function Running() {
	const geo: Geolocation = navigator.geolocation;
	const [latitude, setLatitude] = useState<number>(0);
	const [longitude, setLongitude] = useState<number>(0);
	const [testMode, setTestMode] = useState<boolean>(false);

	const trackerTest = (map) => {
		const current = map.getCenter();
		setLatitude(current.getLat());
		setLongitude(current.getLng());
	};

	/** 마운트 시 위치 이벤트 리스너 등록 */
	useEffect(() => {
		const geoId = geo.watchPosition((g) => {
			setLatitude(g.coords.latitude);
			setLongitude(g.coords.longitude);
		});

		return () => geo.clearWatch(geoId);
	}, []);

	return (
		<Box>
			{latitude === 0 || longitude === 0 ? undefined : (
				<Map
					center={{ lat: latitude, lng: longitude }}
					style={{ width: "100%", height: "500px" }}
					level={2}
					onDragEnd={testMode ? (map) => trackerTest(map) : undefined}
				>
					<Tracker longitude={longitude} latitude={latitude} />
				</Map>
			)}
			<Button
				variant={testMode ? "contained" : "outlined"}
				onClick={() => {
					setTestMode((prev) => !prev);
				}}
			>
				TEST {testMode ? "ON" : "OFF"}
			</Button>
		</Box>
	);
}
