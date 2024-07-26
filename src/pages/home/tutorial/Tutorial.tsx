import { Box } from "@mui/material";
import Title from "../../../components/Title";
import { useNavigate } from 'react-router-dom';

export default function Tutorial() {
	const navigate = useNavigate();

	const handleBoxClick = () => {
	  navigate('/tutorial');
	};

	return (
		<Box mt={5} textAlign="left">
			<Title level={4}>RunTail을 더 재미있게 즐기는 법!</Title>
			<Box
				display="flex"
				sx={{
					height: "150px",
					alignItems: "center",
					justifyContent: "center",
					backgroundColor: "lightgray",
					borderRadius: 3,
					m: 0,
					cursor: 'pointer',
					transition: 'background-color 0.3s ease',
					'&:hover': { backgroundColor: 'gray' },
				}}
				onClick={handleBoxClick}
			>
				서비스 튜토리얼
			</Box>
		</Box>
	);
}
