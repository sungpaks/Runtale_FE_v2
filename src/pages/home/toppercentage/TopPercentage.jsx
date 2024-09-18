import React, { useEffect, useState, useContext } from 'react';
import { Box, ListItem } from "@mui/material";
import AuthContext from "../../../context/AuthContext";
import { getUserTier, getRunningRecord } from "../../../api/api"; // getUserTier, getRunningRecord 함수 경로를 확인
import getLevelNumber from "../../../utils/getLevelNumber";
import LevelBar from "../../../components/LevelBar";

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
            return <>지구 한 바퀴를 돌았습니다.</>;
        } else if (fraction >= 50) {
            return <>지구의 절반을<br />지점을 달리고 있어요.</>;
        } else if (fraction >= 25) {
            return <>지구의 4분의 1을<br />지점을 달리고 있어요.</>;
        } else if (fraction >= 12.5) {
            return <>지구의 8분의 1을<br />지점을 달리고 있어요.</>;
        } else if (fraction >= 6.25) {
            return <>지구의 16분의 1을<br />지점을 달리고 있어요.</>;
        } else if (fraction >= 3.125) {
            return <>지구의 32분의 1을<br />지점을 달리고 있어요.</>;
        } else if (fraction >= 1.5625) {
            return <>지구의 64분의 1<br />지점을 달리고 있어요.</>;
        } else {
            return <>지구의 아주 작은<br />부분을 달리고 있습니다.</>;
        }
    }

    return (
        <Box mt={3} textAlign="left">
            <Box
                sx={{
                    display:"flex",
                    flexDirection:"column",
                }}
            >
                <span style={{ fontSize: "18px", fontFamily: "Chosunilbo_myungjo", color: "#D5D5D5", }}>
                    상위 &nbsp;
                    {percentile !== null ? `${100 - Math.floor(percentile)}%` : '...'}
                </span>
                <span style={{ fontSize: "10px", fontFamily: "Pretendard-Regular", color: "#909090", }}>
                    {earthFraction !== null ? getFractionText(earthFraction) : '...'}
                </span>
            </Box>
        </Box>
        
    );
}
