import { Navigate, useNavigate } from "react-router-dom";
import "./TitleBar.css";

export default function TitleBar({
	hasPreviousButton,
}: {
	hasPreviousButton: boolean;
}) {
	const navigate = useNavigate();

	const handleTitleClick = () => {
		navigate("/home");
	};

	return (
		<div className="title-bar">
			{hasPreviousButton ? (
				<div
					className={"back-button"}
					onClick={() => {
						navigate(-1);
					}}
				></div>
			) : (
				<div>&nbsp;&nbsp;&nbsp;&nbsp;</div>
			)}
			<h2 onClick={handleTitleClick} style={{ cursor: "pointer" }}>
				RunTale
			</h2>
		</div>
	);
}
