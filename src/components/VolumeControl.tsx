import { useRecoilState } from "recoil";
import volumeState from "../context/VolumeState";
import { Box } from "@mui/material";

export default function VolumeControl() {
	const [volume, setVolume] = useRecoilState(volumeState);
	return (
		<Box m={2}>
			음량 &nbsp;
			<input
				type="range"
				value={volume * 100}
				onChange={(e) => setVolume(parseInt(e.target.value) / 100)}
			/>
		</Box>
	);
}
