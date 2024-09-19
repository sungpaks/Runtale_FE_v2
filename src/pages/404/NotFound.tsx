import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
	const navigate = useNavigate();
	return (
		<>
			<h1>⛔</h1>
			<h1>Oops!</h1>
			<h2>뭔가 에러가 났나봐요..</h2>
			<h3>다시 시도해주시겠어요?</h3>
			<Button
				variant="outlined"
				onClick={() => {
					localStorage.removeItem("runningId");
					navigate("/home");
				}}
			>
				홈으로
			</Button>
		</>
	);
}
