import { Box, useMediaQuery } from "@mui/material";
import background from "../../../assets/scenario-background-0.png";
import styles from "./Scene.module.css";

interface SceneProps {
	distance: number;
	pace: number;
}

export default function Scene({ distance, pace }: SceneProps) {
	const scenarioImage = `/img/Scenario1_${distance < 4 ? Math.floor(distance) + 1 : 4}.png`;
	const MAX_WIDTH = "480px";
	const matches = useMediaQuery("(min-width:480px)");

	return (
		<>
			<Box className={styles["scene-background"]}></Box>
		</>
	);
}
