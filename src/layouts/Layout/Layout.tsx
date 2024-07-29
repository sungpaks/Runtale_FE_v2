import TitleBar from "./title-bar/TitleBar";
import NavBar from "./nav-bar/NavBar";
import { useLocation } from "react-router-dom";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
	const location = useLocation();

	const hideNavBarPaths = ["/login", "/signup", "/tutorial", "/success"];
	const shouldHideNavBar = hideNavBarPaths.includes(location.pathname);

	const showTitleBarPaths: string[] = [
		"/home",
		"/story",
		"/statistics",
		"/activities",
	];
	const hasPreviousButton: boolean = !showTitleBarPaths.includes(
		location.pathname,
	);

	return (
		<>
			<TitleBar hasPreviousButton={hasPreviousButton} />
			{children}
			{!shouldHideNavBar && <NavBar />}
		</>
	);
}
