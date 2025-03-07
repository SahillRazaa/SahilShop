import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined'; // Correct the import
import emailjs from 'emailjs-com';
import validator from 'validator';
import {mobile} from '../responsive'

const Container = styled.div`
  height: 60vh;
  background-color: #f8f4ee;
  display: flex;
  opacity: 70%;
  align-items: center;
  color: white;
  justify-content: center;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 70px;
  color : black;
  margin-bottom: 20px;
  ${mobile({
    fontSize : "50px"
  })}
`;

const Description = styled.div`
  font-size: 24px;
  font-weight: 300;
  color : black;
  margin-bottom: 20px;
  ${mobile({
    textAlign : "center",
    width : "80%"
  })}
`;

const InputContainer = styled.div`
  width: 45%;
  height: 40px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  ${mobile({
    justifyContent : "center"
  })}
`;

const Input = styled.input`
  flex: 8;
  padding-left: 20px;
  border: 1px solid black;
  
`;

const Button = styled.button`
  border : none;
  padding : 10px 30px;
  background-color : black;
  font-weight : bold;
  color : white;
  cursor : pointer;
  transition : background-color 0.25s ease-out;
  &:hover{
      transform : scale(1.1);
      transition : transform 0.25s ease-in;
      background-color : rgb(221, 114, 8);
  }
`;

const Error = styled.span`
  color: #ccf281;
  font-weight: bold;
  font-size: 25px;
`;

const Newsletter = () => {
  const emailInputRef = useRef(null);
  const [email, setEmail] = useState('');
  const [alert, setAlert] = useState('');

  emailjs.init('9se214kBr0ctDiO14');

  const validEmail = () => {
    if (validator.isEmail(email)) {
      sendEmail();
    } else {
      setAlert('ERROR!, Not valid');
      setTimeout(() => {
        setAlert('');
      }, 2000);
    }
  };

  const sendEmail = () => {
    emailjs
      .send('service_t153zy7', 'template_w2u24la', {
        customer_email: email,
      })
      .then(
        () => {
          setAlert('Success!, Your message has been forwarded to the team');
          setEmail('');
          emailInputRef.current.value = '';
          setTimeout(() => {
          setAlert('');
        }, 2000);
        },
        () => {
          setAlert('ERROR!, Server problem');
          setTimeout(() => {
            setAlert('');
          }, 3000);
        }
      );
  };

  return (
    <Container>
      <Title>Newsletter</Title>
      <Description>Get timely updates from your favorite products</Description>
      <Error>{`${alert}`}</Error>
      <br />
      <InputContainer>
        <Input ref={emailInputRef} placeholder="Your email" onChange={(e) => setEmail(e.target.value)} />
        <Button onClick={validEmail}>
          <SendOutlinedIcon />
        </Button>
      </InputContainer>
    </Container>
  );
};

export default Newsletter;
