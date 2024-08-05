import { useEffect, useState } from "react";
import AudioPlayer, { SOUND } from "../../../components/AudioPlayer";
import { Button, Box } from "@mui/material";
import Status from "../status/Status";

interface SceneProps {
	distance: number;
	pace: number;
}

export default function Scene({ distance, pace }: SceneProps) {
	const [play, setPlay] = useState(false);
	const [scenarioImage, setScenarioImage] = useState<string>("/img/Scenario1_1.png");

	// distance가 1km 증가할 때마다 이미지 변경
	useEffect(() => {
		const imageIndex = Math.floor(distance) + 1;
		setScenarioImage(`/img/Scenario1_${imageIndex}.png`);
	}, [distance]);

	return (
		<>
			<Box
				sx={{
					width: "100%",
					height: "70vh",
					position: "fixed",
					top: 0,
				}}
			>
				<img src={scenarioImage} alt="Scenario" style={{ width: "100%", height: "100%" }} />
			</Box>
			<Status distance={distance} pace={pace} />
			<AudioPlayer filename={SOUND.새소리} play={play} />
			<Button onClick={() => setPlay((prev) => !prev)}>재생</Button>
		</>
	);
}
