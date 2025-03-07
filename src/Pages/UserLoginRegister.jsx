import React, { useState } from "react";
import styled from "styled-components";
import { login, register } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import validator from 'validator'
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  > * {
    position: relative;
    z-index: 2;
  }
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("https://i.ibb.co/Yk7k5Qg/milena-trifonova-5-h5c-X1e11-I-unsplash.jpg") no-repeat center center;
    background-size: cover;
    filter: blur(6px);
    z-index: 1;
  }
`;

const Wrapper = styled.div`
  width: 70vw;
  height: 70vh;
  background-color: #eaeaea;
  position: relative;
  display: flex;
  border-radius : 50px;
`;

const RegisterSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;

const LeftButton = styled.button`
  background-color: #e05e5e;
  color: white;
  cursor: pointer;
  border-radius: 6px;
  font-size : 18px;
  padding : 5px 10px;
  border : none;
  box-shadow : 0px 0px 10px 2px black;
  transition : all 0.2s ease-out;
  &:hover {
    transform : scale(1.1);
    transition : all 0.2s ease-in;
    background-color : red;
  }
`;

const LoginSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;

const TitleLeft = styled.div`
  position : absolute;
  top : 0;
  left : 3vw;
  display : flex;
  align-items : center;
  justify-content : center;
`

const Title = styled.h3`
  text-align : center;
  line-height : 0px;
`

const TitleRight = styled.div`
  position : absolute;
  top : 20px;
  left : 38vw;
  display : flex;
  align-items : center;
  justify-content : center;
`

const RightButton = styled.button`
  background-color: #e05e5e;
  color: white;
  cursor: pointer;
  border-radius: 6px;
  font-size : 18px;
  padding : 5px 10px;
  border : none;
  box-shadow : 0px 0px 10px 2px black;
  transition : all 0.2s ease-out;
  &:hover {
    transform : scale(1.1);
    transition : all 0.2s ease-in;
    background-color : red;
  }
`;
const Button = styled.button`
  font-size : 18px;
  padding : 5px 10px;
  margin-top : 20px;
  border-radius : 6px;
  cursor: pointer;
  background-color : lightblue;
  color : black;
  border : none;
  box-shadow : 0px 0px 10px 2px black;
  transition : all 0.2s ease-out;
  &:hover {
    transform : scale(1.1);
    transition : all 0.2s ease-in;
    background-color : #11b4c6;
  }
`;

const Input = styled.input`
  width: 300px;
  padding: 10px;
  margin: 6px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const LogoImage = styled.img`
  width : 50px;
`

const LeftButtonContainer = styled.div`
  display : flex;
  align-items : center;
  justify-content : center;
  margin-top: 20px;
`

const LeftText = styled.p`
  margin : 0px 10px;
`

const RightButtonContainer = styled.div`
  display : flex;
  align-items : center;
  justify-content : center;
  margin-top: 20px;
`

const RightText = styled.p`
  margin : 0px 10px;
`

const SliderAnimate = styled.img`
  width: 35vw;
  height: 70vh;
  position: absolute;
  left: 0;
  transform: ${(props) =>
    props.slideToRight ? "translateX(100%) rotate(180deg)" : "translateX(0) rotate(180deg)"};
  transition: transform 0.5s ease;
  z-index: 999;
`

const LoginPage = () => {
  const [slideToRight, setSlideToRight] = useState(false);

  const [loginUsername, setLoginUserName] = useState("");
  const [loginUserpassword, setLoginUserPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [registerUsername, setRegisterUserName] = useState("");
  const [registerUseremail, setRegisterUserEmail] = useState("");
  const [registerUserpassword, setRegisterUserPassword] = useState("");
  const [registerUserRePassword, setRegisterUserRePassword] = useState("");
  const [registerError, setRegisterError] = useState("");

  const dispatch = useDispatch();
  const {isFetching, error, currentUser} = useSelector(state=>state.user);

  const handleLogin = (e) => {
    e.preventDefault();
    if(currentUser === null){
        if(!loginUsername || !loginUserpassword){
            setLoginError("Please Enter Everything..");
            setTimeout(() => {
                setLoginError("");
            }, 3000);
            }
        else{
            login(dispatch, { username : loginUsername, password: loginUserpassword });
            setLoginUserName("");
            setLoginUserPassword("");
        }
    }
    if(error){
        setLoginError("Something went wrong..");
        setTimeout(() => {
            setLoginError("");
        }, 3000);
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();

        if(registerUserpassword && registerUserpassword === registerUserRePassword){
            if(!registerUsername || !registerUseremail){
                setRegisterError("Enter details before Register")
                setTimeout(() => {
                    setRegisterError("");
                }, 3000);
            }
            else {
                setRegisterUserName("");
                setRegisterUserEmail("");
                setRegisterUserPassword("");
                setRegisterError("");
                register(dispatch, { username: registerUsername, email: registerUseremail, password: registerUserpassword });
            }
        }else if(registerUserpassword !== registerUserRePassword){
            setRegisterError("Password does not match..");
            setTimeout(() => {
                setRegisterError("");
            }, 3000); 
        }
        else if(error === true){
            setRegisterError("Something went wrong..");
            setTimeout(() => {
                setRegisterError("");
            }, 3000); 
        }
    }

    // const validEmail = (e)=>{
    //     if(validator.isEmail(email)){
    //         handleRegister(e);
    //     }
    //     else{
    //     setRegisterError("Please enter a valid email");
    //     setTimeout(() => {
    //         setRegisterError("");
    //     }, 3000); 
    //     }
    // };

  const handleLeftClick = (e) => {
    e.preventDefault();
    setSlideToRight(false);
  };

  const handleRightClick = (e) => {
    e.preventDefault();
    setSlideToRight(true);
  };

  return (
    <Container>
      <Wrapper>
        <RegisterSection>
          <TitleLeft>
            <Title>SahilShop</Title>
          </TitleLeft>
          <form onSubmit={handleRegister} style={{display : "flex", flexDirection : "column", alignItems : "center", justifyContent : "center", lineHeight : "0px"}}>
            <Title style={{fontSize : "30px"}}>Hi, Welcome To SahilHub</Title>
            <Title style={{fontSize : "20px", color : "grey"}}>Register your credentials</Title>
            <Input placeholder="User Name" type="text" value={registerUsername} onChange={(e) => setRegisterUserName(e.target.value)} />
            <br />
            <Input placeholder="Email" type="email" value={registerUseremail} onChange={(e) => setRegisterUserEmail(e.target.value)} />
            <br />
            <Input placeholder="Password" type="password" value={registerUserpassword} onChange={(e) => setRegisterUserPassword(e.target.value)} />
            <br />
            <Input placeholder="Re-enter Password" type="password" value={registerUserRePassword} onChange={(e) => setRegisterUserRePassword(e.target.value)} />
            <br />
            <Button type="submit">Register</Button>
            <br />
            {registerError && <p style={{color : "red", paddingTop : "10px"}}>{registerError}</p>}
            <LeftButtonContainer>
              <LeftText>Already have an account?</LeftText>
              <LeftButton onClick={handleLeftClick}>Login</LeftButton>
            </LeftButtonContainer>
          </form>
        </RegisterSection>
        <LoginSection>
          <TitleRight>
            <Link to="/" style={{color : "black", textDecoration : "none"}}> <Title>SahilShop</Title></Link>
          </TitleRight>
          <form style={{display : "flex", flexDirection : "column", alignItems : "center", justifyContent : "center", lineHeight : "0px"}}>
            <Title style={{fontSize : "30px"}}>Hi, Welcome Back</Title>
            <Title style={{fontSize : "20px", color : "grey"}}>Login your credentials</Title>
            <Input placeholder="UserName" onChange={(e) => setLoginUserName(e.target.value)}/>
            <br />
            <Input  placeholder="Password" type="password" onChange={(e) => setLoginUserPassword(e.target.value)}/>
            <br />
            <Button onClick={handleLogin} disabled = {isFetching}>Login</Button>
            <br />
            {loginError && <p style={{color : "red", paddingTop : "10px"}}>{loginError}</p>}
            <RightButtonContainer>
              <RightText>Dont have an account?</RightText>
              <RightButton onClick={handleRightClick}>Register</RightButton>
            </RightButtonContainer>
          </form>
        </LoginSection>
        <SliderAnimate slideToRight={slideToRight}  src = "https://media.giphy.com/media/aUTye2tUx1fz2/giphy.gif"/>
      </Wrapper>
    </Container>
  );
};

export default LoginPage;
 