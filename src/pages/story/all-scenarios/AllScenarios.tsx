import React from "react";
import profileImage0 from "../../../assets/scenario-profile-0.png";
import profileImage1 from "../../../assets/scenario-profile-1.png";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import styles from "./AllScenarios.module.css";
import SearchableList from "../../../components/SearchableList/SearchableList";
import ScenarioListItem from "../../../components/ScenarioListItem";
import firstScenarioProfile from "../../../assets/pest-profile.png";
import profileImage2 from "../../../assets/scenario-profile-2.png";

export default function AllScenarios() {
	const scenarios: any = useLoaderData();
	const navigate = useNavigate();
	const handleClickStart = (scenarioId: Number) => {
		navigate("/setpace", { state: { scenarioId: 0 } });
	};
	return (
		<Box className={styles["scenario-list-background"]}>
			<h2 className={styles["title"]}>시나리오</h2>
			<SearchableList
				items={scenarios}
				keyFn={(item: any) => item.id}
				className={styles["scenario-list"]}
				itemClassName={styles.card}
				inputClassName={styles["search-window"]}
			>
				{(item, index) => (
					<ScenarioListItem
						buttonClassName={styles["start-button"]}
						handleClickStart={() => handleClickStart(index + 1)}
						item={item}
					/>
				)}
			</SearchableList>
			{/* <Box className={styles["scenario-list"]}>
				{scenarios.map((item, index) => {
					return (
						<Box className={styles.card} key={item.title}>
							<div>
								<img src={item.profileImage} width="120px" />
								<p style={{ color: "white" }}>{item.title}</p>
								<br />
								<button
									className={styles["start-button"]}
									onClick={() => handleClickStart(index + 1)}
								>
									시작하기
								</button>
							</div>
						</Box>
					);
				})}
			</Box> */}
		</Box>
	);
}

export const mockScenarioList = [
	{
		id: 1,
		profileImage: firstScenarioProfile,
		title: "페스트: 숨막히는 도시를 벗어나",
		duration: 1,
	},
	{
		id: 2,
		profileImage: profileImage1,
		title: "고전 2",
		duration: 1,
	},
	{
		id: 3,
		profileImage: profileImage0,
		title: "고전 3",
		duration: 1,
	},
	{
		id: 4,
		profileImage: profileImage2,
		title: "고전 4",
		duration: 1,
	},
	// {
	// 	id: 5,
	// 	profileImage: profileImage0,
	// 	title: "고전 5",
	// 	duration: 1,
	// },
];

export async function loader({ request, params }) {
	// 모든 시나리오 리스트 가져오는 로직

	return mockScenarioList;
}
