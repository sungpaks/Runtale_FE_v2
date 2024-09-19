import { Dispatch, useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import volumeState from "../context/VolumeState";

export const SOUND = {
	바람소리: "wind-sound-long-version.mp3",
	뛰는소리: "stepping-sound.mp3",
	카운트: "카운트.mp3",
	등장인물: "등장인물.mp3",
};

export default function AudioPlayer({
	filename,
	play,
	loop = false,
	setIsEnd,
	setCheckpointAudioFile,
}: {
	filename: string;
	play: boolean;
	loop?: boolean;
	setIsEnd?: Dispatch<boolean>;
	setCheckpointAudioFile?: Dispatch<string>;
}) {
	const audioRef = useRef<HTMLAudioElement>(null);
	const url = `/sound/${filename}`;
	const volume = useRecoilValue(volumeState);
	const callbackFile =
		filename === "scenario1check1.mp3"
			? ""
			: filename === "scenario1check2.mp3"
				? ""
				: filename === "scenario1check3.mp3"
					? "running-end.mp3"
					: "";

	useEffect(() => {
		if (play && audioRef.current) {
			audioRef.current.play();
		} else if (audioRef.current) {
			audioRef.current.pause();
		}
	}, [play, filename]);

	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.volume = volume;
			if (play && audioRef.current.paused) {
				audioRef.current.play();
			}
		}
	}, [volume]);

	return (
		<>
			<audio
				src={url}
				ref={audioRef}
				loop={loop}
				onPlay={() => {
					if (setIsEnd) setIsEnd(false);
				}}
				onEnded={() => {
					if (setCheckpointAudioFile)
						setCheckpointAudioFile(callbackFile);
					if (setIsEnd) setIsEnd(true);
				}}
			/>
		</>
	);
}
