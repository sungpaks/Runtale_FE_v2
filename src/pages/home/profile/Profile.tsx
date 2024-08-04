import { Box, ListItem, Stack } from "@mui/material";
import { Tier } from "../Home";
import EmojiOfTier from "../../../components/EmojiOfTier";
import getLevelNumber from "../../../utils/getLevelNumber";
import LevelBar from "../../../components/LevelBar";
import { useQuery } from "react-query";
import { getRunningRecord } from "../../../api/api";
import { useEffect, useState } from "react";

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
			const validRecords = records.filter(record => record.endTime !== null);
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
				sx={{
					height: "120px",
					ml: 2,
					mr: 2,
					borderRadius: 3,
				}}
			>
				<EmojiOfTier tier={tier.tierName} size={120} />
			</Box>
			<h3 style={{ fontFamily: "Pretendard-bold", fontSize: "20px" }}>{username}</h3>
			<Stack textAlign={"left"} spacing={0}>
				<ListItem>
					랭킹&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<strong >LV.{getLevelNumber(tier.tierName)}</strong>{" "}
					<LevelBar tier={tier} />
				</ListItem>
				<ListItem>
					총 달린 거리 &nbsp;&nbsp;{" "}
					<strong>{totalDistance} km </strong>
				</ListItem>
				<ListItem>
					총 러닝 횟수 &nbsp;&nbsp;{" "}
					<strong>{totalRunningCount} 회</strong>
				</ListItem>
			</Stack>
		</Box>
	);
}
