import React from 'react';
import { Box, Typography } from "@mui/material";
import Title from "../../../components/Title"; // Title 컴포넌트가 이 경로에 있는지 확인

export default function TopPercentage() {
    const SIZE = 160;

    return (
        <Box mt={3} textAlign="left">
            <Box
                display="flex"
                sx={{
                    height: "250px",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "lightgray",
                    borderRadius: 3,
                    m: 0,
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease',
                    '&:hover': { backgroundColor: 'gray' },
                    position: 'relative' // Added for absolute positioning of text
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: 20,
                        left: 20
                    }}
                >
                    <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                        상위 <br/>
                        12%
                    </Typography>
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
                    <Typography sx={{ fontWeight: 'bold' }}>
                        지구의 8분의 1지점을 달리고 있어요!
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}
