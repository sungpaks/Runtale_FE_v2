import { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Title from "../../../components/Title";
import { useNavigate } from 'react-router-dom';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';	

export default function Tutorial() {
	const navigate = useNavigate();

	const handleBoxClick = () => {
	  navigate('/tutorial');
	};

	return (
		<Box mt={3} textAlign="left">
			<Box
				display="flex"
				sx={{
					height: "100px",
					alignItems: "center",
					justifyContent: "center",
					backgroundColor: "#DCE9F5",
					borderRadius: 3,
					m: 0,
					cursor: 'pointer',
					transition: 'background-color 0.3s ease',
					'&:hover': { backgroundColor: '#B5DBFF' },
					boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)'
				}}
				onClick={handleBoxClick}
			>
				<Box display="flex" alignItems="center" textAlign="left">
					<Box marginLeft={'35px'}>
						<span style={{ fontSize: "18px", color: "#4B4B4B", fontFamily: "Pretendard-bold" }}>
							Runtale을 더 재밌게 즐기는 방법 <br/>
						</span>
						<span style={{ fontSize: "15px", color: "#5F5F5F", fontFamily: "Pretendard-regular" }}>
							서비스 튜토리얼
						</span>
					</Box>
					<ArrowRightIcon style={{ marginLeft: '35px', fontSize: '50px', color: "#5F5F5F" }} />
				</Box>
			</Box>
		</Box>
	);
}
