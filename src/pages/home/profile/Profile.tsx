import { Box, ListItem, Stack } from "@mui/material";

export default function Profile(
	{
		/* 유저 정보들 */
	},
) {
	return (
		<Box
			component="section"
			sx={{
				m: 2,
				pt: 2,
				pb: 2,
				border: "1px solid gray",
				borderRadius: 4,
				height: "300px",
			}}
		>
			<Box sx={{ height: "120px" }}>달팽이 그림..</Box>
			<h3>세종이</h3>
			<Stack textAlign={"left"} spacing={0}>
				<ListItem>레벨</ListItem>
				<ListItem>총 달린 거리</ListItem>
				<ListItem>이 달 러닝 횟수</ListItem>
			</Stack>
		</Box>
	);
}
