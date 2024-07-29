import { Box, Typography } from "@mui/material";
import Title from "../../../components/Title";
import { useNavigate } from 'react-router-dom';

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
					backgroundColor: "lightgray",
					borderRadius: 3,
					m: 0,
					cursor: 'pointer',
					transition: 'background-color 0.3s ease',
					'&:hover': { backgroundColor: 'gray' },
				}}
				onClick={handleBoxClick}
			>
                <Box textAlign="left">
                    <Typography sx={{ fontWeight: 'bold', color: '#626773' }}>
                        Runtale을 더 재밌게 즐기는 방법
                    </Typography>
                    <Typography sx={{ color: '#8A8F9B'}}>
                        서비스 튜토리얼
                    </Typography>
                </Box>
			</Box>
		</Box>
	);
}
