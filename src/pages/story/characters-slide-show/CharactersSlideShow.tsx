import { useNavigate } from "react-router-dom";
import styles from "./CharactersSlideShow.module.css";
import React, { Suspense, useState } from "react";

interface CharactersSlideShowType {
	minutes: string;
	seconds: string;
	scenarioId: number;
}

function Steps({ index }) {
	return (
		<div className={styles.step}>
			<svg
				width="5"
				height="5"
				viewBox="0 0 5 5"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<circle
					cx="2.5"
					cy="2.5"
					r="2.5"
					fill={index === 0 ? "#ffffff" : "#909090"}
				/>
			</svg>
			<svg
				width="5"
				height="5"
				viewBox="0 0 5 5"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<circle
					cx="2.5"
					cy="2.5"
					r="2.5"
					fill={index === 1 ? "#ffffff" : "#909090"}
				/>
			</svg>
			<svg
				width="5"
				height="5"
				viewBox="0 0 5 5"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<circle
					cx="2.5"
					cy="2.5"
					r="2.5"
					fill={index === 2 ? "#ffffff" : "#909090"}
				/>
			</svg>
			<svg
				width="5"
				height="5"
				viewBox="0 0 5 5"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<circle
					cx="2.5"
					cy="2.5"
					r="2.5"
					fill={index === 3 ? "#ffffff" : "#909090"}
				/>
			</svg>
			<svg
				width="5"
				height="5"
				viewBox="0 0 5 5"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<circle
					cx="2.5"
					cy="2.5"
					r="2.5"
					fill={index === 4 ? "#ffffff" : "#909090"}
				/>
			</svg>
		</div>
	);
}

const firstScenarioCharactersInfo = [
	{
		name: "주인공",
		description: "페스트가 창궐한 도시에 살고 있는 평범한 사람입니다.",
	},
	{
		name: "의사",
		description:
			"도시의 유일한 의사로, 페스트 환자들을 치료하며 희생적인 삶을 살아갑니다.",
	},
	{
		name: "신부",
		description:
			"도시 사람들에게 정신적 위안을 주고, 공동체를 이끌어가는 인물입니다.",
	},
	{
		name: "저항하는 시민들",
		description: "페스트가 창궐한 도시에 살고 있는 평범한 사람입니다.",
	},
	{
		name: "절망에 빠진 시민들",
		description: "페스트로 인해 모든 것을 잃고 절망에 빠진 사람들입니다.",
	},
];

const CharactersSlideShow: React.FC = ({
	minutes,
	seconds,
	scenarioId,
}: CharactersSlideShowType) => {
	const navigate = useNavigate();
	const [curIndex, setCurIndex] = useState(1);
	const handleClickStart = (e) => {
		navigate("/startrunning", {
			state: {
				targetPace:
					((parseInt(minutes) | 0) * 60 + (parseInt(seconds) | 0)) *
					1000,
				scenarioId: scenarioId,
			},
		});
	};
	const handleClickNext = () => {
		setCurIndex((prev) => prev + 1);
	};
	const profileImgPath = `/img/scenario_1/scenario_1_character_${curIndex}_profile.png`;
	return (
		<div className={styles.container}>
			<img className={styles.profile} src={profileImgPath} />

			<div className={styles["info-container"]}>
				<p className={styles.name}>
					{firstScenarioCharactersInfo[curIndex - 1].name}
				</p>
				<p className={styles.description}>
					{firstScenarioCharactersInfo[curIndex - 1].description}
				</p>
			</div>
			<Steps index={curIndex - 1} />
			<button onClick={handleClickNext}>다음</button>
		</div>
	);
};

export default CharactersSlideShow;
