import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import styles from "./DefaultPage.module.css";

export default function DefaultPage() {
	const navigate = useNavigate();

	return (
		<div className={`${styles["Container"]}`}>
			<div className={`${styles["Content-Wrap"]}`}>
				<Typography
					variant="h3"
					sx={{fontFamily: "Theseasons-Bold", color: "#ECE3D7"}}
				>
					RUNTALE
				</Typography>
				<Typography
					variant="body1"
					sx={{ fontFamily: "Chosunilbo_myungjo", color : "#D5D5D5"}}
				>
					즐거운 러닝의 시작, 런테일
				</Typography>
			</div>
			<div className={`${styles["bottom-Wrap"]}`}>
				<Button
					variant="contained"
					disableElevation
					sx={{
						mt: 2,
						width: "234px",
						height: "50px",
						backgroundColor: "#624925",
						borderRadius: "100px",
						color: "#FFFFFF",
						fontWeight: "bold",
						"&:hover": {
							backgroundColor: "#096DD9",
						},
						fontFamily: "Chosunilbo_myungjo"
					}}
					component={Link}
					to="/login"
				>
					로그인
				</Button>
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
