import { Box, Button } from "@mui/material";
import React from "react";
import Title from "../../../components/Title";
import styles from "./ScenarioList.module.css";
import GradientCard from "../../../components/GradientCard";
import profileImage0 from "../../../assets/scenario-profile-0.png";
import profileImage1 from "../../../assets/scenario-profile-1.png";
import { useNavigate } from "react-router-dom";

const mockScenarioList = [
	{
		profileImage: profileImage0,
		title: "고전 1",
		duration: 1,
	},
	{
		profileImage: profileImage1,
		title: "고전 2",
		duration: 1,
	},
	{
		profileImage: profileImage0,
		title: "고전 3",
		duration: 1,
	},
	{
		profileImage: profileImage1,
		title: "고전 4",
		duration: 1,
	},
	{
		profileImage: profileImage0,
		title: "고전 5",
		duration: 1,
	},
];

export default function ScenarioList() {
	const navigate = useNavigate();
	const handleClickStart = (scenarioId: Number) => {
		navigate("/setpace", { state: { scenarioId: 0 } });
	};
	return (
		<Box className={styles["scenario-list-container"]} p={3} pt={5}>
			<Title level={2}>
				인기 급상승 시나리오{" "}
				<span style={{ color: "#C27E1E" }}>TOP4</span>
			</Title>
			<Box className={styles["scenario-list"]} height={"40vh"}>
				{mockScenarioList.map((item, index) => {
					return (
						<GradientCard
							key={item.title}
							height={224}
							p={5}
							sx={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
						>
							<div>
								<img src={item.profileImage} width="150px" />
								<p style={{ color: "white" }}>{item.title}</p>
								<br />
								<button
									className={styles["start-button"]}
									onClick={() => handleClickStart(index + 1)}
								>
									시작하기
								</button>
							</div>
						</GradientCard>
					);
				})}
			</Box>
		</Box>
	);
}
