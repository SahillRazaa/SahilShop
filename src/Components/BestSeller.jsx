import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { BestSell } from "../data";
import { mobile } from "../responsive";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #f8f4ee;
  padding: 60px 20px;
`;

const Head = styled.h2`
  font-size: 36px;
  font-weight: 700;
  color: #222;
  letter-spacing: 1px;
  margin-bottom: 10px;
`;

const Underline = styled.div`
  width: 80px;
  height: 4px;
  background-color: #222;
  border-radius: 2px;
  margin-bottom: 40px;
`;

const Cate = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  width: 100%;

  ${mobile({
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "20px",
  })}
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Wrapper = styled.div`
  background: white;
  border-radius: 15px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  animation: ${(props) => (props.isVisible ? fadeIn : "none")} 0.8s ease-in-out;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.15);
  }
`;

const CategoryImage = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 10px;
  object-fit: cover;

  ${mobile({
    width: "200px",
  })}
`;

const GoButton = styled.button`
  border : none;
  padding : 10px 30px;
  margin-top : 30px;
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
`;

const ChooseCategories = () => {
  const [isVisible, setIsVisible] = useState(false);
  const myRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      setIsVisible(entry.isIntersecting);
    });
    observer.observe(myRef.current);
  }, []);

  return (
    <Container>
      <Head>Best Sellers</Head>
      <Underline />
      <Cate>
        {BestSell.map((item) => (
          <Wrapper isVisible={isVisible} ref={myRef} key={item.id}>
            <CategoryImage src={item.img} />
            <GoButton>Shop Now</GoButton>
          </Wrapper>
        ))}
      </Cate>
    </Container>
  );
};

export default ChooseCategories;
