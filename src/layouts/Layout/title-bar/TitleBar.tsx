import { Navigate, useNavigate } from "react-router-dom";
import "./TitleBar.css";
import { Button } from "@mui/material";
import { useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import { postLogout } from "../../../api/api";

export default function TitleBar({
	hasPreviousButton,
}: {
	hasPreviousButton: boolean;
}) {
	const { userId, setUserId } = useContext(AuthContext);
	const navigate = useNavigate();

	const handleTitleClick = () => {
		navigate("/home");
	};

	const handleLogout = async () => {
		const response = await postLogout();
		if (response?.data?.status !== 200) console.log(response);
		setUserId(-1); //에러 떠도 강제로 로그아웃
		//에러가 지금 expire time 지나면 로그아웃이 먹통인가봄. 그럴만하긴해
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
			<div
				style={{
					cursor: "pointer",
					height: "100%",
					width: "auto",
				}}
			>
				<img
					height="100%"
					src="/img/로고.png"
					onClick={handleTitleClick}
				/>
			</div>

			<Button
				onClick={handleLogout}
				sx={{
					marginLeft: "auto",
					paddingRight: "2rem",
					fontFamily: "Pretendard-regular",
					textDecoration: "underline",
					color: "#D0D0D0",
				}}
			>
				로그아웃
			</Button>
		</div>
	);
}
