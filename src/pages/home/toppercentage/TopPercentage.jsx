import React, { useEffect, useState, useContext } from 'react';
import { Box } from "@mui/material";
import AuthContext from "../../../context/AuthContext";
import { getUserTier, getRunningRecord } from "../../../api/api"; // getUserTier, getRunningRecord 함수 경로를 확인

export default function TopPercentage() {
    const SIZE = 160;
    const { userId } = useContext(AuthContext);
    const [percentile, setPercentile] = useState(null);
    const [totalDistance, setTotalDistance] = useState(0);
    const [earthFraction, setEarthFraction] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const tierResponse = await getUserTier({ userId });
                const tierData = tierResponse.data.data;
                // API 응답에서 percentile 값을 가져와서 설정
                setPercentile(tierData.percentile);

                const distanceResponse = await getRunningRecord({ userId });
                const runningRecords = distanceResponse.data.data;
                // 총 거리를 계산
                const totalDistance = runningRecords.reduce((acc, record) => acc + record.distance, 0);
                setTotalDistance(totalDistance);

                // 지구 둘레 대비 사용자가 달린 거리 계산
                const earthCircumference = 40075; // 지구 둘레 (km)
                const fraction = (totalDistance / earthCircumference) * 100;
                setEarthFraction(fraction);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, [userId]);

    const getFractionText = (fraction) => {
        if (fraction >= 100) {
            return "지구 한 바퀴를 돌았습니다!";
        } else if (fraction >= 50) {
            return "지구의 절반을 지점을 달리고 있어요!";
        } else if (fraction >= 25) {
            return "지구의 4분의 1을 지점을 달리고 있어요!";
        } else if (fraction >= 12.5) {
            return "지구의 8분의 1을 지점을 달리고 있어요!";
        } else if (fraction >= 6.25) {
            return "지구의 16분의 1을 지점을 달리고 있어요!";
        } else if (fraction >= 3.125) {
            return "지구의 32분의 1을 지점을 달리고 있어요!";
        } else if (fraction >= 1.5625) {
            return "지구의 64분의 1 지점을 달리고 있어요!";
        } else {
            return "지구의 아주 작은 부분을 달리고 있습니다!";
        }
    };

    return (
        <Box mt={3} textAlign="left">
            <Box
                display="flex"
                sx={{
                    height: "250px",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#DCE9F5",
                    borderRadius: 3,
                    m: 0,
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease',
                    '&:hover': { backgroundColor: '#B5DBFF' },
                    position: 'relative', // Added for absolute positioning of text
                    boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)'
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: 20,
                        left: 20
                    }}
                >
                    <span style={{ fontSize: "23px", fontFamily: "Pretendard-bold" }}>
                        상위 <br />
                        {percentile !== null ? `${100 - percentile}%` : '...'}
                    </span>
                </Box>
                <Box component="picture">
                    <source srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f30f/512.webp" type="image/webp" />
                    <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f30f/512.gif"
                        alt="🌏"
                        width={SIZE}
                        height={SIZE}
                    />
                </Box>
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 10,
                        textAlign: 'center'
                    }}
                >
                    <span style={{ fontSize: "15px", fontFamily: "Pretendard-bold" }}>
                        {earthFraction !== null ? getFractionText(earthFraction) : '...'}
                    </span>
                </Box>
            </Box>
        </Box>
    );
}
