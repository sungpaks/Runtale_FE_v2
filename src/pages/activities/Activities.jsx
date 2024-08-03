import { useContext } from "react";
import { Box, Skeleton, Typography } from "@mui/material";
import { useQuery } from "react-query";
import { getUserTier } from "../../api/api";
import AuthContext from "../../context/AuthContext";
import EmojiOfTier from "../../components/EmojiOfTier";

const tiers = [
	{ name: "돌멩이", description: "데굴데굴 천방지축! 돌멩이", level: 0 },
	{ name: "달팽이", description: "비를 좋아하는 감성! 달팽이", level: 1 },
	{ name: "거북이", description: "느리지만 눈치 빠른! 거북이", level: 2 },
	{ name: "토끼", description: "극강의 인싸! 재주많은 토끼", level: 3 },
	{ name: "말", description: "토끼와 앙숙인 당근 러버! 말", level: 4 },
	{ name: "치타", description: "이 구역의 지배자! 날쌘 독수리", level: 5 },
];

function Activities() {
	const { userId } = useContext(AuthContext);
	const { isError, isLoading, data } = useQuery({
		queryKey: "userTier",
		queryFn: async () => await getUserTier({ userId }),
	});

	if (isLoading) {
		return (
			<Skeleton
				variant="rounded"
				width="80%"
				height={300}
				sx={{ m: "100px auto" }}
			/>
		);
	}

	if (isError) {
		return <span>에러아님</span>;
	}

	const { tierName } = data.data.data;

	return (
		<Box p={2} height="110vh">
			<Typography variant="subtitle1" textAlign="left" fontFamily="Pretendard-bold" fontSize="20px">
				랭킹
			</Typography>
			{tiers.map((tier) => (
				<Box
					key={tier.name}
					sx={{
						display: "flex",
						alignItems: "center",
						height: "100px",
						borderRadius: 2,
						backgroundColor:
							tier.name === tierName ? "#1890FF" : "#f0f0f0",
						color: tier.name === tierName ? "white" : "black",
						padding: 2,
						marginBottom: 1,
					}}
				>
					<Box sx={{ marginRight: 2 }}>
						<EmojiOfTier tier={tier.name} size={120} />
					</Box>
					<Box>
						<Typography
							variant="body1"
							textAlign="left"
							fontFamily="Pretendard-bold"
							color={tier.name === tierName ? "white" : "#7E7A7A"} // 티어에 따라 색상 변경
						>
							{tier.description}
						</Typography>
						<Typography
							variant="h6"
							textAlign="left"
							fontFamily="Pretendard-Bold"
							fontSize="40px"
							color={
								tier.name === tierName ? "#F3B640" : "#7E7A7A"
							} // 티어에 따라 색상 변경
						>
							Lv. {tier.level}
						</Typography>
					</Box>
				</Box>
			))}
		</Box>
	);
}

export default Activities;
