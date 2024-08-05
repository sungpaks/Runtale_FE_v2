import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import volumeState from "../context/VolumeState";

export const SOUND = {
	경적: "경적.mp3",
	교통소음1: "교통소음1.mp3",
	교통소음2: "교통소음2",
	버스도착: "버스도착.mp3",
	버스문열림: "버스문열림.mp3",
	버스출발: "버스출발.mp3",
	새소리: "새소리.mp3",
	우당탕: "우당탕.mp3",
	카운트: "카운트.mp3",
	환호: "환호.mp3",
	러닝발소리: "러닝발소리.mp3",
	시나리오1_시작: "시나리오1_시작.mp3",
};

export default function AudioPlayer({
	filename,
	play,
	loop = false,
}: {
	filename: string;
	play: boolean;
	loop?: boolean;
}) {
	const audioRef = useRef<HTMLAudioElement>(null);
	const url = `/sound/${filename}`;
	const [volume, setVolume] = useRecoilState(volumeState);

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
		}
	}, [volume]);

	return (
		<>
			<audio src={url} ref={audioRef} loop={loop} />
		</>
	);
}
