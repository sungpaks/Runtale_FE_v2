import * as React from "react";
import { useState } from "react";
import "./App.css";
import Login from "./pages/login/Login";
import { AuthProvider } from "./context/AuthContext";
import {
	BrowserRouter,
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
	Routes,
} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
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
				<Route path="/home" element={<Home />} />
			</Route>
			<Route element={<PublicRoute />}>
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
			{
				// <BrowserRouter>
				// 	<Routes>
				// 		<Route path="/" element={<h1>default page</h1>}></Route>
				// 		<Route path="/login" element={<Login />}></Route>
				// 		{/* 이 아래로는 로그인이 필요한 페이지들. */}
				// 		<ProtectedRoute
				// 			path="/home"
				// 			element={<Home />}
				// 		></ProtectedRoute>
				// 	</Routes>
				// </BrowserRouter>
			}
		</AuthProvider>
	);
}

export default App;
