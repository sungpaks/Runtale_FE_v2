import React from "react";
import { Box, List, ListItem, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import Title from "../../components/Title";
import AnimalCrawls from "../../components/AnimalCrawls";
import { Navigate, useNavigate } from "react-router-dom";

interface Scenario {
    title: string;
    description?: string;
    to: string;
	imageUrl: string;
}

const scenarios: Scenario[] = [
    {
        title: "첫 출근 지각",
        description: "드디어 취뽀에 성공한 나!\n하지만, 첫 날부터 지각하게 생겼는데......",
        to: "/setpace",
		imageUrl: "/img/scenario1.png"
    },
    {
        title: "수업 지각",
        description: "피곤한 하루를 보냈던 나머지 늦잠을 자고\n1교시 수업에 지각하게 생겼는데......",
        to: "/setpace",
		imageUrl: "/img/scenario2.png"
    },
    {
        title: "요리 준비",
        description: "친구를 집에 초대하고 요리 준비를 하는 나,\n하지만 시간이 얼마 남지 않았는데...",
        to: "/setpace",
		imageUrl: "/img/scenario3.png"
	},
    {
        title: "시나리오 없이 뛰기",
        to: "/setpace",
		imageUrl: "/img/noscenario.png"
    }
];

const MockScenarioSquare: React.FC<{ imageUrl: string }> = ({ imageUrl }) => {
    return (
        <Box
            sx={{
                width: "100px",
                height: "100px",
                backgroundColor: "lightgray",
                borderRadius: 3,
                mr: 2,
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        ></Box>
    );
};

const ScenarioItem: React.FC<Scenario> = ({ title, description, to, imageUrl }) => {
    return (
        <ListItem sx={{ p: 0.5, mb: 2 }} component={Link} to={to}>
            <MockScenarioSquare imageUrl={imageUrl} />
            <div>
                <h4 style={{ margin: 0, fontWeight: "bold", color: "#1890FF", fontFamily: "Pretendard-Bold" }}>
                    {title}
                </h4>
                {description && (
                    <p style={{ margin: 0, fontSize: "13px", color: "#626773" }}>
                        {description.split("\n").map((line, index) => (
                            <React.Fragment key={index}>
                                {line}
                                <br />
                            </React.Fragment>
                        ))}
                    </p>
                )}
            </div>
        </ListItem>
    );
};

const Story: React.FC = () => {
    return (
        <Box p={1}>
            <Title
                level={2}
                style={{
                    textAlign: "left",
                    marginBottom: "50px",
                }}
            >
                <AnimalCrawls animal="🐌" />
            </Title>
            <Stack textAlign="left">
                <Title level={4} style={{ fontWeight: "bold", color: "#1890FF", fontFamily: "Pretendard-Bold" }}>
                    Scenario
                </Title>
                <List>
                    {scenarios.map((scenario, index) => (
                        <ScenarioItem key={index} {...scenario} />
                    ))}
                </List>
            </Stack>
        </Box>
    );
};

export default Story;
