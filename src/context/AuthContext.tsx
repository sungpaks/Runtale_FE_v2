import React, {
	createContext,
	useState,
	useEffect,
	Dispatch,
	SetStateAction,
} from "react";

interface AuthState {
	isAuthenticated: boolean;
	setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthState>({
	isAuthenticated: false,
	setIsAuthenticated: null,
});

export function AuthProvider({ children }) {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		// 인증 여부 확인 로직
	});

	return (
		<AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
			{children}
		</AuthContext.Provider>
	);
}

export default AuthContext;
