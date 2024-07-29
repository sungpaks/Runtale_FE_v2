import { Box, ListItem, Stack } from "@mui/material";
import { Tier } from "../Home";
import EmojiOfTier from "../../../components/EmojiOfTier";
import getLevelNumber from "../../../utils/getLevelNumber";
import LevelBar from "../../../components/LevelBar";

export default function Profile({
	tier,
	username,
}: {
	tier: Tier;
	username: string;
}) {
	return (
		<Box
			component="section"
			sx={{
				pt: 2,
				pb: 2,
				borderRadius: 4,
				height: "300px",
			}}
		>
			<Box
				sx={{
					height: "120px",
					ml: 2,
					mr: 2,
					borderRadius: 3,
				}}
			>
				<EmojiOfTier tier={tier.tierName} size={120} />
			</Box>
			<h3>{username}</h3>
			<Stack textAlign={"left"} spacing={0}>
				<ListItem>
					레벨&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<strong>LV.{getLevelNumber(tier.tierName)}</strong>{" "}
					<LevelBar tier={tier} />
				</ListItem>
				<ListItem>총 달린 거리</ListItem>
				<ListItem>총 러닝 횟수</ListItem>
			</Stack>
		</Box>
	);
}
