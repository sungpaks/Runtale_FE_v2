import TitleBar from "./title-bar/TitleBar";
import NavBar from "./nav-bar/NavBar";
import { useLocation } from "react-router-dom";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
	const location = useLocation();

	const hideNavBarPaths = [
		"/login",
		"/signup",
		"/tutorial",
		"/success",
		"/startrunning",
		"/running/end",
		"/running",
	];
	const shouldHideNavBar = hideNavBarPaths.includes(location.pathname);

	const showTitleBarPaths = ["/home", "/story", "/statistics", "/activities"];

	const hasPreviousButton = !showTitleBarPaths.includes(location.pathname);
	const shouldHideTitleBar =
		location.pathname === "/startrunning" ||
		location.pathname === "/running" ||
		location.pathname === "/running/end";

	return (
		<>
			{!shouldHideTitleBar && (
				<TitleBar hasPreviousButton={hasPreviousButton} />
			)}
			{children}
			{!shouldHideNavBar && <NavBar />}
		</>
	);
}
