import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Route } from "react-router-dom";
import Login from "../pages/login/Login";

export default function ProtectedRoute({ element, ...rest }) {
	const isAuthenticated = useContext(AuthContext);
	console.log("protected route call");

	return (
		<Route
			{...rest}
			element={isAuthenticated ? element : <h1>no authentication</h1>}
		/>
	);
}
