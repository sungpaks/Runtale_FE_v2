import { Box, Button } from "@mui/material";
import { getFormattedDistance } from "../../../utils/running_util";
import Title from "../../../components/Title";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface RunningResult {
	distance: number;
	pace: number;
}

function CurrentRunningRecord({ distance, pace }: RunningResult) {
	const km = getFormattedDistance(distance);
	return (
		<Box>
			러닝 기록 보는 페이지.
			<br />
			<br />총 거리 : {`${km}km`} <br />
			페이스 : {pace}
		</Box>
	);
}

export default function RunningEnd({ distance, pace }: RunningResult) {
	const navigate = useNavigate();
	const [showRecord, setShowRecord] = useState<boolean>(false);

	return showRecord ? (
		<CurrentRunningRecord distance={distance} pace={pace} />
	) : (
		<Box
			sx={{
				position: "fixed",
				top: 0,
				display: "flex",
				flexDirection: "column",
				backgroundColor: "#1890FF",
				height: "95vh",
				overflow: "hidden",
				color: "white",
				justifyContent: "center",
			}}
		>
			<Title level={2}>
				축하해요! <br />
				무사히 러닝을 완주했습니다!
			</Title>
			<img src={"running_end.png"} width="100%" />
			<div style={{ display: "flex", justifyContent: "space-evenly" }}>
				<Button
					variant="outlined"
					sx={{ backgroundColor: "white", borderRadius: 3 }}
					onClick={() => {
						navigate("/home");
					}}
				>
					<strong>종료하기</strong>
				</Button>

				<Button
					variant="contained"
					sx={{
						backgroundColor: "lightgray",
						color: "black",
						borderRadius: 3,
					}}
					onClick={() => {
						setShowRecord(true);
					}}
				>
					<strong>기록보기</strong>
				</Button>
			</div>
		</Box>
	);
}
