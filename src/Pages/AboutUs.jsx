import React from 'react'
import { styled } from 'styled-components'
import Announcement from '../Components/Announcement'
import Navbar from '../Components/Navbar'
import Newsletter from '../Components/NewsLetter'
import Footer from '../Components/Footer'
import { mobile } from '../responsive'

const primaryColor = 'rgb(221,114,8)';
const accentColor = 'rgba(221,114,8,0.1)';

const Container = styled.div`
  background: #fcfcfc;
`

const Wrapper = styled.div`
  max-width: 1440px;
  margin: 60px auto;
  padding: 0 40px;

  ${mobile({
    padding: "0 20px",
    margin: "30px auto"
  })}
`

const SectionHeader = styled.div`
  text-align: center;
  margin: 80px 0;
  position: relative;

  &::after {
    content: '';
    width: 100px;
    height: 2px;
    background: ${primaryColor};
    position: absolute;
    bottom: -30px;
    left: 50%;
    transform: translateX(-50%);
  }
`

const SectionTitle = styled.h1`
  font-family: 'Playfair Display', serif;
  font-weight: 400;
  font-size: 2.8rem;
  color: #222;
  letter-spacing: 1.5px;
  margin: 0;

  ${mobile({
    fontSize: "2rem"
  })}
`

const QuoteSection = styled.div`
  display: flex;
  align-items: flex-start;
  max-width: 800px;
  margin: 60px auto;
  position: relative;
`

const QuoteMark = styled.span`
  font-family: 'Playfair Display', serif;
  font-size: 4rem;
  color: ${primaryColor};
  line-height: 1;
  margin: 0 20px;
`

const QuoteText = styled.p`
  font-family: 'Helvetica Neue', sans-serif;
  font-size: 1.1rem;
  line-height: 1.8;
  color: #444;
  text-align: center;
  flex: 1;
  position: relative;
  padding: 20px 0;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 1px;
    background: ${accentColor};
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 1px;
    background: ${accentColor};
  }
`

const Highlight = styled.span`
  color: ${primaryColor};
  font-weight: 500;
`

const ImageGallery = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  grid-template-rows: 300px 300px;
  gap: 20px;
  margin: 80px 0;

  ${mobile({
    gridTemplateColumns: "1fr",
    gridTemplateRows: "auto"
  })}
`

const MainImage = styled.img`
  grid-row: 1 / 3;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }
`

const SecondaryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }
`

const ValueGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
  max-width: 1200px;
  margin: 80px auto;
`

const ValueCard = styled.div`
  padding: 30px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`

const ValueTitle = styled.h3`
  font-family: 'Playfair Display', serif;
  font-size: 1.2rem;
  color: ${primaryColor};
  margin: 0 0 15px 0;
  position: relative;
  padding-bottom: 10px;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 30px;
    height: 1px;
    background: ${accentColor};
  }
`

const ValueDescription = styled.p`
  font-family: 'Helvetica Neue', sans-serif;
  font-size: 0.95rem;
  line-height: 1.6;
  color: #666;
  margin: 0;
`

const AboutUs = () => {
  return (
    <Container>
      <Announcement />
      <Navbar />
      <Wrapper>
        <SectionHeader>
          <SectionTitle>Our Philosophy</SectionTitle>
        </SectionHeader>

        <QuoteSection>
          <QuoteMark>“</QuoteMark>
          <QuoteText>
            At <Highlight>SAhiL</Highlight>, we believe technology should elevate your life. 
            We curate only the finest electronic devices, combining cutting-edge innovation 
            with timeless design. Our commitment extends beyond commerce - we're crafting 
            experiences that inspire.
          </QuoteText>
          <QuoteMark>”</QuoteMark>
        </QuoteSection>

        <ImageGallery>
          <MainImage src="https://i.ibb.co/Fb0h9Qv/mario-gogh-VBLHICVh-l-I-unsplash.jpg" />
          <SecondaryImage src="https://i.ibb.co/c1Lf5K4/ant-rozetsky-HXOll-TSwrp-M-unsplash.jpg" />
          <SecondaryImage src="https://i.ibb.co/x88FMtr/campaign-creators-g-Msn-Xq-ILjp4-unsplash.jpg" />
          <SecondaryImage src="https://i.ibb.co/x88FMtr/campaign-creators-g-Msn-Xq-ILjp4-unsplash.jpg" />
          <SecondaryImage src="https://i.ibb.co/x88FMtr/campaign-creators-g-Msn-Xq-ILjp4-unsplash.jpg" />
        </ImageGallery>

        <SectionHeader>
          <SectionTitle>Why SAhiL</SectionTitle>
        </SectionHeader>

        <ValueGrid>
          <ValueCard>
            <ValueTitle>Curated Excellence</ValueTitle>
            <ValueDescription>
              Our team of experts meticulously selects each product, ensuring 
              perfect harmony of form and function.
            </ValueDescription>
          </ValueCard>

          <ValueCard>
            <ValueTitle>Secure Ecosystem</ValueTitle>
            <ValueDescription>
              Multi-layered security protocols and encrypted transactions 
              protect your digital journey at every step.
            </ValueDescription>
          </ValueCard>

          <ValueCard>
            <ValueTitle>Concierge Service</ValueTitle>
            <ValueDescription>
              24/7 personalized support from certified technology specialists 
              and product experts.
            </ValueDescription>
          </ValueCard>

          <ValueCard>
            <ValueTitle>Seamless Experience</ValueTitle>
            <ValueDescription>
              Intuitive interface design with augmented reality previews 
              and AI-powered recommendations.
            </ValueDescription>
          </ValueCard>

          <ValueCard>
            <ValueTitle>Sustainable Innovation</ValueTitle>
            <ValueDescription>
              Commitment to eco-friendly packaging and carbon-neutral 
              delivery partnerships.
            </ValueDescription>
          </ValueCard>

          <ValueCard>
            <ValueTitle>Curated Excellence</ValueTitle>
            <ValueDescription>
              Our team of experts meticulously selects each product, ensuring 
              perfect harmony of form and function.
            </ValueDescription>
          </ValueCard>
        </ValueGrid>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  )
}

export default AboutUs