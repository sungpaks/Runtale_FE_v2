import styles from "./Login.module.css";
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Lock from '@mui/icons-material/Lock';
import Button from '@mui/material/Button';

export default function Login() {
  return (
    <div className={`${styles['Container']}`}>
      <h3>로그인</h3>
      <div className={`${styles['TextBoxWrap']}`}>
        <Box sx={{ '& > :not(style)': { m: 1 }, width: '300px'}}>
          <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
            <TextField
              id="username"
              label="ID"
              fullWidth
              sx={{ marginBottom: '20px' }} // 각 TextField 간에 간격 추가
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
            <TextField
              id="password"
              label="PASSWORD"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Box>
      </div>
      <Button 
        variant="contained" 
        disableElevation 
        sx={{ 
          mt: 2, 
          width: '300px', 
          height: '50px', 
          backgroundColor: '#1890FF', // 원하는 배경색
          color: '#FFFFFF', // 원하는 텍스트 색
          fontWeight: 'bold', // 텍스트 두께
          '&:hover': {
            backgroundColor: '#096DD9' // 호버 시 배경색
          }
        }}
      >
        로그인
      </Button>
      <div className={`${styles['SignupWrap']}`}>
        <div className={`${styles['SignupText']}`}>
          아직 회원이 아니신가요?
        </div>
        <div className={`${styles['Signupbtnbox']}`}>
          <button className={`${styles['Signupbtn']}`}>회원가입</button>
        </div>
      </div>
    </div>
  );
}
