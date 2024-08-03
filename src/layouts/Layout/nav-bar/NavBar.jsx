import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import BookIcon from "@mui/icons-material/Book";
import AssignmentIcon from "@mui/icons-material/Assignment";
import StarsIcon from "@mui/icons-material/Stars";
import { useNavigate, useLocation } from "react-router-dom";
import "./NavBar.css";

export default function NavBar() {
	const [value, setValue] = React.useState(0);
	const navigate = useNavigate();
	const location = useLocation();

	const navigationMap = [
		{ path: "/home", label: "Home", icon: <HomeIcon /> },
		{ path: "/story", label: "Story", icon: <BookIcon /> },
		{ path: "/statistics", label: "Record", icon: <AssignmentIcon /> },
		{ path: "/activities", label: "Activities", icon: <StarsIcon /> },
	];

	useEffect(() => {
		const currentPath = location.pathname;
		const currentIndex = navigationMap.findIndex(
			(item) => item.path === currentPath,
		);
		setValue(currentIndex === -1 ? 0 : currentIndex);
	}, [location.pathname]);

	const handleNavigation = (event, newValue) => {
		setValue(newValue);
		navigate(navigationMap[newValue].path);
	};

	return (
		<div className="nav-bar">
			<Box sx={{ width: "100%" }}>
				<BottomNavigation
					showLabels
					value={value}
					onChange={handleNavigation}
					sx={{ height: "3.5rem" }}
				>
					{navigationMap.map((navItem, index) => (
						<BottomNavigationAction
							key={index}
							label={navItem.label}
							icon={navItem.icon}
						/>
					))}
				</BottomNavigation>
			</Box>
		</div>
	);
}
