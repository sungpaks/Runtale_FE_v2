import { getFormattedDistance } from "../../../utils/running_util";

interface RunningResult {
	distance: number;
	pace: number;
}

export default function RunningEnd({ distance, pace }: RunningResult) {
	const [km, m] = getFormattedDistance(distance);
	return (
		<>
			총 거리 : {`${km}km ${m}m`} <br />
			페이스 : {pace}
		</>
	);
}
