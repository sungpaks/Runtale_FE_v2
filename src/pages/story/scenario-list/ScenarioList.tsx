import { Box } from "@mui/material";
import React from "react";
import Title from "../../../components/Title";
import styles from "./ScenarioList.module.css";

export default function ScenarioList() {
	return (
		<Box className={styles["scenario-list-container"]} pt={5}>
			<Title level={3}>
				인기 급상승 시나리오{" "}
				<span style={{ color: "#C27E1E" }}>TOP4</span>
			</Title>
			<Box height={"40vh"}></Box>
		</Box>
	);
}
