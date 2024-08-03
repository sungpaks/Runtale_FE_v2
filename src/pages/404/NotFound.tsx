import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
	const navigate = useNavigate();
	return (
		<>
			<h1>⛔</h1>
			<h1>Oops!</h1>
			<h2>뭔가 에러가 났나봐요..</h2>
			<Button
				variant="outlined"
				onClick={() => {
					navigate("/home");
				}}
			>
				홈으로
			</Button>
		</>
	);
}
