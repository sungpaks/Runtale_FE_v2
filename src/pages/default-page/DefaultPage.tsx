import { Link } from "react-router-dom";

export default function DefaultPage() {
	return (
		<>
			<h1>DEFAULT PAGE</h1>
			<Link to="/login">로그인 하러 가기</Link>
		</>
	);
}
