import { getFormattedDistance } from "../../../utils/running_util";

interface RunningResult {
	distance: number;
	pace: number;
}

export default function RunningEnd({ distance, pace }: RunningResult) {
	const km = getFormattedDistance(distance);
	return (
		<>
			총 거리 : {`${km}km`} <br />
			페이스 : {pace}
		</>
	);
}
