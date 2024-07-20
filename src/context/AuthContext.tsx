import axios from "axios";
import React, {
	createContext,
	useState,
	useEffect,
	Dispatch,
	SetStateAction,
	DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_FORM_ACTIONS,
	useRef,
	useMemo,
} from "react";
import { QueryClient, useQuery, useQueryClient } from "react-query";
import requestApi from "../api/api";

interface AuthInfo {
	isAuthenticated: boolean;
	//setIsAuthenticated: Dispatch<boolean>;
	userId: number;
	setUserId: Dispatch<number>;
}

const AuthContext = createContext<AuthInfo>(null);

const queryClient = new QueryClient();

export function AuthProvider({ children }) {
	const userIdItem = localStorage.getItem("userId");
	const [userId, setUserId] = useState<number>(
		userIdItem ? parseInt(userIdItem) : -1,
	);
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
		userId !== -1,
	);
	useMemo(() => ({ isAuthenticated }), [isAuthenticated]);

	useEffect(() => {}, []);

	useEffect(() => {
		setIsAuthenticated(userId >= 0 ? true : false);
		localStorage.setItem("userId", userId.toString());
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
