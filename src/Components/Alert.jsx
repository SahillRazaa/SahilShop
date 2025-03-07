import React from 'react'
import { keyframes, styled } from 'styled-components'

const Container = styled.div`
`

const AnimateMessage = keyframes`
  from{
    transform : transitionX(100%);
    opacity : 0;
  }
  to{
    transform : transitionX(0%);
    opacity : 1;
  }
`

const MessageContainer = styled.div`
    border : 4px solid ${props=>props.color};
    height : 40px;
    background-color : white;
    width : 30vw;
    color : ${props=>props.color};
    font-weight : bold;
    display : flex; 
    justify-content : center;
    align-items : center;
    position : fixed;
    top : 10%;
    right : 0;
    border-radius : 10px 0px 0px 10px;
    align-items : center;
    text-align : center;
    padding : 15px 0px;
    font-size : 18px;
    animation : ${AnimateMessage} 1s ease-in-out;
`

const Alert = (props) => {
  
  return (
    <Container>
        {props.alert &&
        <MessageContainer color = {props.alert.txt === "Success! : "?"green":"red"}>{props.alert.txt} {props.alert.msg}</MessageContainer>
        }
    </Container>
  )
}

export default Alert
