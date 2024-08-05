import AudioPlayer, { SOUND } from "../../../components/AudioPlayer";

export default function RandomEffectSound() {
	const playEffect: boolean = Math.random() < 0.01;
	const effectSoundList = [SOUND.경적];
	const filename = effectSoundList.at(
		(Math.random() * 100) % effectSoundList.length,
	);

	return playEffect ? <AudioPlayer filename={filename} play /> : <></>;
}
