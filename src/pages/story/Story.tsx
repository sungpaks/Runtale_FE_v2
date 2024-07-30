import { Box, List, ListItem, Stack } from "@mui/material";
import Title from "../../components/Title";
import AnimalCrawls from "../../components/AnimalCrawls";
import { Navigate, useNavigate } from "react-router-dom";

function MockScenarioSquare() {
	return (
		<Box
			sx={{
				width: "100px",
				height: "100px",
				backgroundColor: "lightgray",
				borderRadius: 3,
				mr: 2,
			}}
		></Box>
	);
}

export default function Story() {
	const navigate = useNavigate();
	const onClickRunningStart = (e) => {
		navigate("/running");
	};
	return (
		<Box p={1}>
			<Title
				level={2}
				style={{
					textAlign: "left",
					marginBottom: "50px",
				}}
			>
				<AnimalCrawls animal="🐌" />
			</Title>
			<Stack textAlign="left">
				<Title level={4} style={{ fontWeight: "bold", color: "#1890FF", fontFamily: "Pretendard-Bold" }}>
					Scenario
				</Title>
				<List>
					<ListItem sx={{ p: 0.5 }}>
						<MockScenarioSquare />
						<div>
							<h4 style={{ margin: 0, fontWeight: "bold", color: "#1890FF", fontFamily: "Pretendard-Bold" }}>
								첫 출근 지각
							</h4>
							<p style={{ margin: 0 }}>악!!! 늦겠다 !!!</p>
						</div>
					</ListItem>
					<ListItem sx={{ p: 0.5 }}>
						<MockScenarioSquare />
						시나리오 2
					</ListItem>
					<ListItem sx={{ p: 0.5 }}>
						<MockScenarioSquare />
						시나리오 3
					</ListItem>
					<ListItem sx={{ p: 0.5 }}>
						<MockScenarioSquare />
						시나리오 4
					</ListItem>
					<ListItem
						sx={{ p: 2, border: "1px solid gray" }}
						onClick={onClickRunningStart}
					>
						<h2>그냥 달려봐요</h2>
					</ListItem>
				</List>
			</Stack>
		</Box>
	);
}
