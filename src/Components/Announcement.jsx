import React from "react"
import {keyframes, styled} from "styled-components"
import {mobile} from "../responsive"

const AnimateNav = keyframes`
    from{
      opacity : 0;
    }
    to{
      opacity : 1;
    }
`

const Container = styled.div`
    background-color :rgba(221, 115, 8, 0.73);
    opacity : 80%;
    font-size : 14px;
    color : white;
    height : 30px;
    display : flex;
    align-items : center;
    justify-content : center;
    font-weight : bold;
    text-align : center;
    ${mobile({
      padding : "10px 0px"
    })}
    animation : ${AnimateNav} 1s ease-in-out;
`

const Announcement = () => {
  return (
    <Container>
      Buy now and save big on your favourite mobile phone - up to 15% off.
    </Container>
  )
}

export default Announcement
