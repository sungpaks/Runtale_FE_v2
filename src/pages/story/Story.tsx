import { Box, List, ListItem, Stack } from "@mui/material";
import TitleBar from "../../layouts/Layout/title-bar/TitleBar";
import Title from "../../components/Title";

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
	return (
		<Box p={1}>
			<TitleBar hasPreviousButton={false} />
			<Title
				level={4}
				style={{
					textAlign: "left",
					marginBottom: "50px",
				}}
			>
				🐌🐌🐌
				<div
					style={{
						position: "relative",
						top: "-5px",
						borderBottom: "1px solid gray",
					}}
				></div>
			</Title>
			<Stack textAlign="left">
				<Title level={4}>Scenario</Title>
				<List>
					<ListItem sx={{ p: 0.5 }}>
						<MockScenarioSquare />
						<div>
							<h4 style={{ margin: 0 }}>첫 출근 지각</h4>
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
				</List>
			</Stack>
		</Box>
	);
}
