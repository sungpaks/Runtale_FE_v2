import { useRecoilState } from "recoil";
import volumeState from "../context/VolumeState";
import { Box } from "@mui/material";
import styles from "./VolumeControl.module.css";

export default function VolumeControl() {
	const [volume, setVolume] = useRecoilState(volumeState);
	return (
		<Box
			m={1}
			zIndex={10}
			sx={{
				position: "fixed",
				bottom: "-5px",
				left: "50%",
				transform: "translate(-50%, 0)",
				width: "70vw",
				opacity: "0.8",
			}}
		>
			음량 &nbsp;
			<input
				className={styles["volumn-input"]}
				type="range"
				value={volume * 100}
				onChange={(e) => setVolume(parseInt(e.target.value) / 100)}
			/>
		</Box>
	);
}
