import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import Layout from "./Layout/Layout";

export default function PrivateRoute() {
	const { isAuthenticated } = useContext(AuthContext);

	return isAuthenticated ? (
		<Layout>
			<Outlet />
		</Layout>
	) : (
		<Navigate to="/login" />
	);
}
