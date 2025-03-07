import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { Testimony } from "../data";
import { mobile } from "../responsive";

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const Container = styled.div`
  background-color : white;
  padding: 20px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #gold, transparent);
  }
`;

const Title = styled.h2`
  font-size: 42px;
  font-family: 'Playfair Display', serif;
  font-weight: 400;
  color: black;
  margin-bottom: 0px;
  letter-spacing: 2px;
  position: relative;
  padding-bottom: 15px;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 2px;
    background: #gold;
  }

  ${mobile({ fontSize: "32px" })}
`;

const Description = styled.p`
  font-size: 18px;
  color: grey;
  max-width: 800px;
  line-height: 0;
  margin-bottom: 60px;
  font-weight: 300;
  letter-spacing: 0.5px;

  ${mobile({ fontSize: "16px", padding: "0 20px" })}
`;

const TestimonialWrapper = styled.div`
  display: flex;
  gap: 40px;
  padding: 40px 0;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  width: 90%;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const TestimonialCard = styled.div`
  background: #f8f4ee;
  padding: 40px;
  border-radius: 20px;
  scroll-snap-align: center;
  position: relative;
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  border: 1px solid rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-10px);
    background: rgba(221, 115, 8, 0.73);
    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
    
    &::before {
      opacity: 1;
    }
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 20px;
    padding: 1px;
    background: linear-gradient(45deg, #gold, transparent);
    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0.5;
    transition: opacity 0.3s ease;
  }

  ${mobile({ minWidth: "85vw", padding: "30px" })}
`;

const QuoteIcon = styled.div`
  font-size: 72px;
  font-family: 'Playfair Display', serif;
  color: black;
  position: absolute;
  top: -20px;
  left: 20px;
`;

const Message = styled.p`
  font-size: 16px;
  color: black;
  line-height: 1.8;
  font-weight: 300;
  margin-bottom: 30px;
  position: relative;
  z-index: 1;
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  border-top: 1px solid rgba(0, 0, 0, 0.3);
  padding-top: 25px;
`;

const Image = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #gold;
  box-shadow: 0 0 15px rgba(255,215,0,0.2);
`;

const Name = styled.div`
  font-size: 18px;
  color: black;
  font-weight: 500;
  letter-spacing: 0.5px;
  
  span {
    display: block;
    font-size: 14px;
    color: #gold;
    font-weight: 300;
    margin-top: 5px;
  }
`;

const Testimonial = () => {
  const [activeCard, setActiveCard] = useState(0);
  const wrapperRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      if (wrapperRef.current) {
        const scrollPosition = wrapperRef.current.scrollLeft;
        const cardWidth = wrapperRef.current.children[0]?.offsetWidth || 450;
        const newActive = Math.round(scrollPosition / (cardWidth + 40));
        setActiveCard(newActive);
      }
    };

    const wrapper = wrapperRef.current;
    wrapper?.addEventListener('scroll', handleScroll);
    return () => wrapper?.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Container>
      <Title>Client Experiences</Title>
      <Description>
        Discover the refined journeys of those who have entrusted us with their vision
      </Description>
      
      <TestimonialWrapper ref={wrapperRef}>
        {Testimony.map((item, index) => (
          <TestimonialCard key={item.id}>
            <QuoteIcon>“</QuoteIcon>
            <Message>{item.message}</Message>
            <ProfileContainer>
              <Image src={item.img} />
              <Name>
                {item.name}
                <span>{item.role}</span>
              </Name>
            </ProfileContainer>
          </TestimonialCard>
        ))}
      </TestimonialWrapper>
    </Container>
  );
};

export default Testimonial;