import React from 'react';
import styles from "./Tutorial.module.css";
import { Box } from "@mui/material";
import Title from "../../../components/Title";

const Step = ({ stepNumber, children }) => {
    return (
        <div>
            <Title level={3} style={{ marginTop: '30px', color: '#626773' }}>
                STEP{stepNumber}
            </Title>
            <Box
                display="flex"
                sx={{
                    height: "150px",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "lightgray",
                    borderRadius: 3,
                    m: 0,
                }}
            >
                {children}
            </Box>
        </div>
    );
};

export default function TutorialExplain() {
    return (
        <div className={styles.Container}>
            <Title level={3} style={{ marginTop: '20px', color: '#1890FF' }}>
                Runtale과 함께하는 더 재밌는 러닝!
            </Title>
            <Box mt={5} textAlign="left">
                <p>
                    마냥 앞만 보고 달리는 러닝, 지루하지 않나요?<br />
                    그래서 저희 Runtale이 준비했습니다!<br />
                    다양한 스토리와 함께 여러분의 더 재밌고 짜릿한<br />
                    러닝을 위해 Runtale이 함께 달릴게요!
                </p>

                <Step stepNumber={1}>
                    일부 스토리 목록 이미지
                </Step>
                <p>스토리 목록에서 원하는 시나리오를 택합니다.</p>

                <Step stepNumber={2}>
                    목표 설정 이미지
                </Step>
                <p>원하는 목표 km를 설정합니다.</p>

                <Step stepNumber={3}>
                    러닝 시작 이미지
                </Step>
                <p>재미있는 러닝 시작!</p>
            </Box>
        </div>
    );
}
