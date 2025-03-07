import React, { useEffect, useState } from 'react';
import Announcement from '../Components/Announcement';
import Navbar from '../Components/Navbar';
import Newsletter from '../Components/NewsLetter';
import Footer from '../Components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { decreaseQuantity, emptyProducts, increaseQuantity, removeProducts } from '../redux/cartRedux';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div``;

const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;
`;

/* ===========================
   ADDRESS FORM STYLES
=========================== */
const AddressForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const Row = styled.div`
  display: flex;
  gap: 20px;
`;

const FormGroup = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 5px;
  color: #333;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 70px;
  flex: 2;
`;

const LeftTitle = styled.h2`
  font-size: 26px;
  margin-bottom: 10px;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: black;
  margin: 20px 0;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: rgba(195, 195, 195, 0.57);
`;

const RightTitle = styled.h1`
  margin-bottom: 20px;
`;

const RightTop = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const RightTot = styled.p`
  font-size: 20px;
  font-weight: bold;
`;

const RightQuant = styled.p`
  font-size: 20px;
  font-weight: bold;
`;

const DropDown = styled.div`
  position: relative;
  width: 100%;
  margin-top: 15px;
`;

const DropButton = styled.button`
  border: 2px solid #ddd;
  width: 100%;
  padding: 12px 20px;
  border-radius: 8px;
  background-color: white;
  font-weight: 500;
  color: #333;
  cursor: pointer;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s ease;

  &:hover {
    border-color: #999;
    background-color: #f8f8f8;
  }
`;

const DropMenu = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: white;
  border: 2px solid #ddd;
  border-radius: 8px;
  margin-top: 5px;
  padding: 0;
  list-style: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 10;
  max-height: 200px;
  overflow-y: auto;
`;

const Option = styled.li`
  padding: 12px 20px;
  font-size: 16px;
  color: #333;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f8f8f8;
    color: #000;
  }

  &:not(:last-child) {
    border-bottom: 1px solid #eee;
  }
`;

const Promo = styled.p`
  font-size: 20px;
  font-weight: bold;
`;

const PromoInput = styled.input`
  font-size: 18px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  margin-top: 10px;
`;

const ApplyPromo = styled.button`
  font-size: 18px;
  background-color: rgb(255, 79, 79);
  color: white;
  border: none;
  padding: 10px 20px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.25s ease-out;
  margin-top: 10px;

  &:hover {
    transition: transform 0.25s ease-in;
    background-color: rgb(157, 0, 0);
  }
`;

const FinalAmount = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const FinalTitle = styled.p`
  font-size: 20px;
  font-weight: bold;
`;

const FinalPrice = styled.p`
  font-size: 20px;
  font-weight: bold;
`;

const ContinueShoppingButton = styled.button`
  border: none;
  padding: 10px 30px;
  border-radius: 10px;
  background-color: black;
  font-weight: bold;
  color: white;
  cursor: pointer;
  transition: background-color 0.25s ease-out;
  margin-top: 20px;

  &:hover {
    transition: transform 0.25s ease-in;
    background-color: rgb(221, 114, 8);
  }
`;

const SelectPayMode = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin: 0px 20px;
  gap: 100px;
`;

const PayOption = styled.button`
  padding: 20px 0px;
  font-size: 15px;
  font-weight: bold;
  border: ${props =>
    props.selectedmode === props.currmode ? '2px solid rgb(221, 114, 8)' : '2px solid #ddd'};
  border-radius: 10px;
  color: ${props => (props.selectedmode === props.currmode ? 'rgb(221, 114, 8)' : '#333')};
  background: none;
  cursor: pointer;
`;

const CheckoutButton = styled.button`
  font-size: 18px;
  background-color: rgb(79, 158, 255);
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.25s ease-out;

  &:hover {
    transition: transform 0.25s ease-in;
    background-color: rgb(0, 70, 155);
  }
`;

const Checkout = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const [cartProducts, setCartProducts] = useState(cart.products);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const shipAmount = location.state?.shipAmount || 0;
  const taxAmount = 0.18 * cart.total;
  const [paymentMode, setPaymentMode] = useState(1);

  // Address fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [addrState, setAddrState] = useState('');
  const [zip, setZip] = useState('');

  // Payment fields
  const [nameoncard, setNameoncard] = useState('');
  const [cardnumber, setCardnumber] = useState('');
  const [expiremonth, setExpiremonth] = useState('');
  const [expireyear, setExpireyear] = useState('');
  const [cvv, setCvv] = useState('');
  const [upi, setUpi] = useState('');

  useEffect(() => {
    setCartProducts(cart.products);
  }, [cart.products]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    navigate('/products/All-Products');
  };

  const handlePayMode = (mode, e) => {
    e.preventDefault();
    setPaymentMode(mode);
  };

  const handleOrder = () => {

    if(cartProducts.length === 0) {
      alert("Your cart is empty. Please add some products to proceed.");
      return;
    }

    if (
      !name.trim() ||
      !phone.trim() ||
      !address.trim() ||
      !city.trim() ||
      !addrState.trim() ||
      !zip.trim()
    ) {
      alert("Please fill out all address fields.");
      return;
    }

    if (paymentMode === 1) { // Card
      if (
        !nameoncard.trim() ||
        !cardnumber.trim() ||
        !expiremonth.trim() ||
        !expireyear.trim() ||
        !cvv.trim()
      ) {
        alert("Please fill out all card details.");
        return;
      }
    } else if (paymentMode === 2) { // UPI
      if (!upi.trim()) {
        alert("Please enter your UPI ID or Number.");
        return;
      }
    }
    createOrder(
      user.currentUser._id,
      cartProducts,
      (cart.total + shipAmount + taxAmount).toFixed(2),
      cartProducts.length,
      address,
      city,
      addrState,
      zip,
      user.currentUser.accessToken
    );
  };

  const handleCartRemove = async (userID, Token) => {
    try {
      await axios.delete(`https://sahilshop-backend.onrender.com/api/carts/deleteCart/${userID}`, {
        headers: {
          token: `Bearer ${Token}`,
        },
      });
    } catch (error) {
      console.log("Error in deleting cart:", error);
    }
  };  

  const createOrder = async (userID, Products, total, quantity, address, city, state, pincode, Token) => {
    try {
      await axios.post("https://sahilshop-backend.onrender.com/api/orders/create", {
        user: userID,
        product: Products,
        total: total,
        quantity: quantity,
        address: address,
        city: city,
        state: state,
        pincode: pincode,
      }, {
        headers: {
          token: `Bearer ${Token}`
      }
      })
      handleCartRemove(userID, Token);
      dispatch(emptyProducts());
      navigate("/");
      console.log("Order created successfully!");
    } catch (error) {
      console.log("Error creating order: ", error);
    }
  }

  return (
    <Container>
      <Announcement />
      <Navbar />
      <Wrapper>
        <Left>
          <LeftTitle>Shopping Address</LeftTitle>
          <Line />
          <AddressForm>
            <Row>
              <FormGroup>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  placeholder="Your Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </FormGroup>
            </Row>
            <FormGroup>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                placeholder="Street Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </FormGroup>
            <Row>
              <FormGroup>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  placeholder="State"
                  value={addrState}
                  onChange={(e) => setAddrState(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="zip">Zip Code</Label>
                <Input
                  id="zip"
                  placeholder="Zip Code"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                />
              </FormGroup>
            </Row>
          </AddressForm>
          <LeftTitle>Payment Method</LeftTitle>
          <Line />
          <AddressForm>
            <SelectPayMode>
              <PayOption
                selectedmode={paymentMode}
                currmode={1}
                onClick={(e) => handlePayMode(1, e)}
              >
                Card
              </PayOption>
              <PayOption
                selectedmode={paymentMode}
                currmode={2}
                onClick={(e) => handlePayMode(2, e)}
              >
                UPI
              </PayOption>
              <PayOption
                selectedmode={paymentMode}
                currmode={3}
                onClick={(e) => handlePayMode(3, e)}
              >
                COD/Cash
              </PayOption>
            </SelectPayMode>
            {paymentMode === 1 && (
              <>
                <Label>
                  You have chosen <b>Card</b> as your payment method
                </Label>
                <FormGroup>
                  <Label htmlFor="nameoncard">Name on Card*</Label>
                  <Input
                    id="nameoncard"
                    placeholder="Full Name"
                    value={nameoncard}
                    onChange={(e) => setNameoncard(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="cardnumber">Card Number*</Label>
                  <Input
                    id="cardnumber"
                    placeholder="0000 0000 0000 0000"
                    value={cardnumber}
                    onChange={(e) => setCardnumber(e.target.value)}
                  />
                </FormGroup>
                <Row>
                  <FormGroup>
                    <Label htmlFor="expiremonth">Expire month*</Label>
                    <Input
                      id="expiremonth"
                      placeholder="MM"
                      value={expiremonth}
                      onChange={(e) => setExpiremonth(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="expireyear">Expire year*</Label>
                    <Input
                      id="expireyear"
                      placeholder="YYYY"
                      value={expireyear}
                      onChange={(e) => setExpireyear(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="cvv">CVV*</Label>
                    <Input
                      id="cvv"
                      type="password"
                      placeholder="000"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                    />
                  </FormGroup>
                </Row>
              </>
            )}
            {paymentMode === 2 && (
              <>
                <Label>
                  You have chosen <b>UPI</b> as your payment method
                </Label>
                <FormGroup>
                  <Label htmlFor="upi">UPI ID / UPI Number*</Label>
                  <Input
                    id="upi"
                    placeholder="username@bank / 9876543210"
                    value={upi}
                    onChange={(e) => setUpi(e.target.value)}
                  />
                </FormGroup>
              </>
            )}
            {paymentMode === 3 && (
              <Label>
                You have chosen <b>Cash on Delivery</b> as your payment method
              </Label>
            )}
          </AddressForm>
        </Left>
        <Right>
          <RightTitle>Order Summary</RightTitle>
          <Line />
          <RightTop>
            <RightQuant>Total Items:</RightQuant>
            <RightTot>{cartProducts.length}</RightTot>
          </RightTop>
          <RightTop>
            <RightQuant>Items Amount</RightQuant>
            <RightTot>$ {cart.total.toFixed(2)}</RightTot>
          </RightTop>
          <RightTop>
            <RightQuant>Shipping Amount</RightQuant>
            <RightTot>$ {shipAmount}</RightTot>
          </RightTop>
          <RightTop>
            <RightQuant>Tax Fee</RightQuant>
            <RightTot>$ {taxAmount.toFixed(2)}</RightTot>
          </RightTop>
          <Line />
          <RightTop>
            <RightQuant>Expected Delivery:</RightQuant>
            <RightTot>{shipAmount === 2 ? "5-6 Days" : "1-2 Days"}</RightTot>
          </RightTop>
          <FinalAmount>
            <FinalTitle>Order Total</FinalTitle>
            <FinalPrice>$ {(cart.total + shipAmount + taxAmount).toFixed(2)}</FinalPrice>
          </FinalAmount>
          <CheckoutButton onClick={handleOrder}>Place Order</CheckoutButton>
          <ContinueShoppingButton onClick={handleContinueShopping}>
            Continue Shopping
          </ContinueShoppingButton>
        </Right>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Checkout;
