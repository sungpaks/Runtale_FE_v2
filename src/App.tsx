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
import DefaultPage from "./pages/default-page/DefaultPage";
import { QueryClient, QueryClientProvider } from "react-query";

interface AutocompletionOption {
	label: string;
}

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path="/" element={<DefaultPage />} />
			<Route element={<PrivateRoute />}>
				{/* 로그인이 필요한 페이지 정의 */}
				<Route path="/home" element={<Home />} />
			</Route>
			<Route element={<PublicRoute />}>
				{/* 로그인 없이 접근하는 페이지 정의 */}
				<Route path="/login" element={<Login />} />
			</Route>
		</>,
	),
);

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<RouterProvider router={router}></RouterProvider>
			</AuthProvider>
		</QueryClientProvider>
	);
}

export default App;
