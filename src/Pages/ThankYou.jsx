import React from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-20px);
  }
  60% {
    transform: translateY(-10px);
  }
`
const ThankYouMessage = styled.h1`
  font-size: 36px;
  margin-bottom: 20px;
  color : purple;
  animation: ${bounce} 1s ease infinite;
  text-align : center;
`

const SubMessage = styled.p`
  font-size: 18px;
  color : purple;
  opacity : 60%;
  text-align : center;
`

const ThankYouImage = styled.img`
  width: 200px;
  height: auto;
  border-radius: 30px;
 
`
const Home = styled.button`
margin : 10px;
border : none;
  color : white;
  font-weight : bold;
  background-color : purple;
  padding : 8px 40px;
  border-radius : 10px;
  transition : all 0.25s ease-out;
  &:hover{
    transform : scale(1.1);
    transition : all 0.25s ease-in;
    background-color : white;
    color : purple;
    border : 2px solid purple;

`

const ThankYouPage = () => {
  return (
    <PageWrapper>
      <ThankYouImage
        src="https://i.ibb.co/DWWQyRk/howie-r-Cj-I-2-QX7hv-U-unsplash.jpg"
        alt="Thank You Image"
      />
      <ThankYouMessage>Thank You for Your Purchase!</ThankYouMessage>
      <SubMessage>Your order has been successfully processed.</SubMessage>
      <Link to="/">
      <Home>Back To Home</Home>
      </Link>
    </PageWrapper>
  );
};

export default ThankYouPage;
