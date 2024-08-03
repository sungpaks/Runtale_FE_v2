import { Box, Grid } from "@mui/material";
import AnimalCrawls from "../../components/AnimalCrawls";
import Title from "../../components/Title";
import { getRunningRecordMonthly } from "../../api/api";
import { useQuery } from "react-query";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";

export default function Statistics() {
	const { userId } = useContext(AuthContext);
	const { isSuccess, data } = useQuery({
		queryKey: "monthlyRecords",
		queryFn: async () => await getRunningRecordMonthly({ userId }),
	});

	if (!isSuccess) return null;

	const {
		averagePace,
		runningList,
		targetDistanceAchievedCount,
		targetPaceAchievedCount,
		totalDistance,
		totalRunningCount,
	} = data.data.data;

	// 예시 데이터 추가
	const exampleData = [
		{ date: "2024-07-07", distance: 2 },
		{ date: "2024-07-11", distance: 4 },
		{ date: "2024-07-14", distance: 7 },
		{ date: "2024-07-25", distance: 6 },
		{ date: "2024-07-27", distance: 5 },
	];

	const formattedData = runningList.length > 0 ? runningList.map((run) => ({
		date: new Date(run.createdDate).getDate(),
		distance: run.distance,
	})) : exampleData.map((run) => ({
		date: new Date(run.date).getDate(),
		distance: run.distance,
	}));

	const currentDate = new Date();
	const currentMonth = currentDate.toLocaleString("ko-KR", { month: "long" });
	const currentYear = currentDate.getFullYear();

	return (
		<Box p={1}>
			<Title
				style={{
					textAlign: "left",
					marginBottom: "50px",
				}}
				level={2}
			>
				<AnimalCrawls />
			</Title>

			<Box sx={{ textAlign: "left" }}>
				<h2 style={{ marginLeft: "15px", fontFamily: "Pretendard-bold" }}>이달의 기록</h2>
				<Box
					sx={{
						display: "flex",
						padding: 2,
						height: "300px",
						flexDirection: "column",
						textAlign: "center",
						marginLeft: "-40px",
					}}
				>
					<Box sx={{ marginLeft: "40px" }}>
						{`${currentYear}년 ${currentMonth}`}
					</Box>
					<ResponsiveContainer>
					<BarChart data={formattedData}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="date" label={{ value: '일', position: 'insideBottomRight', offset: -1 }} />
						<YAxis label= {{value: 'km', position: 'insideTop', offset: -4}} />
						<Tooltip />
						<Bar dataKey="distance" fill="#98D588" barSize={10} />
					</BarChart>
					</ResponsiveContainer>
				</Box>
				<Grid
					container
					spacing={2}
					sx={{
						height: "175px",
						marginTop: "20px",
						textAlign: "center",
					}}
				>
					<Grid xs={4} item>
						<div>
							<h4 style={{ margin: 0 }}>달린 거리</h4>
							<p
								style={{
									margin: 0,
									fontSize: "1.5rem",
									fontFamily: "Pretendard-bold",
									color: "#1890FF",
								}}
							>
								{totalDistance}km
							</p>
						</div>
					</Grid>
					<Grid xs={4} item>
						<div>
							<h4 style={{ margin: 0 }}>러닝 횟수</h4>
							<p
								style={{
									margin: 0,
									fontSize: "1.5rem",
									fontFamily: "Pretendard-bold",
									color: "#1890FF",
								}}
							>
								{totalRunningCount}
							</p>
						</div>
					</Grid>
					<Grid xs={4} item>
						<div>
							<h4 style={{ margin: 0 }}>평균 페이스</h4>
							<p
								style={{
									margin: 0,
									fontSize: "1.5rem",
									fontFamily: "Pretendard-bold",
									color: "#1890FF",
								}}
							>
								{averagePace}
							</p>
						</div>
					</Grid>
					<Grid xs={4} item>
						<div>
							<h4 style={{ margin: 0 }}>시나리오 완수</h4>
							<p
								style={{
									margin: 0,
									fontSize: "1.5rem",
									fontFamily: "Pretendard-bold",
									color: "#1890FF",
								}}
							>
								{targetDistanceAchievedCount}
							</p>
						</div>
					</Grid>
					<Grid xs={5} item>
						<div>
							<h4 style={{ margin: 0 }}>목표 페이스 달성</h4>
							<p
								style={{
									margin: 0,
									fontSize: "1.5rem",
									fontFamily: "Pretendard-bold",
									color: "#1890FF",
								}}
							>
								{targetPaceAchievedCount}
							</p>
						</div>
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
}
