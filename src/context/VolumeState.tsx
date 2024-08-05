import { atom } from "recoil";

const volumeState = atom({
	key: "volumeState",
	default: 0.5,
});

export default volumeState;
