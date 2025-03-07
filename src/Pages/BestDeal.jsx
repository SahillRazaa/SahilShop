import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import Announcement from '../Components/Announcement';
import Navbar from '../Components/Navbar';
import Newsletter from '../Components/NewsLetter';
import Footer from '../Components/Footer';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { maxiphone, minilap, mobile } from '../responsive';

const themeColor = 'rgb(221,114,8)'; 

const Container = styled.div``;

const SectionHeader = styled.div`
  text-align: center;
  margin: 80px 0;
  position: relative;

  &::after {
    content: '';
    width: 100px;
    height: 2px;
    background: ${themeColor};
    position: absolute;
    bottom: -30px;
    left: 50%;
    transform: translateX(-50%);
  }
`;

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
`;


const Two = styled.p`
  text-align: center;
  color: ${themeColor}; 
  font-weight: bold;
  ${maxiphone({
    display: 'none',
  })}
`;

const MainBody = styled.div`
  
`;

const Wrapper = styled.div``;

const Upper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 80px;
  margin-bottom: 70px; 
  ${minilap({
    flexDirection: 'column',
  })}
`;

const InfoConatinerUpper = styled.div`
  flex: 1;
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 10px;
`;

const ImageConatinerUpper = styled.div`
  margin-right: 30px;
  ${minilap({
    marginRight: '0px',
  })}
`;

const TitleUpper = styled.h1`
  font-size: 40px;
  color: black;
  margin-bottom: 10px;
`;

const DescUpper = styled.div`
  width: 80%;
  color: black;
  font-size: 18px;
  margin-bottom: 15px;
`;

const Deal = styled.div`
  background-color: ${themeColor}; // Use theme color
  color: white;
  width: 30%;
  text-align: center;
  margin-top: 10px;
  padding: 8px 15px;
  font-weight: bold;
  border-radius: 6px;
  margin-bottom: 15px;
`;

const OldPrice = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const Mrp = styled.p`
  color: black;
  margin-right: 10px;
`;

const Amount = styled.p`
  color: red;
  text-decoration: line-through;
`;

const NewPrice = styled.p`
  color: black;
  font-size: 24px;
  font-weight: 500;
  margin-right: 20px;
`;

const New = styled.div`
  display: flex;
  align-items: center;
  ${maxiphone({
    flexDirection: 'column',
    alignItems: 'flex-start', // Align items to the start in mobile view
  })}
`;

const View = styled.button`
  background-color: ${themeColor}; // Use theme color
  color: white;
  padding: 8px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${themeColor}; // Darken on hover
  }

  ${maxiphone({
    marginTop: '10px', // Add margin top in mobile view
  })}
`;

const Image = styled.img`
  border-radius: 10px;
  width: 400px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  ${minilap({
    marginLeft: '0px',
    marginRight: '20px',
  })}
  ${maxiphone({
    width: '300px',
  })}
  ${mobile({
    width: '200px',
  })}
`;

const BestDeal = () => {
  const [product, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get('https://sahilshop-backend.onrender.com/api/products');
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, []);

  return (
    <Container>
      <Announcement />
      <Navbar />
      <Wrapper>
      <SectionHeader>
         <SectionTitle>Best Deals</SectionTitle>
         <Two>"All the Offers are valid only for next 10days only, Shop Now"</Two>
       </SectionHeader>
        <MainBody>
          {product.slice(10,13).map((item) => (
            <Upper key={item._id}>
              <ImageConatinerUpper>
                <Image src={item.image[0]} alt={item.title} />
              </ImageConatinerUpper>
              <InfoConatinerUpper>
                <TitleUpper>{item.title}</TitleUpper>
                <DescUpper>{item.description}</DescUpper>
                <Deal>Deal - 15% OFF</Deal>
                <OldPrice>
                  <Mrp>M.R.P: </Mrp>
                  <Amount>$ {item.price}</Amount>
                </OldPrice>
                <New>
                  <NewPrice>$ {item.price - item.price * 0.15}</NewPrice>
                  <Link to={`/product/${item._id}`}>
                    <View>VIEW</View>
                  </Link>
                </New>
              </InfoConatinerUpper>
            </Upper>
          ))}
        </MainBody>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default BestDeal;
