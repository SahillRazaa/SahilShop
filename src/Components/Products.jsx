import { styled } from 'styled-components'
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { maxiphone, mobile } from '../responsive';

const primaryColor = 'rgb(221,114,8)';
const accentColor = 'rgba(221,114,8,0.1)';

const Container = styled.div`
  max-width: 1440px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 80px 40px;
  // background: #fcfcfc;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid ${accentColor};

  ${mobile({
    padding: "40px 20px"
  })}
`;

const TitleSection = styled.div`
  text-align: center;
  margin-bottom: 60px;
  width: 100%;
  position: relative;

  &::after {
    content: '';
    width: 120px;
    height: 2px;
    background: ${primaryColor};
    position: absolute;
    bottom: -20px;
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

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 60px;
  width: 100%;
  padding: 40px 0;

  ${mobile({
    gap: "30px",
    gridTemplateColumns: "1fr"
  })}
`;

const ProductCard = styled.div`
  position: relative;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 380px;
  background: #f9f9f9;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.05);
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.1);
    pointer-events: none;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.8s cubic-bezier(0.23, 1, 0.32, 1);
  ${ProductCard}:hover & {
    transform: scale(1.05);
  }
`;

const ProductDetails = styled.div`
  padding: 28px;
  text-align: center;
  background: #fff;
`;

const ProductName = styled.h3`
  font-family: 'Helvetica Neue', sans-serif;
  font-weight: 400;
  font-size: 1.1rem;
  color: #333;
  margin: 0 0 12px 0;
  letter-spacing: 1.2px;
  text-transform: uppercase;
`;

const ProductPrice = styled.div`
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.4rem;
  color: ${primaryColor};
  font-weight: 500;
  letter-spacing: 0.5px;
`;

const Divider = styled.div`
  width: 40px;
  height: 1px;
  background: ${primaryColor};
  margin: 20px auto;
  opacity: 0.6;
`;

const Products = ({ cat, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredproducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat !== "All-Products"
            ? `https://sahilshop-backend.onrender.com/api/products/?category=${cat}`
            : "https://sahilshop-backend.onrender.com/api/products"
        );
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, [cat]);

  useEffect(() => {
    if (cat) {
      setFilteredProducts(
        products.filter(item =>
          Object.entries(filters).every(([key, value]) =>
            item[key]?.includes(value)
          )
        )
      );
    } else {
      setFilteredProducts(products);
    }
  }, [products, cat, filters]);

  useEffect(() => {
    if (sort === "l_to_h") {
      setFilteredProducts(prev =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts(prev =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <Container>      
      <ProductsGrid>
        {filteredproducts.map(item => (
          <ProductCard key={item.id}>
            <Link to={`/product/${item._id}`}>
              <ImageContainer>
                <ProductImage src={item.image[0]} alt={item.title} />
              </ImageContainer>
            </Link>
            <ProductDetails>
              <ProductName>{item.title}</ProductName>
              <Divider />
              <ProductPrice>$ {item.price.toLocaleString()}</ProductPrice>
            </ProductDetails>
          </ProductCard>
        ))}
      </ProductsGrid>
    </Container>
  );
};

export default Products;