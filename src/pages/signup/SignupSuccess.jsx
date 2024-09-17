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
                <h2>
                    <span style={{ color: 'rgb(245, 182, 93)' }}>{nickname}</span>님 환영합니다.<br />
                    런테일과 함께 달려볼까요?
                </h2>
            </div>
            <div className={`${styles["Button-Wrap"]}`}>
                    <Button
                        variant="contained"
                        disableElevation
                        sx={{
                            mt: "2",
                            width: "234px",
                            height: "50px",
                            backgroundColor: "#624925",
                            borderRadius: "100px",
                            color: "#FFFFFF",
                            fontWeight: "bold",
                            fontFamily: "Chosunilbo_myungjo",
                            background: "rgba(245, 182, 93, 0.3)",
                            "&:hover": {
                                background: "rgba(245, 182, 93, 0.4)",
                            },
                        }}
                        onClick={handleStart}
                    >
                        시작하기
                    </Button>
                </div>
        </div>
    );
}
