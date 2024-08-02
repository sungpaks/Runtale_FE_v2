import React, { useEffect, useRef, useState } from "react";
import { MapMarker, Polyline } from "react-kakao-maps-sdk";

interface PathType {
	lat: number;
	lng: number;
}

export default function Tracker({
	latitude,
	longitude,
	locations,
}: {
	latitude: number;
	longitude: number;
	locations: { lat: number; lng: number }[];
}) {
	const [path, setPath] = useState<PathType[]>([...locations]);

	useEffect(() => {
		setPath(locations);
	}, [locations]);
	useEffect(() => {
		setPath((prev) => [...prev, { lat: latitude, lng: longitude }]);
	}, [latitude, longitude]);
	return (
		<>
			<MapMarker position={{ lat: latitude, lng: longitude }}></MapMarker>
			<Polyline
				path={path}
				strokeWeight={10} // 선의 두께 입니다
				strokeColor={"red"} // 선의 색깔입니다
				strokeOpacity={0.7} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
				strokeStyle={"solid"} // 선의 스타일입니다
			/>
			<Polyline
				path={path}
				strokeWeight={5} // 선의 두께 입니다
				strokeColor={"yellow"} // 선의 색깔입니다
				strokeOpacity={0.7} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
				strokeStyle={"solid"} // 선의 스타일입니다
			/>
		</>
	);
}
