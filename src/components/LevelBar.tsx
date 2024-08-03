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
				backgroundColor: "lightgray",
				borderRadius: 3,
				width: `200px`,
				ml: 3,
			}}
		>
			<Box
				sx={{
					height: "10px",
					backgroundColor: "#A9E9F2",
					borderRadius: 3,
					width: `${activeBarWidth}px`,
				}}
			></Box>
		</Box>
	);
}
