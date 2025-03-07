import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import Announcement from '../Components/Announcement';
import Navbar from '../Components/Navbar';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import BestSeller from '../Components/BestSeller';
import Newsletter from '../Components/NewsLetter';
import Footer from '../Components/Footer';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addProducts } from '../redux/cartRedux';
import Alert from '../Components/Alert';
import { maximobile, miniminilap } from '../responsive';

const Container = styled.div`
  background-color: #f9f9f9;
`;

const Wrapper = styled.div`
  display: flex;
  margin: 50px auto;
  max-width: 1200px;
  ${miniminilap({
    flexDirection: 'column',
    alignItems: 'center',
  })}
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${miniminilap({
    width: '100%',
  })}
`;

const MainImage = styled.img`
  width: 400px;
  height: 400px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  ${miniminilap({
    width: '100%',
    height: 'auto',
  })}
`;

const ThumbnailContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
`;

const Thumbnail = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 10px;
  cursor: pointer;
  border: 2px solid ${(props) => (props.active ? 'rgb(221,114,8)' : 'transparent')};
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
    border-color: rgb(221,114,8);
  }
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0 40px;
  ${miniminilap({
    padding: '20px',
    textAlign: 'center',
  })}
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-size: 1.1rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 30px;
`;

const Specifications = styled.div`
  margin-bottom: 30px;
`;

const Feature = styled.div`
  display: flex;
  margin-bottom: 15px;
  ${miniminilap({
    flexDirection: 'column',
    alignItems: 'center',
  })}
`;

const Type = styled.div`
  font-weight: 600;
  color: #333;
  min-width: 150px;
`;

const Value = styled.div`
  color: #666;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const CurrPrice = styled.h2`
  font-size: 2rem;
  color: rgb(221,114,8);
  margin-right: 20px;
`;

const PrePrice = styled.p`
  font-size: 1.2rem;
  color: #999;
  text-decoration: line-through;
`;

const SelectionContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
`;

const Quantity = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const QuantityButton = styled.button`
  background-color: rgb(221,114,8);
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #990000;
  }
`;

const Number = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
`;

const Colors = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Color = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${(props) => props.color ? props.color : "red"};
  cursor: pointer;
  border: 2px solid ${(props) => (props.active ? 'rgb(221,114,8)' : 'transparent')};
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const BuyButton = styled.button`
  background-color: rgb(221,114,8);
  color: white;
  border: none;
  padding: 15px 30px;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #990000;
    transform: translateY(-2px);
  }
`;

const Product = () => {
  const user = useSelector((state) => state.user);
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState(["red"]);
  const [alert, setAlert] = useState('');
  const [mainImage, setMainImage] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get('https://sahilshop-backend.onrender.com/api/products/find/' + id);
        setProduct(res.data);
        setMainImage(res.data.image[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, [id]);

  const handleQuantity = (type) => {
    if (type === 'dec' && quantity !== 1) {
      setQuantity(quantity - 1);
    } else if (type === 'inc') {
      setQuantity(quantity + 1);
    }
  };

  const createCart = async () => {
    try {
      const exist = await axios.get(
        'https://sahilshop-backend.onrender.com/api/carts/findCart?user=' + user.currentUser._id,
        {
          headers: {
            token: `Bearer ${user.currentUser.accessToken}`,
          },
        }
      );
  
      if (exist.data.length === 0) {
        await axios.post(
          'https://sahilshop-backend.onrender.com/api/carts/create',
          {
            user: user.currentUser._id,
            product: { ...product, quantity, color },
            total: product.price * quantity,
            quantity: quantity,
          },
          {
            headers: {
              token: `Bearer ${user.currentUser.accessToken}`,
            },
          }
        );
        dispatch(addProducts({ ...product, quantity, color }));
      } else {
        const cart = exist.data[0];
        const updatedProducts = [...cart.Products, { ...product, quantity, color }];
        const updatedTotal = cart.total + product.price * quantity;
        const updatedQuantity = cart.quantity + quantity;
  
        await axios.put(
          'https://sahilshop-backend.onrender.com/api/carts/update/' + cart.userID,
          {
            Products: updatedProducts,
            total: updatedTotal,
            quantity: updatedQuantity,
          },
          {
            headers: {
              token: `Bearer ${user.currentUser.accessToken}`,
            },
          }
        );
        dispatch(addProducts({ ...product, quantity, color }));
      }
    } catch (error) {
      console.log("Error in creating cart", error);
    }
  };

  const handleClick = () => {
    if (user.currentUser !== null) {
      createCart();
    } else {
      showAlert('Please login/register to add products to cart', 'ERROR! :');
    }
  };

  const handleColor = (c) => {
    setColor(c);
  };

  const showAlert = (message, text) => {
    setAlert({
      msg: message,
      txt: text,
    });
    setTimeout(() => {
      setAlert(null);
    }, 4000);
  };

  return (
    <Container>
      <Announcement />
      <Navbar />
      <Alert alert={alert} />
      <Wrapper>
        <ImageContainer>
          <MainImage src={mainImage} />
          <ThumbnailContainer>
            {product.image?.map((img, index) => (
              <Thumbnail
                key={index}
                src={img}
                active={img === mainImage}
                onClick={() => setMainImage(img)}
              />
            ))}
          </ThumbnailContainer>
        </ImageContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Description>{product.description}</Description>
          <PriceContainer>
            <CurrPrice>${(product.price * 0.85).toFixed(2)}</CurrPrice>
            <PrePrice>${product.price}</PrePrice>
          </PriceContainer>
          <SelectionContainer>
            <Quantity>
              <QuantityButton onClick={() => handleQuantity('dec')}>
                <RemoveIcon />
              </QuantityButton>
              <Number>{quantity}</Number>
              <QuantityButton onClick={() => handleQuantity('inc')}>
                <AddIcon />
              </QuantityButton>
            </Quantity>
            <Colors>
              {product.color?.slice(0,3).map((c) => (
                <Color
                  key={c}
                  color={c}
                  active={color === c}
                  onClick={() => handleColor(c)}
                />
              ))}
            </Colors>
          </SelectionContainer>
          <BuyButton onClick={handleClick}>Add to Cart</BuyButton>
        </InfoContainer>
      </Wrapper>
      <BestSeller />
      <Footer />
    </Container>
  );
};

export default Product;