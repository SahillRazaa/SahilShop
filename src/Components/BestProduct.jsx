import React, { useEffect, useRef, useState } from 'react'
import {css, keyframes, styled} from 'styled-components'
import {minilap, mobile, tablet} from '../responsive'

const Container = styled.div`
    height : auto;
    margin : 30px;
    display : flex;
    padding-top : 60px;
    align-items : center;
    justify-content : center;
    flex-direction : column;
    background-color : white;
    ${mobile({
      display : "none"
    })}
`
const Upper = styled.div`
    display : flex;
    align-items : center;
    justify-content : center;
    padding-left : 80px;
    ${minilap({
      flexDirection : "column"
    })}
`

const InfoConatinerUpper = styled.div`
    flex :1;
    display : flex;
    flex-direction : column;
    align-items : center;
    justify-content : center;
`
const ImageConatinerUpper = styled.img`
    flex :1;
    width : 0%;
`

const AnimateTitle = keyframes`
    from{
      width : 43%;
    }
    to{
      width : 0%;
    }
`

const TitleUpper = styled.h1`
    font-size : 50px;
    color : black;
`
const DescUpper = styled.div`
width : 80%;
color : black;
font-size : 20px;
`
const Lower = styled.div`
display : flex;
align-items : center;
justify-content : center;
${minilap({
  display : "none"
})}
`
const InfoConatinerLower = styled.div`
    flex : 1;
    display : flex;
    flex-direction : column;
    align-items : center;
    justify-content : center;
    padding-left : 150px;

`
const ImageConatinerLower = styled.img`
    flex : 1;
    width : 0%;
    height : 70vh;
`
const TitleLower = styled.h1`
    font-size : 40px;
    // width : 80%;
    color : black;
    text-align : center;
    
`
const DescLower = styled.div`
color : black;
font-size : 20px;
// width : 80%;
text-align : center;
`

const Button =  styled.button`
  border : none;
  padding : 10px 30px;
  border-radius : 10px;
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
`

const Head = styled.div`
  font-size : 30px;
  font-weight : bold;
`

const BestProduct = () => {

  const [isVisible, setIsVisible] = useState(false);

  const myRef = useRef();
  useEffect(() => {
  const observer = new IntersectionObserver((entries)=>{
    const entry = entries[0];
    setIsVisible(entry.isIntersecting)
  })
  observer.observe(myRef.current);
  }, []);
  
  const [isVisible1, setIsVisible1] = useState(false);

  const myRef1 = useRef();
  useEffect(() => {
  const observer1 = new IntersectionObserver((entries)=>{
    const entry1 = entries[0];
    setIsVisible1(entry1.isIntersecting)
  })
  observer1.observe(myRef1.current);
  }, []);
  

  return (
    <Container>
      <Head>MOST SELLER</Head>
      <br />
      <div style={{
        width : "80px", height : "4px", backgroundColor : "black"
      }}></div>
      <Upper>
        <InfoConatinerUpper>
            <TitleUpper ref={myRef}>American Crew</TitleUpper>
            <DescUpper>3-In-1 Shampoo,Conditioner and Body Wash 250ml/8.45oz</DescUpper>
            <br />
            <br />
            <Button>Buy Now</Button>
        </InfoConatinerUpper>
        <ImageConatinerUpper src="https://i5.walmartimages.com/seo/American-Crew-3-In-1-Shampoo-Conditioner-and-Body-Wash-250ml-8-45oz_912b8793-2fc9-4033-89ed-06a9b1569823.293b45869047789dc2d257f360f933d2.jpeg"/>
      </Upper>
      <Lower>
        <ImageConatinerLower src="https://i5.walmartimages.com/seo/JOURNEE-COLLECTION-Womens-Burgundy-Geometric-Zipper-Accent-Padded-Sarah-Square-Toe-Block-Heel-Zip-Up-Dress-Booties-11_b7272c72-26b9-429b-8683-8afbb69c89be.2b07f025a446f2ad7b728555de9c6d0c.jpeg" />
        <InfoConatinerLower>
            <TitleLower ref={myRef1}>JOURNEE COLLECTION</TitleLower>
            <DescLower>Womens Burgundy Heel Zip-Up Dress Booties</DescLower>
            <br />
            <br />
            <Button>Buy Now</Button>
        </InfoConatinerLower>
      </Lower>
      {/* <HideTitle1 isVisible = {isVisible}></HideTitle1>
      <HideTitle2 isVisible1 = {isVisible1}></HideTitle2> */}
    </Container>
  )
}

export default BestProduct
