import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import Layout from "./Layout/Layout";

export default function PublicRoute() {
	const { isAuthenticated } = useContext(AuthContext);

	return isAuthenticated ? (
		<Navigate to="/home" />
	) : (
		<Layout>
			<Outlet />
		</Layout>
	);
}
