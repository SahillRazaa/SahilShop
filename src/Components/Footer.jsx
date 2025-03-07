import React from 'react'
import styled from 'styled-components'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import PinterestIcon from '@mui/icons-material/Pinterest';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import {miniminitablet, mobile} from '../responsive'

const Container = styled.div`
    display : flex;
    color : black;
    ${mobile({
        flexDirection : "column"
    })}
    ${miniminitablet({
        flexDirection : "column"
    })}
`
const Left = styled.div`
    flex : 1;
    display : flex;
    flex-direction : column;
    padding : 20px;
`
const Logo = styled.h1`
display : flex;
margin:0px;
${mobile({
    justifyContent : "center"
})}
`
const Desc = styled.p`
    margin-top: 0px;
    width : 80%;
    ${mobile({
        marginLeft : "30px",
        textAlign : "center"
    })}
`
const SocialContainer = styled.div`
    display : flex;
    ${mobile({
        justifyContent : "center"
    })}
`
const SocialIcon = styled.div`
    width : 40px;
    height : 40px;
    border-radius : 50%;
    color : white;
    background-color : #${props=>props.color};
    display : flex;
    align-items : center;
    justify-content : center;
    margin-right : 8px;
    cursor : pointer;
    transition : all 1.5 ease-out;
&:hover{
  transform : scale(1.2);
  transition : all 1.5 ease-in;
}
`
const Center = styled.div`
    flex : 1;
    padding : 20px;
`

const Title = styled.h3`
    margin-bottom : 30px;
    ${mobile({
        textAlign : "center"
    })}
`
const List = styled.ul`
    margin : 0;
    padding : 0;
    list-style : none;
    display : flex;
    flex-wrap : wrap;
    ${mobile({
        justifyContent : "center",
    })}
`
const ListItem = styled.li`
    width : 30%;
    margin-bottom : 10px;
    margin-left : 20px;
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
const Right = styled.div`
    flex : 1;
    padding : 20px;
`
const ContactItem = styled.div`
    margin-bottom : 20px;
    cursor : pointer;
    display : flex;
    align-items : center;
    ${mobile({
        textAlign : "center"
    })}
`

const Payment = styled.img`
    width : 50%;
`
const Logo1 = styled.p`
font-size : 30px;
font-weight : 600;
color : black;
cursor : pointer;
`
const Logo2 = styled.p`
font-size : 30px;
font-weight : 600;
color : #FF2D55;

cursor : pointer;
`
const Logo3 = styled.p`
font-size : 30px;
font-weight : 600;
color : black;
cursor : pointer;
`


const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>
        <Logo1>SA</Logo1>
        <Logo2>hi</Logo2>
        <Logo3>L.</Logo3>
        </Logo>
        <Desc> SAhiL: Your Gateway to Innovation - Explore a diverse range of cutting-edge electronics here. From gadgets to appliances, we bring you quality and convenience in one seamless shopping experience.
        </Desc>
        <SocialContainer>
            <SocialIcon color = "385999">
                <FacebookIcon/>
            </SocialIcon>
            <SocialIcon color = "da0486">
                <InstagramIcon/>
            </SocialIcon>
            <SocialIcon color = "55ACEE">
                <TwitterIcon/>
            </SocialIcon>
            <SocialIcon color = "E60023">
                <PinterestIcon/>
            </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
            <ListItem>Home</ListItem>
            <ListItem>Cart</ListItem>
            <ListItem>Man Fashion</ListItem>
            <ListItem>Woman Fashion</ListItem>
            <ListItem>Accessories</ListItem>
            <ListItem>My Account</ListItem>
            <ListItem>Order Tracking</ListItem>
            <ListItem>Wishlist</ListItem>
            <ListItem>Wishlist</ListItem>
            <ListItem>Terms</ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem><LocationOnIcon style={{marginRight : "10px"}}/>314, Golmuri Pani tanki road, Jamshedpur, Jharkhand - 831003</ContactItem>
        <ContactItem><PhoneIcon style={{marginRight : "10px"}}/>+91 7992298128</ContactItem>
        <ContactItem><EmailIcon style={{marginRight : "10px"}}/>contact@Sahil.fashion.dev</ContactItem>
        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
      </Right>
    </Container>
  )
}

export default Footer
