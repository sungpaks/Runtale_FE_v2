import { Box } from "@mui/material";
import { FadeLoader } from "react-spinners";

export default function CustomFadeLoader() {
	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				paddingTop: "40vh",
			}}
		>
			<FadeLoader />
		</Box>
	);
}
