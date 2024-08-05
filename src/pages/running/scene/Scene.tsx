import { useState } from "react";
import AudioPlayer, { SOUND } from "../../../components/AudioPlayer";
import { Button } from "@mui/material";

export default function Scene() {
	const [play, setPlay] = useState(false);
	return (
		<>
			<h1>시나리오 화면이애오</h1>
			<AudioPlayer filename={SOUND.새소리} play={play} />
			<Button onClick={() => setPlay((prev) => !prev)}>재생</Button>
		</>
	);
}
