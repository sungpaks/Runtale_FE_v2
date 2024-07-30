import { Box, Grid } from "@mui/material";
import {
	getFormattedDistance,
	getFormattedPace,
	getFormattedTime,
} from "../../../utils/running_util";
import { useEffect, useState } from "react";
import Title from "../../../components/Title";
import "./Status.css";

interface StatusPropsType {
	distance: number;
	startTime: number;
	pace: number;
}

export default function Status({ distance, startTime, pace }: StatusPropsType) {
	const km = getFormattedDistance(distance);
	const [time, setTime] = useState<number>(startTime);
	const [minutes, seconds] = getFormattedTime(time);
	const [paceMinutes, paceSeconds] = getFormattedPace(pace);
	const TIME_INTERVAL = 1000;

	useEffect(() => {
		const interval = setInterval((e) => {
			setTime((prev) => prev + TIME_INTERVAL);
		}, TIME_INTERVAL);

		return () => {
			clearInterval(interval);
		};
	}, []);

	return (
		<Box
			m={1}
			mt={4}
			sx={{
				// display: "flex",
				// justifyContent: "space-evenly",
				// alignItems: "center",
				height: "100px",
				borderRadius: 3,
				backgroundColor: "#DCE9F5",
			}}
		>
			<Grid container spacing={2}>
				<Grid item xs={4}>
					<span className="bitter">{km}</span>km
					<Title level={3}>달린 거리</Title>
				</Grid>
				<Grid item xs={4}>
					<span className="bitter">
						{pace === Infinity ? "-" : paceMinutes}
					</span>
					<Title level={3}>평균 페이스</Title>
				</Grid>
				<Grid item xs={4}>
					<span className="bitter">{minutes}</span>분
					<span className="bitter">{seconds}</span>초
					<Title level={3}>시간</Title>
				</Grid>
			</Grid>
		</Box>
	);
}
