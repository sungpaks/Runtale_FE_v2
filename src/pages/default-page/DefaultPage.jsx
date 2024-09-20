import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import styles from "./DefaultPage.module.css";
import Logo from "../../assets/Runtale_logo.png";

export default function DefaultPage() {
	const navigate = useNavigate();

	return (
		<div className={`${styles["Container"]}`}>
			<div style={{ display: 'flex', justifyContent: 'flex-start', padding: '25px' }}>
				<Typography
					sx={{
						fontFamily: "Theseasons-regular",
						color: "#ECE3D7",
						fontSize: "xx-large",
					}}
				>
					RUNTALE
				</Typography>
			</div>
			<div className={`${styles["Content-Wrap"]}`}>
				<Box
					component="img"
					src={Logo}
					alt="Logo"
					sx={{ 
						width: '400px', 
						height: 'auto',
					}}
				/>
				<Typography
					variant="body1"
					sx={{ fontFamily: "Chosunilbo_myungjo", color: "#D5D5D5" }}
				>
					즐거운 러닝의 시작, 런테일
				</Typography>
			</div>
			<div className={`${styles["bottom-Wrap"]}`}>
				<div className={`${styles["button-Wrap"]}`}>
					<Button
						variant="contained"
						disableElevation
						sx={{
							width: "234px",
							height: "50px",
							backgroundColor: "#624925",
							borderRadius: "100px",
							color: "#FFFFFF",
							fontWeight: "bold",
							fontFamily: "Chosunilbo_myungjo",
							background: "rgba(245, 182, 93, 0.3)",
							filter: "blur(4px)",
							"&:hover": {
								background: "rgba(245, 182, 93, 0.4)",
							},
						}}
						component={Link}
						to="/login"
					>
					</Button>
					<span className={`${styles["LoginText"]}`}>로그인</span>
				</div>
				<div className={`${styles["SignupWrap"]}`}>
					<div className={`${styles["SignupText"]}`} style={{ fontFamily: "Chosunilbo_myungjo" }}>
						아직 회원이 아니신가요?
					</div>
					<div className={`${styles["Signupbtnbox"]}`}>
						<button
							onClick={() => navigate("/signup")}
							className={`${styles["Signupbtn"]}`}
							style={{ fontFamily: "Chosunilbo_myungjo", color: "#F5B65DCC", background: "none" }}
						>
							회원가입
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
