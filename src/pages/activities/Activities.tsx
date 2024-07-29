import { Box, Skeleton } from "@mui/material";
import { useQuery } from "react-query";
import { getUserTier } from "../../api/api";
import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import Title from "../../components/Title";
import EmojiOfTier from "../../components/EmojiOfTier";

function Activities() {
	const { userId } = useContext(AuthContext);
	const { isError, isLoading, data } = useQuery({
		queryKey: "userTier",
		queryFn: async () => await getUserTier({ userId }),
	});
	const [showDetail, setShowDetail] = useState<boolean>(false);
	/*
	TODO : USER 정보 실제로 가져와서 프로필 반영
	 */

	if (isLoading) {
		return (
			<Skeleton
				variant={"rounded"}
				width={"80%"}
				height={300}
				sx={{ m: "100px auto" }}
			></Skeleton>
		);
	}
	if (isError) {
		return <span>에러아님</span>;
	}
	const { tierName } = data.data.data;
	return (
		<Box p={1}>
			<Box
				sx={{
					borderRadius: 2,
					backgroundColor: "#1890FF",
					color: "white",
					height: showDetail ? "500px" : "240px",
					width: "80%",
					m: "100px auto",
				}}
				onClick={() => {
					setShowDetail((prev) => !prev);
				}}
			>
				<Box sx={{ position: "relative", top: "-100px" }}>
					<EmojiOfTier tier={tierName} />
				</Box>
				<Box sx={{ position: "relative", top: "-80px" }}>
					<Title level={2}>세종이</Title>
					<Title level={1}>Lv. 99</Title>
					{showDetail ? (
						<span>
							여어어어어어기이이이이에는
							<br />
							디테일
							<br />
							같은것드으으으으을
							<br />
							이 들어갈
							<br />
							예정입니다~~~
						</span>
					) : undefined}
				</Box>
			</Box>
		</Box>
	);
}

export default Activities;
