import axios from "axios";
import React, {
	createContext,
	useState,
	useEffect,
	Dispatch,
	useMemo,
} from "react";
import { QueryClient } from "react-query";
import { getUserInfo } from "../api/api";

interface AuthInfo {
	isAuthenticated: boolean;
	userId: number;
	setUserId: Dispatch<number>;
}

const AuthContext = createContext<AuthInfo>(null);

const queryClient = new QueryClient();

export function AuthProvider({ children }) {
	const userIdItem = sessionStorage.getItem("userId");
	const [userId, setUserId] = useState<number>(
		userIdItem ? parseInt(userIdItem) : -1,
	);
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
		userId !== -1,
	);
	useMemo(() => ({ isAuthenticated }), [isAuthenticated]);
	const noLoginPaths = ["/login", "/", "/signup", "/success"];

	useEffect(() => {
		if (noLoginPaths.includes(location.pathname)) return;
		getUserInfo({ userId })
			.then((res) => setIsAuthenticated(true))
			.catch((error) => setIsAuthenticated(false));
		/**
		 * 여기에 "세션 확인" 로직 필요
		 * 여기에 해야 마운트 시 매번 확인 (새로고침, 새로운 페이지 렌더 등)
		 */
	}, []);

	useEffect(() => {
		setIsAuthenticated(userId >= 0 ? true : false);
		sessionStorage.setItem("userId", userId.toString());
	}, [userId]);

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated: isAuthenticated,
				userId: userId,
				setUserId: setUserId,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export default AuthContext;
