import React, { useEffect, useState } from 'react'
import {keyframes, styled} from"styled-components";
import SearchIcon from '@mui/icons-material/Search';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { Badge } from '@mui/material';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector } from 'react-redux';
import {mobile, tablet} from '../responsive'
import MenuIcon from '@mui/icons-material/Menu';
import { logOut } from '../redux/userRedux';
import { emptyProducts } from '../redux/cartRedux';
const HamburgerContainer = styled.div`
    height : 50px;
    display : none;
    ${tablet({
    display : "block"
    })}
`
const AnimateNav = keyframes`
    from{
      transform : translateY(-100%);
      opacity : 0;
    }
    to{
      transform : translateY(0%);
      opacity : 1;
    }
`
const Container = styled.div`
    height : 80px;
    ${tablet({
      display : "none"
    })}
    animation : ${AnimateNav} 1s ease-in-out;
    border-bottom : 2px solid black;
`
const Wrapper = styled.div`
  height : 100%;
  display : flex;
  align-items : center;
  justify-content : space-between;
  background-color : white;
  color : #030303;
  padding : 0px 30px;
`
const HamWrapper = styled.div`
  height : 100%;
  display : flex;
  align-items : center;
  justify-content : space-between;
  background-color : white;
  color : #030303;
`
const Left = styled.div`
  display : flex;
  flex = 1;
  align-items : center;
`
const NavElement = styled.span`
  margin-left : 20px;
  font-size : 16px;
  color : black;
  font-weight : 500;
  cursor : pointer;
  display: inline-block;
  position: relative;
  &::after{   
      content: '';
      position: absolute;
      width: 100%;
      transform: scaleX(0);
      top : 20px;
      height: 4px;
      left: 0;
      background-color: rgb(221, 114, 8);
      transform-origin: bottom right;
      transition: transform 0.25s ease-out;
    }
    &:hover::after {
      transform: scaleX(1);
      transform-origin: bottom left;
    }
`
const Center = styled.div`
  display : flex;
  flex : 4;
  text-align : center;
  justify-content : center;
`
const HamLeft = styled.div`
display : flex;
flex = 1;
align-items : center;
justify-content : flex-end;
margin-left : 0px;
${mobile({
  display : "none"
})}
`
const Logo1 = styled.p`
font-size : 25px;
font-weight : 600;
color :rgb(0, 0, 0);
cursor : pointer;
`
const Logo2 = styled.p`
font-size : 30px;
font-weight : 600;
color : #FF2D55;
opacity : 70%;
cursor : pointer;
`
const Logo3 = styled.p`
font-size : 30px;
font-weight : 600;
color : black;
opacity : 70%;
cursor : pointer;
`
const Right = styled.div`
  flex : 1;
  display : flex;
  align-items : center;
  justify-content : flex-end;
  margin-right : 20px;
`

const SearchContainer = styled.div`
  border : 0.5px solid lightgray;
  display : flex;
  align-items : center;
  margin-left : 20px;
  border-radius : 10px;
`
const Input = styled.input`
  border : none;
  padding : 5px;
  border-radius : 10px;
`
const HamRight = styled.div`
flex : 1;
display : flex;
align-items : center;
justify-content : flex-end;
margin-right : 20px;
`
const HamCenter = styled.div`
display : flex;
flex : 3;
text-align : center;
justify-content : center;
${mobile({
  justifyContent : "flex-end",
  flex : "1",
  marginRight : "100px"
})}
`
const DropDownContainer = styled.div`
  display : ${props=>props.dropdrown === false ? "none":"flex"};
  flex-direction : column;
  justify-content : center;
  align-items : center;
  padding : 10px 0px;
  line-height : 30px;
  background-color : #E5E5E5;
  color : #030303;
`
const MenuButton = styled.button`
border : none;
background : transparent;
cursor : pointer;
transition : all 1s ease-out;
&:hover{
  transform: scale(1.4);
  transition : all 0.25s ease-in;
}
`
const DropSearch = styled.div`
display : none;
justify-content : center;
align-items : center; 
${mobile({
  display : "flex"
})}
`

const Navbar = () => {

  const quantity = useSelector(state=>state.cart.quantity)
  const [drop, setDrop] = useState(false);
  const user = useSelector(state=>state.user);
  const dispatch = useDispatch();
  let path  = ""
  let name = ""
    if(user.logout === false){
      path = "profile";
      name = "PROFILE";
    }
    else{
    path  = "login";
    name = "LOGIN/REGISTER";
    }
    const handleDrop = ()=>{
      drop ? setDrop(false) : setDrop(true);
    }

    const handleLogout = ()=>{
      dispatch(logOut());
      dispatch(emptyProducts());
      path  = "login";
      name = "LOGIN";
    }

    useEffect(() => {
      setTimeout(() => {
        if(user.currentUser.username !== " "){
          handleLogout();
        }
      }, 18000000);
    }, [])
    

  return (
    <>
    <Container>
      <Wrapper>
        <Left>
          <Logo1>SahilShop</Logo1>
        </Left>
        <Center>
          <Link to="/">
          <NavElement >HOME</NavElement>
          </Link>
          <Link to="/products/All-Products">
          <NavElement style={{marginLeft : "40px"}}>PRODUCTS</NavElement>
          </Link>
          <Link to="/aboutus"> 
          <NavElement style={{marginLeft : "40px"}}>ABOUT US</NavElement>
          </Link>
          <Link to="/deals">
          <NavElement style={{marginLeft : "40px"}}>DAILY DEALS</NavElement>
          </Link>
        </Center>
        <Right>
          <SearchContainer>
            <Input placeholder="Search"></Input>
            <SearchIcon style = {{color : "grey", fontSize : 25, padding:"2px", cursor : "pointer"}}/>
          </SearchContainer>

          <Link to={`/${path}`}>
          <NavElement>{`${name}`}</NavElement>
          </Link>
          <Link to="/cart" style={{color : "black"}}>
          {user.currentUser?<Badge badgeContent={quantity} color="primary">
          <LocalMallIcon style={{marginLeft : "20px", cursor : "pointer"}}/>
          </Badge>
          :""}
          </Link>
        </Right>
      </Wrapper>
    </Container>
    <HamburgerContainer>
      <HamWrapper>
      <HamLeft>
        <SearchContainer>
          <Input placeholder="Search"></Input>
          <SearchIcon style = {{color : "grey", fontSize : 25, padding:"2px", cursor : "pointer"}}/>
          </SearchContainer>
      </HamLeft>
      <HamCenter>
        <Logo1>SA</Logo1>
        <Logo2>hi</Logo2>
        <Logo3>L.</Logo3>
      </HamCenter>
      <HamRight>
        <MenuButton onClick={handleDrop}>
          <MenuIcon/>
        </MenuButton>
        <Link to="/cart" style={{color : "black"}}>
          {user.currentUser?<Badge badgeContent={quantity} color="primary">
          <LocalMallIcon style={{marginLeft : "20px", cursor : "pointer"}}/>
          </Badge>
          :""}
          </Link>
      </HamRight>
      </HamWrapper>
    </HamburgerContainer>
    <DropDownContainer dropdrown = {drop}>
    <Link to="/">
      <DropSearch>
        <SearchContainer>
          <Input placeholder="Search"></Input>
          <SearchIcon style = {{color : "grey", fontSize : 25, padding:"2px", cursor : "pointer"}}/>
          </SearchContainer>
      </DropSearch>
          <NavElement style={{backgroundColor : "#d3d1d1", width : "80vw", textAlign : "center", borderRadius : "10px", margin : "5px 0px"}}>HOME</NavElement>
          </Link>
          <Link to="/products/All-Products">
          <NavElement style={{backgroundColor : "#d3d1d1", width : "80vw", textAlign : "center", borderRadius : "10px", margin : "5px 0px"}}>PRODUCTS</NavElement>
          </Link>
          <Link to="/aboutus"> 
          <NavElement style={{backgroundColor : "#d3d1d1", width : "80vw", textAlign : "center", borderRadius : "10px", margin : "5px 0px"}}>ABOUT US</NavElement>
          </Link>
          <Link to="/deals">
          <NavElement style={{backgroundColor : "#d3d1d1", width : "80vw", textAlign : "center", borderRadius : "10px", margin : "5px 0px"}}>DAILY DEALS</NavElement>
          </Link>

          <Link to={`/${path}`}>
          <NavElement style={{backgroundColor : "#d3d1d1", width : "80vw", textAlign : "center", borderRadius : "10px", margin : "5px 0px"}}>{`${name}`}</NavElement>
          </Link>
    </DropDownContainer>
    </>
  )
}

export default Navbar
