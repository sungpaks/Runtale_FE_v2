import TitleBar from "./title-bar/TitleBar";
import NavBar from "./nav-bar/NavBar";
import { useLocation } from 'react-router-dom';

export default function Layout({ children }) {
	const location = useLocation();

	const hideNavBarPaths = ['/login', '/signup', '/tutorial'];
	const shouldHideNavBar = hideNavBarPaths.includes(location.pathname);

	return (
		<>
			<TitleBar hasPreviousButton={false} />
			{children}
			{!shouldHideNavBar && <NavBar />}
		</>
	);
}
