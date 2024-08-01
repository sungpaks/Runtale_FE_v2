import { Box, Grid } from "@mui/material";
import AnimalCrawls from "../../components/AnimalCrawls";
import Title from "../../components/Title";
import { getRunningRecordMonthly } from "../../api/api";
import { useQuery } from "react-query";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";

export default function Statistics() {
	const { userId } = useContext(AuthContext);
	const { isSuccess, data } = useQuery({
		queryKey: "monthlyRecords",
		queryFn: async () => await getRunningRecordMonthly({ userId }),
	});

	if (!isSuccess) return;
	const {
		averagePace,
		runningList,
		targetDistanceAchievedCount,
		targetPaceAchievedCount,
		totalDistance,
		totalRunningCount,
	} = data.data.data;
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
				<Title level={2}>이달의 기록</Title>
				<Box
					sx={{
						m: 1,
						height: "300px",
						borderRadius: 3,
						backgroundColor: "lightgray",
					}}
				>
					여기에는 차트를 넣어요
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
							<p style={{ margin: 0, fontSize: "1.5rem" }}>
								{totalDistance}km
							</p>
						</div>
					</Grid>
					<Grid xs={4} item>
						<div>
							<h4 style={{ margin: 0 }}>러닝 횟수</h4>
							<p style={{ margin: 0, fontSize: "1.5rem" }}>
								{totalRunningCount}
							</p>
						</div>
					</Grid>
					<Grid xs={4} item>
						<div>
							<h4 style={{ margin: 0 }}>평균 페이스</h4>
							<p style={{ margin: 0, fontSize: "1.5rem" }}>
								{averagePace}
							</p>
						</div>
					</Grid>
					<Grid xs={4} item>
						<div>
							<h4 style={{ margin: 0 }}>시나리오 완수</h4>
							<p style={{ margin: 0, fontSize: "1.5rem" }}>
								{
									targetDistanceAchievedCount /* 이거 맞나? "시나리오 완수 횟수"는 없긴 함 지금 */
								}
							</p>
						</div>
					</Grid>
					<Grid xs={5} item>
						<div>
							<h4 style={{ margin: 0 }}>목표 페이스 달성</h4>
							<p style={{ margin: 0, fontSize: "1.5rem" }}>
								{targetPaceAchievedCount}
							</p>
						</div>
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
}
