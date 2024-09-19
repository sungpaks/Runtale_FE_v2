import { useContext } from "react";
import { Box, Skeleton } from "@mui/material";
import { useQuery } from "react-query";
import { getUserTier } from "../../api/api";
import AuthContext from "../../context/AuthContext";
import 산책코스 from "../../assets/산책코스.png";
import 도전코스 from "../../assets/도전코스.png";
import 열정코스 from "../../assets/열정코스.png";
import 하프코스 from "../../assets/하프코스.png";
import 풀코스 from "../../assets/풀코스.png";
import Profile from "../../assets/scenario-profile-1.png"

// 동물 이름과 코스 이미지를 매핑하는 객체
const tierToCourseImageMap = {
	돌멩이: 산책코스,
	달팽이: 산책코스,
	거북이: 도전코스,
	토끼: 열정코스,
	말: 하프코스,
	치타: 풀코스,
};

const tierToCourseNameMap = {
	돌멩이: "산책코스",
	달팽이: "산책코스",
	거북이: "도전코스",
	토끼: "열정코스",
	말: "하프코스",
	치타: "풀코스",
};

function Activities() {
	const { userId } = useContext(AuthContext);
	const { isError, isLoading, data } = useQuery({
		queryKey: "userTier",
		queryFn: async () => await getUserTier({ userId }),
	});

	if (isLoading) {
		return (
			<Skeleton
				variant="rounded"
				width="80%"
				height={300}
				sx={{ m: "100px auto" }}
			/>
		);
	}

	if (isError) {
		return <span>에러아님</span>;
	}

	const { tierName } = data.data.data;
	const courseImage = tierToCourseImageMap[tierName] || 산책코스;
	const courseName = tierToCourseNameMap[tierName] || "산책코스";

	return (
		<Box display="flex" flexDirection="column">
			<Box
				p={3.5}
				display="flex"
				textAlign="start"
				justifyContent="flex-start"
				alignItems="center"
			>
				<Box
					component="img"
					src={Profile}
					alt="profile"
					width="60px"
				/>
				<p style={{ marginLeft: "5px" }}>
					<span style={{ color: '#D5D5D5' }}>{userId}</span>
					<span style={{ color: '#909090' }}>님의 랭킹은</span><br />
					<span style={{ color: 'rgba(245, 182, 93, 0.9)' }}>{courseName}</span>
					<span style={{ color: 'rgba(245, 182, 93, 0.7)' }}>에요.</span>
				</p>
				<Box
					textAlign="center"
					sx={{
						display: 'flex',
						flexDirection: 'column',
						ml: 'auto',
						alignItems: 'center',
					}}
				>
					<span style={{ color: '#909090', fontSize: '10px' }}>다음 랭킹까지</span>
					<span style={{ color: 'rgba(245, 182, 93, 0.7)', fontSize: '10px' }}>5KM<span style={{ color: '#909090', fontSize: '10px' }}> 남았어요.</span></span>
				</Box>
			</Box>
			<Box
				sx={{
					marginTop: "-15px",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					width: "100%",
				}}
			>
				<img
					src={courseImage}
					alt={tierName}
					style={{
						width: '100%',
					}}
				/>
			</Box>
		</Box>
	);
}

export default Activities;
