import React, { useContext } from 'react';
import { Box, Button, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import requestApi from "../../api/api";
import AuthContext from "../../context/AuthContext";
import styles from "./Signup.module.css";

export default function Success() {
    const location = useLocation();
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const { loginId, password, nickname } = location.state || {};

    const handleStart = async () => {
        try {
            const response = await requestApi.post('/login', {
                loginId,
                password,
            });

            console.log('Login Response:', response);

            if (response.data && response.data.data) {
                authContext.setUserId(response.data.data.userId);
                navigate('/home'); // 로그인 후 /home으로 이동
            } else {
                throw new Error('Invalid login response');
            }
        } catch (err) {
            console.error('Login Error:', err);
            alert('로그인 실패');
        }
    };

    const SIZE = 160;

    return (
        <div className={`${styles["Success-Container"]}`}>
            <div className={`${styles["Content-Wrap"]}`}>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                    {nickname}님 환영합니다!
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    런테일과 함께 달려볼까요?
                </Typography>
                <Box component="picture">
                    <source srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f64c/512.webp" type="image/webp"/>
                    <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f64c/512.gif"
                    alt="🙌"
                    width={SIZE}
                    height={SIZE}
                />
                </Box>
                <Button
                    variant="contained"
                    disableElevation
                    sx={{
                        mt: 2,
                        width: "300px",
                        height: "50px",
                        backgroundColor: "#1890FF", // 원하는 배경색
                        color: "#FFFFFF", // 원하는 텍스트 색
                        fontWeight: "bold", // 텍스트 두께
                        "&:hover": {
                            backgroundColor: "#096DD9", // 호버 시 배경색
                        },
                    }}
                    onClick={handleStart}
                >
                    시작하기!
                </Button>
            </div>
        </div>
    );
}
