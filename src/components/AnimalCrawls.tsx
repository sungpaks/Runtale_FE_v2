import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useQuery } from "react-query";
import { getUserTier } from "../api/api";
import EmojiOfTier from "./EmojiOfTier";

export default function AnimalCrawls({}) {
	const { userId } = useContext(AuthContext);
	const { isSuccess, data } = useQuery({
		queryKey: "animal",
		queryFn: async () => getUserTier({ userId }),
	});

	if (!isSuccess) return;
	const { progress, percentil, tierName } = data.data.data;
	return (
		<>
			{<EmojiOfTier tier={tierName} size={40} progress={progress} />}
			<div
				style={{
					position: "relative",
					top: "-12px",
					borderBottom: "2px solid lightgray",
				}}
			></div>
		</>
	);
}
