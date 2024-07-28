import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, Typography} from '@mui/material';
import styles from './DefaultPage.module.css'; // 스타일 파일을 불러오는 부분을 추가

export default function DefaultPage() {
	const navigate = useNavigate(); // navigate 함수를 불러옴

	return (
		<div className={`${styles["Container"]}`}>
			<div className={`${styles["Content-Wrap"]}`}>
				<Box
					sx={{
						width: 120,
						height: 120,
						backgroundColor: 'lightgrey',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						mb: 3
					}}
				>
					<Typography variant="h6">로고</Typography>
				</Box>
				<Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
					Runtale
				</Typography>
				<Typography variant="body1">
					즐거운 러닝의 시작, 런테일!
				</Typography>
			</div>
			<div className={`${styles["bottom-Wrap"]}`}>
				<Button
					variant="contained"
					disableElevation
					sx={{
						mt: 2,
						width: '300px',
						height: '50px',
						backgroundColor: '#1890FF',
						color: '#FFFFFF',
						fontWeight: 'bold',
						'&:hover': {
							backgroundColor: '#096DD9'
						}
					}}
					component={Link}
					to="/login"
				>
					로그인
				</Button>
				<div className={`${styles["SignupWrap"]}`}>
					<div className={`${styles["SignupText"]}`}>
						아직 회원이 아니신가요?
					</div>
					<div className={`${styles["Signupbtnbox"]}`}>
						<button
							onClick={() => navigate("/signup")}
							className={`${styles["Signupbtn"]}`}
						>
							회원가입
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
