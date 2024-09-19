import { Box, Button } from "@mui/material";
import React from "react";
import Title from "../../../components/Title";
import styles from "./TopScenarioList.module.css";
import GradientCard from "../../../components/GradientCard";
import { Link, useNavigate } from "react-router-dom";
import { mockScenarioList } from "../all-scenarios/AllScenarios";

export default function TopScenarioList() {
	const navigate = useNavigate();
	const handleClickStart = (scenarioId: Number) => {
		navigate("/setpace", { state: { scenarioId: 0 } });
	};
	const topFourScenarioList = mockScenarioList.slice(0, 4);
	return (
		<Box className={styles["scenario-list-container"]} p={3} pt={5}>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
				}}
				pb={1}
			>
				<Title level={3}>
					인기 급상승 시나리오{" "}
					<span style={{ color: "#C27E1E" }}>TOP4</span>
				</Title>
				<Link to="all">
					<Title level={5}>
						<span style={{ color: "lightgray" }}>
							시나리오 <br /> 모두 보기
						</span>
					</Title>
				</Link>
			</Box>
			<Box className={styles["scenario-list"]} height={"fit-content"}>
				{topFourScenarioList.map((item, index) => {
					return (
						<GradientCard
							key={item.title}
							height={224}
							p={5}
							sx={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
						>
							<div>
								<img
									src={item.profileImage}
									width="144px"
									height="auto"
								/>
								<p
									style={{
										color: "white",
										lineHeight: "1.1rem",
										marginBottom: "15px",
										fontFamily: "Chosunilbo_myungjo",
									}}
								>
									{item.title}
								</p>
								<p>
									<svg
										width="8"
										height="7"
										viewBox="0 0 8 7"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M4.82789 4.23178C4.95829 4.27525 5.09924 4.20477 5.14271 4.07437C5.18618 3.94396 5.1157 3.80301 4.9853 3.75955L4.82789 4.23178ZM3.78659 3.62233H3.5377C3.5377 3.72946 3.60626 3.82457 3.70789 3.85845L3.78659 3.62233ZM4.03548 2.06125C4.03548 1.9238 3.92405 1.81237 3.78659 1.81237C3.64914 1.81237 3.5377 1.9238 3.5377 2.06125H4.03548ZM4.9853 3.75955L3.8653 3.38621L3.70789 3.85845L4.82789 4.23178L4.9853 3.75955ZM4.03548 3.62233V2.06125H3.5377V3.62233H4.03548ZM6.52437 3.249C6.52437 4.76103 5.29863 5.98677 3.78659 5.98677V6.48455C5.57354 6.48455 7.02215 5.03594 7.02215 3.249H6.52437ZM3.78659 5.98677C2.27456 5.98677 1.04882 4.76103 1.04882 3.249H0.551038C0.551038 5.03594 1.99965 6.48455 3.78659 6.48455V5.98677ZM1.04882 3.249C1.04882 1.73696 2.27456 0.511218 3.78659 0.511218V0.0134403C1.99965 0.0134403 0.551038 1.46205 0.551038 3.249H1.04882ZM3.78659 0.511218C5.29863 0.511218 6.52437 1.73696 6.52437 3.249H7.02215C7.02215 1.46205 5.57354 0.0134403 3.78659 0.0134403V0.511218Z"
											fill="#909090"
										/>
									</svg>
									<small style={{ fontSize: "x-small" }}>
										{" "}
										소요시간 : {item.duration}시간
									</small>
								</p>
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
