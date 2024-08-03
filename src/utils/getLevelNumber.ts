export default function getLevelNumber(tierName: string): number {
	switch (tierName) {
		case "달팽이":
			return 1;
		case "거북이":
			return 2;
		case "토끼":
			return 3;
		case "말":
			return 4;
		case "독수리":
			return 5;
		case "치타":
			return 5;
		default:
			return 0;
	}
}
