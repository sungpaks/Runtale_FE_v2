import { Box, ListItem, Typography } from "@mui/material";
import { Tier } from "../Home";
import { useQuery } from "react-query";
import { getRunningRecord } from "../../../api/api";
import { useEffect, useState } from "react";
import earthImage from "../../../assets/Home_earth.png";
import backgroundCircle from "../../../assets/Home_background.png";

export interface RunningRecord {
	id: number;
	endTime: Date;
	distance: number;
	pace: number;
	createdDate: Date;
	lastModifiedDate: Date;
	userId: number;
	status: string;
}

export default function Profile({
	tier,
	username,
	userId,
}: {
	tier: Tier;
	username: string;
	userId: number;
}) {
	const { isSuccess, data } = useQuery({
		queryKey: "runningRecord",
		queryFn: async () => await getRunningRecord({ userId }),
	});

	const [runningRecord, setRunningRecord] = useState<RunningRecord[]>([]);
	const [totalRunningCount, setTotalRunningCount] = useState<number>(0);
	const [totalDistance, setTotalDistance] = useState<number>(0);
	useEffect(() => {
		if (isSuccess && data && data.data) {
			const records = data.data.data;
			// 유효한 기록만 필터링
			const validRecords = records.filter(
				(record) => record.endTime !== null,
			);
			setRunningRecord(validRecords);
			setTotalRunningCount(validRecords.length);
			setTotalDistance(
				validRecords.reduce(
					(total, record) => total + record.distance,
					0,
				),
			);
		}
	}, [isSuccess, data]);
	if (!isSuccess) return null;
	return (
		<Box
			component="section"
			sx={{
				pt: 2,
				pb: 2,
				borderRadius: 4,
				height: "300px",
			}}
		>
			<Box
				component="img"
				src={backgroundCircle}
				alt="Background Circle"
				sx={{
					position: "absolute",
					top: "-55px",
					left: "0",
					zIndex: "-1",
					width: "480px",
					height: "500px",
				}}
			/>
			<Box
				sx={{
					display: "flex",
					justifyContent: "end",
				}}>
				<Box
					component="img"
					src={earthImage}
					alt="Earth"
				/>
				<Box
					sx={{
						marginLeft: "-20px",
					}}>
					<ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
						<Typography
							sx={{
								fontSize: "13px",
								fontFamily: "Chosunilbo_myungjo",
								color: "#909090", // 폰트 색상
							}}
						>
							총 달린 거리
						</Typography>
						<Typography sx={{ fontSize: "13px", fontFamily: "Pretendard-Regular", color: "#D5D5D5", }}>
							{Math.trunc(totalDistance)} km
						</Typography>
					</ListItem>
					<ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
						<Typography
							sx={{
								fontSize: "13px",
								fontFamily: "Chosunilbo_myungjo",
								color: "#909090",
							}}
						>
							총 러닝 횟수
						</Typography>
						<Typography sx={{ fontSize: "13px", fontFamily: "Pretendard-Regular", color: "#D5D5D5", }}>
							{totalRunningCount}
						</Typography>
					</ListItem>
				</Box>
			</Box>
		</Box>
	);
}
