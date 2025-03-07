import React, { useEffect, useRef, useState } from 'react'
import styled, { css, keyframes } from 'styled-components';
import { Category } from '../data'
import { Link } from 'react-router-dom';
import {mobile} from '../responsive'

const AnimateCategory = keyframes`
  from{
    opacity : 0;
  }
  to{
    opacity : 1;
  }
`
const AnimateCateImage = keyframes`
  from{
    transform : scale(0.6);
  }
  to{
    transform : scale(1);
  }
`

const Container = styled.div`
  padding-top : 60px;
  display : flex;
  align-items : center;
  flex-direction : column;
  background-color : white;
  animation: ${props => props.isVisible ? css`${AnimateCategory} 1s ease-in-out` : 'none'};
`
const Wrapper = styled.div`
  flex : 1;
  border : none;
  border-radius : 10px;
  display : flex;
  align-items : center;
  justify-content : center;
  
`
const Cate = styled.div`
  display : grid;
  grid-template-columns : repeat(6, 1fr);
  ${mobile({
    flexDirection : "column"
  })}
`
const Head = styled.div`
  font-size : 30px;
  font-weight : bold;
`
const Categories = styled.div`
  display : flex;
  align-items : center;
  justify-content : center;
  flex-direction : column;
  padding : 20px 30px;
  margin : 20px;
  cursor : pointer;
  transition : all 0.2s ease-out;
`
const CategoryImage = styled.img`
  width : 100%;
  height : 150px;
  border-radius : 50%;
  object-fit : cover;
`
const Name = styled.p`
  font-weight : bold;
  color : black;
  font-size : 18px;
`
const ChooseCategories = () => {

  const [isVisible, setIsVisible] = useState(false);

  const myRef = useRef();
  useEffect(() => {
  const observer = new IntersectionObserver((entries)=>{
    const entry = entries[0];
    setIsVisible(entry.isIntersecting)
  })
  observer.observe(myRef.current);
  }, []);


  return (
    <Container isVisible = {isVisible} ref = {myRef}>
      <Head>SHOP BY CATEGORIES</Head>
      <br />
      <div style={{
        width : "80px", height : "4px", backgroundColor : "black"
      }}></div>
      <br />
      <br />
      <Cate>
      {Category.map(items=>(
        <Link style={{textDecoration : "none"}} to={`/products/${items.name}`}>
          <Wrapper bg = {items.bg} key={items.id} bdr = {items.bdr}>
            <Categories isVisible = {isVisible}>
              <CategoryImage src={items.img}/>
              <Name>{items.name}</Name>
            </Categories>
          </Wrapper>
        </Link>
        ))}
        </Cate>
    </Container>
  )
}

export default ChooseCategories
