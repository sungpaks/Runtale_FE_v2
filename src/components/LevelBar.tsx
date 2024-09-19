import { Box } from "@mui/material";
import getLevelNumber from "../utils/getLevelNumber";
import { Tier } from "../pages/home/Home";

export default function LevelBar({ tier }: { tier: Tier }) {
	const level = getLevelNumber(tier.tierName);
	const percentageToNextLevel = tier.progress / 20;
	const activeBarWidth = percentageToNextLevel * 200;

	return (
		<Box
			sx={{
				height: "10px",
				background: "rgba(0, 0, 0, 0.34)",
				boxShadow: "inset 0px 2px 8px rgba(196, 126, 28, 0.5)",
				filter: "blur(1px)",
				borderRadius: 3,
				width: `200px`,
				ml: 3,
			}}
		>
			<Box
				sx={{
					height: "10px",
					backgroundColor: "rgba(70, 70, 70, 0.47)",
					borderRadius: 3,
					width: `${activeBarWidth}px`,
				}}
			></Box>
		</Box>
	);
}
