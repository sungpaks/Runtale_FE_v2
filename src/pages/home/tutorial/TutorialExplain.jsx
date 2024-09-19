import { React, useRef, useEffect } from 'react';
import styles from "./Tutorial.module.css";
import { Box, Button } from "@mui/material";
import Slider from "react-slick";
import Title from "../../../components/Title";

const Step = ({ stepNumber, description, imageUrl, children }) => {
    useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

    return (
        <div>
            <Title level={3} style={{ marginTop: '30px', color: '#D5D5D5' }}>
                STEP{stepNumber}
            </Title>
            <p style={{ color: '#D5D5D5' }}>{description}</p>
            <Box
                display="flex"
                sx={{
                    height: "450px",
                    borderRadius: 3,
                    m: 0,
                    backgroundImage: `url(${imageUrl})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                }}
            >
                {children}
            </Box>
        </div>
    );
};

const SlideContent = ({ stepNumber, imageUrl, description, text }) => {
    return (
        <div>
            <Step stepNumber={stepNumber} description={description} imageUrl={imageUrl}>
                {/* You can add any overlay or content here */}
            </Step>
            <p>{text}</p>
        </div>
    );
};

export default function TutorialExplain() {
    const sliderRef = useRef(null);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <div className={styles.Container}>
            <Title level={3} style={{ color: '#EBA543', fontFamily: "Chosunilbo_myungjo" }}>
                Runtale과 함께하는 더 재밌는 러닝!
            </Title>
            <Box mt={3} textAlign="center">
                <p style={{ color: '#909090' }}>
                    마냥 앞만 보고 달리는 러닝, 지루하지 않나요?<br />
                    그래서 저희 Runtale이 준비했습니다!<br />
                    다양한 스토리와 함께 여러분의 더 재밌고 짜릿한<br />
                    러닝을 위해 Runtale이 함께 달릴게요!
                </p>
                <Box textAlign="left">
                    <Slider ref={sliderRef} {...settings}>
                        <div>
                            <SlideContent
                                stepNumber={1}
                                imageUrl="/img/Story_choice.png"
                                description="스토리 목록에서 원하는 시나리오를 택합니다."
                                text=""
                            />
                        </div>
                        <div>
                            <SlideContent
                                stepNumber={2}
                                imageUrl="/img/Story_start.png"
                                description="원하는 목표 페이스를 설정합니다."
                                text=""
                            />
                        </div>
                        <div>
                            <SlideContent
                                stepNumber={3}
                                imageUrl="/img/Story_0km.png"
                                description="시나리오와 함께하는 새롭고 즐거운 러닝 시작!"
                                text=""
                            />
                        </div>
                    </Slider>
                </Box>
            </Box>
        </div>
    );
}
