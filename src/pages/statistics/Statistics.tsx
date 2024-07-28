import { Box, Grid } from "@mui/material";
import AnimalCrawls from "../../components/AnimalCrawls";
import Title from "../../components/Title";

export default function Statistics() {
	return (
		<Box p={1}>
			<Title
				style={{
					textAlign: "left",
					marginBottom: "50px",
				}}
				level={2}
			>
				<AnimalCrawls animal="🐇" />
			</Title>

			<Box sx={{ textAlign: "left" }}>
				<Title level={2}>이달의 기록</Title>
				<Box
					sx={{
						m: 1,
						height: "300px",
						borderRadius: 3,
						backgroundColor: "lightgray",
					}}
				></Box>
				<Grid
					container
					spacing={2}
					sx={{
						height: "175px",
						marginTop: "20px",
						textAlign: "center",
					}}
				>
					<Grid xs={4} item>
						<div>
							<h4 style={{ margin: 0 }}>달린 거리</h4>
							<p style={{ margin: 0, fontSize: "1.5rem" }}>
								10KM
							</p>
						</div>
					</Grid>
					<Grid xs={4} item>
						<div>
							<h4 style={{ margin: 0 }}>러닝 횟수</h4>
							<p style={{ margin: 0, fontSize: "1.5rem" }}>3</p>
						</div>
					</Grid>
					<Grid xs={4} item>
						<div>
							<h4 style={{ margin: 0 }}>평균 페이스</h4>
							<p style={{ margin: 0, fontSize: "1.5rem" }}>
								5m 50s
							</p>
						</div>
					</Grid>
					<Grid xs={4} item>
						<div>
							<h4 style={{ margin: 0 }}>시나리오 완수</h4>
							<p style={{ margin: 0, fontSize: "1.5rem" }}>2</p>
						</div>
					</Grid>
					<Grid xs={5} item>
						<div>
							<h4 style={{ margin: 0 }}>목표 페이스 달성</h4>
							<p style={{ margin: 0, fontSize: "1.5rem" }}>2</p>
						</div>
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
}
