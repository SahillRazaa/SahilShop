import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Announcement from '../Components/Announcement';
import Navbar from '../Components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../redux/userRedux';
import { emptyProducts } from '../redux/cartRedux';
import Footer from '../Components/Footer';
import axios from 'axios';
import { maxilap, maximobile, minilap, minitablet, tablet } from '../responsive';
import { FiEdit, FiMapPin, FiLock, FiSettings, FiFileText, FiLogOut, FiPackage } from 'react-icons/fi';

const Container = styled.div`
  background: #f8f9fa;
  color: #2d3436;
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5rem 2rem;
  ${maximobile({ padding: '3rem 1rem' })};
`;

const Head = styled.h1`
  font-size: 2.5rem;
  font-weight: 600;
  font-family: 'Playfair Display', serif;
  color: #2d3436;
  margin-bottom: 2rem;
  position: relative;
  text-align: center;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: rgb(221, 114, 8);
  }
`;

const Body = styled.div`
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 2.5rem;
  width: 100%;
  max-width: 1200px;
  ${maxilap({ gridTemplateColumns: '1fr' })};
`;

const Left = styled.div`
  background: #ffffff;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  height: fit-content;
`;

const UserInfo = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #eee;
`;

const Username = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #2d3436;
  font-weight: 600;
`;

const UserEmail = styled.p`
  color: #636e72;
  font-size: 0.9rem;
`;

const MenuItem = styled.button`
  width: 100%;
  padding: 1rem;
  margin: 0.5rem 0;
  border: none;
  background: ${({ active }) => (active ? '#e3f2fd' : 'transparent')};
  color: ${({ active }) => (active ? 'rgb(221, 114, 8)' : '#2d3436')};
  font-weight: 500;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.2s ease;
  
  &:hover {
    background: #f1f3f5;
    color: rgb(221, 114, 8);
  }

  svg {
    margin-right: 1rem;
    font-size: 1.2rem;
    color: ${({ active }) => (active ? 'rgb(221, 114, 8)' : '#636e72')};
  }
`;

const Right = styled.div`
  background: #ffffff;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
`;

const OrderCard = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  transition: transform 0.3s ease;
  border: 1px solid #eee;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  }
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
`;

const OrderDate = styled.span`
  color: #636e72;
  font-size: 0.9rem;
`;

const OrderStatus = styled.span`
  background: ${({ status }) => status === 'delivered' ? '#00b894' : '#fdcb6e'};
  color: #fff;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const ProductItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #f8f9fa;
  
  &:last-child {
    border-bottom: none;
  }
`;

const ProductInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ProductImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  object-fit: cover;
  border: 1px solid #eee;
`;

const EmptyOrders = styled.div`
  text-align: center;
  padding: 4rem 0;
  
  svg {
    font-size: 4rem;
    color: rgb(221, 114, 8);
    margin-bottom: 1rem;
  }

  h3 {
    color: #2d3436;
    font-weight: 500;
    margin-bottom: 1rem;
  }

  p {
    color: #636e72;
    font-size: 0.9rem;
  }
`;

const Profile = () => {
  const user = useSelector((state) => state.user);
  const [orderProducts, setOrderProducts] = useState([]);
  const dispatch = useDispatch();
  const [activeMenu, setActiveMenu] = useState('orders');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get('https://sahilshop-backend.onrender.com/api/orders/findOrder', {
          headers: { token: 'Bearer ' + user.currentUser.accessToken },
          params: { user: user.currentUser._id },
        });
        setOrderProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchOrders();
  }, [user]);

  const handleLogout = () => {
    dispatch(logOut());
    dispatch(emptyProducts());
  };

  return (
    <Container>
      <Announcement />
      <Navbar />
      <Wrapper>
        <Head>{user.currentUser.username}'s Profile</Head>
        <Body>
          <Left>
            <UserInfo>
              <Username>{user.currentUser.username}</Username>
              <UserEmail>{user.currentUser.email}</UserEmail>
            </UserInfo>
            
            <MenuItem onClick={() => setActiveMenu('edit')} active={activeMenu === 'edit'}>
              <FiEdit /> Edit Profile
            </MenuItem>
            <MenuItem onClick={() => setActiveMenu('address')} active={activeMenu === 'address'}>
              <FiMapPin /> Shipping Address
            </MenuItem>
            <MenuItem onClick={() => setActiveMenu('security')} active={activeMenu === 'security'}>
              <FiLock /> Security
            </MenuItem>
            <MenuItem onClick={() => setActiveMenu('orders')} active={activeMenu === 'orders'}>
              <FiPackage /> My Orders
            </MenuItem>
            <MenuItem onClick={() => setActiveMenu('settings')} active={activeMenu === 'settings'}>
              <FiSettings /> Settings
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <FiLogOut /> Logout
            </MenuItem>
          </Left>

          <Right>
            {activeMenu === 'orders' ? (
              orderProducts.length > 0 ? (
                orderProducts.map((order) => (
                  <OrderCard key={order._id}>
                    <OrderHeader>
                      <OrderDate>ORDER PLACED {new Date(order.createdAt).toLocaleDateString()}</OrderDate>
                      <OrderStatus status={order.status}>{order.status}</OrderStatus>
                    </OrderHeader>
                    {order.Products.map((product) => (
                      <ProductItem key={product._id}>
                        <ProductInfo>
                          <ProductImage src={product.image[0]} />
                          <div>
                            <h4>{product.title}</h4>
                            <p style={{ color: '#aaa', fontSize: '0.9rem' }}>Qty: {product.quantity}</p>
                          </div>
                        </ProductInfo>
                        <div style={{ color: '#FFD700', fontWeight: '500' }}>
                          ₹{(product.price * product.quantity).toLocaleString()}
                        </div>
                      </ProductItem>
                    ))}
                  </OrderCard>
                ))
              ) : (
                <EmptyOrders>
                  <FiPackage />
                  <h3>No Orders Found</h3>
                  <p>You haven't placed any orders yet.</p>
                </EmptyOrders>
              )
            ) : (
              // Add other menu content sections here
              <div>Coming Soon</div>
            )}
          </Right>
        </Body>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Profile;