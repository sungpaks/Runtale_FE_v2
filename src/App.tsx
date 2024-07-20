import * as React from "react";
import "./App.css";
import Login from "./pages/login/Login";
import { AuthProvider } from "./context/AuthContext";
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";
import Home from "./pages/home/Home";
import NotFound from "./pages/404/NotFound";
import PrivateRoute from "./layouts/PrivateRoute";
import PublicRoute from "./layouts/PublicRoute";

interface AutocompletionOption {
	label: string;
}

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route element={<PrivateRoute />}>
				{/* 로그인이 필요한 페이지 정의 */}
				<Route path="/home" element={<Home />} />
			</Route>
			<Route element={<PublicRoute />}>
				{/* 로그인 없이 접근하는 페이지 정의 */}
				<Route path="/" element={<div>default page</div>} />
				<Route path="/login" element={<Login />} />
			</Route>
		</>,
	),
);

function App() {
	return (
		<AuthProvider>
			<RouterProvider router={router}></RouterProvider>
		</AuthProvider>
	);
}

export default App;
