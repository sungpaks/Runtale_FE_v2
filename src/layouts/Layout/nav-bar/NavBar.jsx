import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { useNavigate, useLocation } from "react-router-dom";
import Icon from '../../../components/Icon';  // Custom Icon component import
import "./NavBar.css";

export default function NavBar() {
	const [value, setValue] = React.useState(0);
	const navigate = useNavigate();
	const location = useLocation();

	const navigationMap = [
		{ path: "/home", label: "HOME", icon: <Icon type="icon1" color={value === 0 ? "#ECE3D7" : "#909090"} /> }, // Custom Icon1
		{ path: "/story", label: "STORY", icon: <Icon type="icon2" color={value === 1 ? "#ECE3D7" : "#909090"} /> }, // Custom Icon2
		{ path: "/statistics", label: "RECORD", icon: <Icon type="icon3" color={value === 2 ? "#ECE3D7" : "#909090"} /> }, // Custom Icon3
		{ path: "/activities", label: "ACTIVITES", icon: <Icon type="icon4" color={value === 3 ? "#ECE3D7" : "#909090"} /> }, // Custom Icon4
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
			<Box sx={{ width: "90%" }}>
				<BottomNavigation
					showLabels
					value={value}
					onChange={handleNavigation}
					sx={{ 
						height: "3.5rem",	
            			overflow: "hidden", 
						background: "#000000",
						boxShadow: "0px 4px 15px rgba(245, 182, 93, 0.2)",
						borderRadius: "30px",
					 }}
				>
					{navigationMap.map((navItem, index) => (
						<BottomNavigationAction
							key={index}
							label={navItem.label}
							icon={navItem.icon}
							sx={{
								color: value === index ? "#ECE3D7" : "#909090", // 선택 상태에 따라 텍스트 색상 변경
								"&.Mui-selected": {
									color: "#ECE3D7", // 선택된 상태의 색상
								},
							}}
						/>
					))}
				</BottomNavigation>
			</Box>
		</div>
	);
}
