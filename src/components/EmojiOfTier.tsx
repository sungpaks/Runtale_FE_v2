import { Box } from "@mui/material";

export default function EmojiOfTier({
	tier,
	size = 196,
	progress,
}: {
	tier: string;
	size?: number;
	progress?: number;
}) {
	let emoji = <></>;
	const leftPercentage = (20 - progress) * 5 * 0.9;
	switch (tier) {
		case "달팽이":
			emoji = (
				<picture>
					<source
						srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f40c/512.webp"
						type="image/webp"
					/>
					<img
						src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f40c/512.gif"
						alt="🐌"
						width={size}
						height={size}
					/>
				</picture>
			);
			break;
		case "거북이":
			emoji = (
				<picture>
					<source
						srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f422/512.webp"
						type="image/webp"
					/>
					<img
						src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f422/512.gif"
						alt="🐢"
						width={size}
						height={size}
					/>
				</picture>
			);
			break;
		case "토끼":
			emoji = (
				<picture>
					<source
						srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f407/512.webp"
						type="image/webp"
					/>
					<img
						src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f407/512.gif"
						alt="🐇"
						width={size}
						height={size}
					/>
				</picture>
			);
			break;
		case "말":
			emoji = (
				<picture>
					<source
						srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f40e/512.webp"
						type="image/webp"
					/>
					<img
						src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f40e/512.gif"
						alt="🐎"
						width={size}
						height={size}
					/>
				</picture>
			);
			break;
		case "독수리":
			emoji = (
				<picture>
					<source
						srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f985/512.webp"
						type="image/webp"
					/>
					<img
						src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f985/512.gif"
						alt="🦅"
						width={size}
						height={size}
					/>
				</picture>
			);
			break;
		case "치타":
			emoji = (
				<picture>
					<source
						srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f985/512.webp"
						type="image/webp"
					/>
					<img
						src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f985/512.gif"
						alt="🦅"
						width={size}
						height={size}
					/>
				</picture>
			);
			break;
		default:
			emoji = (
				<picture>
					<source
						srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f914/512.webp"
						type="image/webp"
					/>
					<img
						src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f914/512.gif"
						alt="🤔"
						width={size}
						height={size}
					/>
				</picture>
			);
	}
	if (progress !== undefined)
		return <Box ml={`${leftPercentage}%`}>{emoji}</Box>;
	else return <>{emoji}</>;
}
