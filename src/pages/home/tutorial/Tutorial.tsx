import { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Title from "../../../components/Title";
import { useNavigate } from 'react-router-dom';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import HomeTutorial from "../../../assets/Home_tutorial.png";

export default function Tutorial() {
	const navigate = useNavigate();

	const handleBoxClick = () => {
		navigate('/tutorial');
	};

	return (
		<Box mt={3} textAlign="left">
			<Box padding="5px" mb={2}>
				<span style={{ fontSize: "15px", color: "#D5D5D5", fontFamily: "Chosunilbo_myungjo" }}>
					서비스 튜토리얼
				</span>
			</Box>
			<Box
				display="flex"
				sx={{
					height: "100px",
					alignItems: "center",
					backgroundColor: "#000000",
					m: 0,
					cursor: 'pointer',
					transition: 'background-color 0.3s ease',
					'&:hover': { boxShadow: "inset 0px 0px 20px rgba(245, 182, 93, 0.5)" },
					boxShadow: "inset 0px 0px 20px rgba(245, 182, 93, 0.3)",
					borderRadius: "10px",
				}}
				onClick={handleBoxClick}
			>
				<Box display="flex" justifyContent="flex-start" alignItems="center" padding="20px">
					<Box
						component="img"
						src={HomeTutorial}
						alt="Tutorial"
						sx={{ width: '80px', height: '80px' }}
					/>
					<Box display="flex" flexDirection="column" marginLeft="10px">
						<span style={{ fontSize: "13px", color: "#909090", fontFamily: "Theseasons-regular" }}>
							RUNTALE
						</span>
						<span style={{ fontSize: "11px", color: "#909090", fontFamily: "Pretendard-Regular" }}>
							어떻게 사용하나요?
						</span>
					</Box>
				</Box>

			</Box>
		</Box >
	);
}
