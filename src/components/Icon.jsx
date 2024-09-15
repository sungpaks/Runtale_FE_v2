import React from 'react';

// 여러 아이콘을 정의
const Icon1 = ({ color }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
    <path d="M8.28604 18.8506H18.2292M12.4893 3.54769L3.8719 9.37535C3.52217 9.61186 3.31445 9.99472 3.31445 10.4028V21.3096C3.31445 22.354 4.2048 23.2008 5.30309 23.2008H21.2122C22.3105 23.2008 23.2008 22.354 23.2008 21.3096V10.4028C23.2008 9.99472 22.9931 9.61186 22.6434 9.37535L14.0259 3.54769C13.566 3.23662 12.9493 3.23662 12.4893 3.54769Z" 
      stroke={color} strokeWidth="1.6572" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Icon2 = ({ color }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
    <path d="M12.9356 21.7286C14.4112 20.6464 18.4839 19.1315 22.9698 21.7286V5.49667M2.6062 5.20155V21.7286C4.08183 20.6464 8.15455 19.1315 12.6405 21.7286V5.7918M2.6062 5.15992C4.08183 4.07779 8.15455 2.56281 12.6405 5.15992M12.9356 5.15992C14.4112 4.07779 18.4839 2.56281 22.9698 5.15992" 
      stroke={color} strokeWidth="1.65455" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Icon3 = ({ color }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
    <path d="M19.0251 6.68246C18.702 7.00553 18.702 7.52933 19.0251 7.8524C19.3482 8.17547 19.872 8.17547 20.195 7.8524L19.0251 6.68246ZM21.0804 3.14096C20.7573 2.81789 20.2335 2.81789 19.9105 3.14096C19.5874 3.46403 19.5874 3.98783 19.9105 4.3109L21.0804 3.14096ZM22.5666 6.96703C22.8897 7.2901 23.4135 7.2901 23.7365 6.96703C24.0596 6.64395 24.0596 6.12015 23.7365 5.79708L22.5666 6.96703ZM13.797 10.4373C13.797 9.98041 13.4266 9.61003 12.9697 9.61003C12.5129 9.61003 12.1425 9.98041 12.1425 10.4373H13.797ZM12.1425 14.0186C12.1425 14.4755 12.5129 14.8458 12.9697 14.8458C13.4266 14.8458 13.797 14.4755 13.797 14.0186H12.1425ZM10.3182 1.29391C9.86134 1.29391 9.49095 1.6643 9.49095 2.12119C9.49095 2.57808 9.86134 2.94846 10.3182 2.94846V1.29391ZM15.6213 2.94846C16.0781 2.94846 16.4485 2.57808 16.4485 2.12119C16.4485 1.6643 16.0781 1.29391 15.6213 1.29391V2.94846ZM20.195 7.8524L22.4085 5.63896L21.2385 4.46902L19.0251 6.68246L20.195 7.8524ZM19.9105 4.3109L21.2385 5.63896L22.4085 4.46902L21.0804 3.14096L19.9105 4.3109ZM21.2385 5.63896L22.5666 6.96703L23.7365 5.79708L22.4085 4.46902L21.2385 5.63896ZM12.1425 10.4373V14.0186H13.797V10.4373H12.1425ZM10.3182 2.94846H15.6213V1.29391H10.3182V2.94846ZM21.1576 14.2424C21.1576 18.8128 17.4853 22.506 12.9697 22.506V24.1606C18.4121 24.1606 22.8122 19.7135 22.8122 14.2424H21.1576ZM12.9697 22.506C8.45421 22.506 4.78186 18.8128 4.78186 14.2424H3.12732C3.12732 19.7135 7.52741 24.1606 12.9697 24.1606V22.506ZM4.78186 14.2424C4.78186 9.67198 8.45421 5.97876 12.9697 5.97876V4.32422C7.52741 4.32422 3.12732 8.77128 3.12732 14.2424H4.78186ZM12.9697 5.97876C17.4853 5.97876 21.1576 9.67198 21.1576 14.2424H22.8122C22.8122 8.77128 18.4121 4.32422 12.9697 4.32422V5.97876Z" fill={color}/>
  </svg>
);

const Icon4 = ({ color }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
    <path d="M7.30672 22.2727C5.32979 22.2727 3.72717 20.6701 3.72717 18.6932V6.76132C3.72717 4.7844 5.32979 3.18179 7.30672 3.18179H19.2385C21.2155 3.18179 22.8181 4.7844 22.8181 6.76132L22.8181 18.6932C22.8181 20.6701 21.2155 22.2727 19.2385 22.2727H7.30672Z" stroke={color}  strokeWidth="1.65455" strokeLinejoin="round"/>
    <path d="M8.4999 14.3181L14.0681 6.76132V11.9317H18.0454L12.4772 18.6931V14.3181H8.4999Z" stroke={color} strokeWidth="1.65455" strokeLinejoin="round"/>
  </svg>
);

export default function Icon({ type, color }) {
    switch(type) {
      case 'icon1':
        return <Icon1 color={color} />;
      case 'icon2':
        return <Icon2 color={color} />;
      case 'icon3':
        return <Icon3 color={color} />;
      case 'icon4':
        return <Icon4 color={color} />;
      default:
        return null;
    }
  }
