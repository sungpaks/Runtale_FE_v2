import { Box } from "@mui/material";
import styles from "./Scene.module.css";
interface SceneProps {
	distance: number;
	pace: number;
}

const texts = [
	[
		"당신은 마스크를 쓴 채 혼자 달리고 있습니다.",
		"폐허가 된 건물들이 늘어서 있고,",
		"바람에 나부끼는 천 가림막 너머로",
		"고립된 도시의 모습이 보입니다.",
	],
	[
		"방역소 앞에는 긴 줄이 늘어서 있습니다. ",
		"사람들은 모두 마스크를 쓰고",
		"서로의 거리를 유지하며 차례를 기다리고 있습니다.",
		"당신은 그들 속에 섞여 서서 희망을 느낍니다.",
	],
	[
		"병원 안은 환자들로 가득합니다. ",
		"의료진들은 밤낮없이 환자들을 돌보느라 지쳐 보입니다. ",
		"당신은 자원봉사를 하고 싶지만,",
		"아직 건강한 사람에게는 할 수 있는 일이 많지 않습니다.",
	],
	[
		"페스트가 종식되고, 사람들이 다시 광장에 모여 축제를 벌입니다.",
		"당신은 그들과 함께 기쁨을 나누며 미래를 향해 나아갑니다.",
	],
];

export default function Scene({ distance, pace }: SceneProps) {
	const curPoint = Math.trunc(distance);
	const backgroundImageUrl = `/img/scenario_1/scenario_1_running_background_${curPoint > 3 ? 3 : curPoint}.png`;
	//console.log(backgroundImageUrl);

	return (
		<>
			<Box
				className={styles["scene-background"]}
				sx={{
					backgroundImage: `url(${backgroundImageUrl})`,
				}}
			>
				<div>
					{texts[curPoint].map((text) => (
						<p key={text}>{text}</p>
					))}
				</div>
			</Box>
		</>
	);
}
