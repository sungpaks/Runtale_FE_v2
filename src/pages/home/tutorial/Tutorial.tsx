import { Box } from "@mui/material";
import Title from "../../../components/Title";

export default function Tutorial() {
	return (
		<Box mt={5} textAlign="left">
			<Title level={4}>RunTail을 더 재미있게 즐기는 법!</Title>
			<Box
				display="flex"
				sx={{
					height: "150px",
					alignItems: "center",
					justifyContent: "center",
					backgroundColor: "lightgray",
					borderRadius: 3,
					m: 0,
				}}
			>
				서비스 튜토리얼
			</Box>
		</Box>
	);
}
