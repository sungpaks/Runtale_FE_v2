# 🏃 RunTale

- **RunTale**은 **스토리텔링**과 함께하는 **러닝** 서비스입니다.  
- **RunTale**은 **모바일**에서 쉽게 사용할 수 있는 **웹 어플리케이션** 서비스입니다.

[![image](https://github.com/user-attachments/assets/0fdd67f1-939a-4da8-b25f-2e609fa7f0f4)](https://runtale.vercel.app/)

# 🕹️ 기능

- ***시나리오*** : **시나리오를 선택**하여 러닝을 시작하세요! 진행 상황에 따라 적절한 **사운드**가 제공되어 마치 그 상황에 처한 듯한 동기부여를 받을 수 있습니다.
- ***실시간 피드백*** : **지도**에서 현재 **위치**와 지금까지 지나온 **경로**를 확인할 수 있으며, 실시간 **페이스**와 **달린 거리** 등 통계를 확인할 수 있습니다.
- ***러닝 목표 달성*** : 러닝이 끝난 후 **평균 페이스, 총 달린 거리, 소요 시간** 등 상세 정보를 확인할 수 있습니다. 또한 시작하기 전에 **목표 페이스**를 설정하고 달성해볼 수 있습니다.
- ***이달의 기록*** : 한 달 간 달린 거리, 러닝 횟수, 목표 페이스 달성 횟수 등, **이달의 기록**을 숫자와 그래프로 확인해볼 수 있습니다.
- ***티어*** : 독자적이고 귀여운 **티어** 시스템으로 러닝이 더욱 즐거워집니다!

# 👣 시작하기

## 1. 런테일 서비스에 접속, 로그인

[런테일 서비스를 만나보세요!](https://runtale.vercel.app/)

<img src="https://i.imgur.com/bzKDs63.png" alt loading="lazy" height="400px" />

런테일 서비스에 접속하고, **로그인**합니다.  
아직 회원이 아니라면, **회원가입**을 진행합니다.  

## 2. 홈 화면

<img src="https://i.imgur.com/ROp8TYC.png" alt loading="lazy" />
홈 화면에서는 본인의 **티어, 랭킹, 대략적인 기록** 등을 확인할 수 있습니다.

<img src="https://i.imgur.com/76LRuTu.png" alt loading="lazy" />

스크롤하면 튜토리얼에 진입할 수 있습니다!

## 3. 시나리오 선택, 러닝 진행

<img src="https://i.imgur.com/zzYcD4L.png" alt loading="lazy" height="400px"/>

하단의 **Story** 탭에서 시나리오를 선택하세요.  
물론 시나리오 없이도 러닝을 시작할 수 있습니다!

<img src="https://i.imgur.com/ot9iMPa.png" alt loading="lazy" height="400px"/>

시나리오를 선택했다면, 목표 페이스를 설정해보세요.  
목표 페이스를 설정했다면, **시나리오 시작!** 버튼을 눌러 러닝을 시작합니다.

<img src="https://i.imgur.com/j3QbuXj.png" alt loading="lazy" height="400px" />

먼저 각 시나리오별 음성이 재생됩니다.  
이제 러닝을 시작할 차례입니다!

...

## 4. 이달의 기록

## 5. 활동

# 🔧 기술

- **React** - 사용자 인터페이스를 구축하기 위한 JS 프레임워크.
- **TypeScript** - 자바스크립트에 정적 타입을 명시할 수 있게 하는, 자바스크립트 슈퍼셋 프로그래밍 언어.
- **Vite** : 웹 프론트엔드 빌드 도구.
- **Material UI** - 리액트 컴포넌트 라이브러리를 이용한 스타일링.
- **React Router** - 클라이언트 사이드 라우팅을 위한 라이브러리.
- **Recoil** - 전역 상태 관리 라이브러리.
- **React Query (TanStack Query React)** - 서버 상태를 불러오고, 캐싱, 동기화, 업데이트하기 위한 라이브러리 
- **Kakao Map Api** - 위치 기반 지도 서비스에 카카오맵 사용.
- **Recharts** - 리액트 차트 라이브러리
- **Vercel** - 배포



# 🗂️ 프로젝트 구조

```plaintext
RunTale_FE/
│
├── public/                 # 정적 파일
├── src/                    # 소스 코드
│   ├── assets/
│   ├── api/                # api
│   ├── components/         # 재사용 가능한 컴포넌트들
│   ├── constants/          # 상수
│   ├── pages/              # 각 페이지별 컴포넌트들
│   ├── layouts/            # 레이아웃
│   ├── context/            # 컨텍스트와 Recoil 전역상태
│   ├── hooks/              # 커스텀 훅
│   ├── utils/              # 유틸 함수들
│   ├── App.js              # 애플리케이션 진입점
│   └── index.js            # ReactDOM 렌더링
│
├── .gitignore              # Git 무시 파일 설정
├── package.json            # 프로젝트 종속성 및 스크립트
└── README.md               # 프로젝트 정보
```

