import { Box, Button } from "@mui/material";
import {
	getFormattedDistance,
	getFormattedTime,
	getFormattedPace,
} from "../../../utils/running_util";
import Title from "../../../components/Title";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import AuthContext from "../../../context/AuthContext";
import { getUserInfo } from "../../../api/api";
import "./RunningEnd.css";

interface RunningResult {
	distance: number;
	pace: number;
	time: number;
}

function CurrentRunningRecord({ distance, pace, time }: RunningResult) {
	const km = getFormattedDistance(distance);
	const { userId } = useContext(AuthContext);
	const { isLoading, isError, data } = useQuery({
		queryKey: "userInfo",
		queryFn: async () => await getUserInfo({ userId }),
	});
	const [minutes, seconds] = getFormattedTime(time);
	const [paceMinutes, paceSeconds] = getFormattedPace(pace);
	if (isLoading) return <h1>로딩중..</h1>;
	if (isError) return <h1>에러아님</h1>;
	const name = data.data.data.nickname;
	return (
		<Box
			sx={{
				m: 3,
				color: "gray",
				fontSize: "larger",
				fontFamily: "Pretendard-bold",
				textAlign: "left",
			}}
		>
			<div>
				<strong>{name}님의</strong>
			</div>
			<div>
				<strong>오늘 러닝 기록을 확인해볼까요? </strong>`
			</div>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "flex-start",
					color: "black",
					justifyContent: "space-evenly",
					height: "75vh",
				}}
			>
				<Box>
					<Title level={3}>총 거리</Title>
					<div>
						<span className="bitter-large">{km}</span>km
					</div>
				</Box>
				<Box>
					<Title level={3}>총 시간</Title>
					<div>
						<span className="bitter-large">{minutes}</span>m
						<span className="bitter-large">{seconds}</span>s
					</div>
				</Box>
				<Box>
					<Title level={3}>평균 페이스</Title>
					<div>
						<span className="bitter-large">{paceMinutes}</span>m
						<span className="bitter-large">{paceSeconds}</span>s
					</div>
				</Box>
				<Box>
					<Title level={3}>목표 페이스</Title>
					<div>
						<span className="bitter-large">{0}</span>m
						<span className="bitter-large">{0}</span>s
					</div>
				</Box>
				<Box>
					<Title level={3}>목표 페이스 달성</Title>
					<div className="success">성공</div>
				</Box>
			</Box>
		</Box>
	);
}

export default function RunningEnd({}) {
	const navigate = useNavigate();
	const location = useLocation();
	const { distance, pace, time } = location.state;
	const [showRecord, setShowRecord] = useState<boolean>(false);

	return showRecord ? (
		<CurrentRunningRecord distance={distance} pace={pace} time={time} />
	) : (
		<Box
			sx={{
				position: "fixed",
				top: 0,
				display: "flex",
				flexDirection: "column",
				backgroundColor: "#1890FF",
				height: "95vh",
				width: "100%",
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
