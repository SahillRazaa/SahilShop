import React, { useState } from 'react'
import Announcement from '../Components/Announcement'
import Navbar from '../Components/Navbar'
import Products from '../Components/Products'
import {styled} from 'styled-components'
import Newsletter from '../Components/NewsLetter'
import Footer from '../Components/Footer'
import { useLocation } from 'react-router-dom'
import { maxiphone } from '../responsive'

const Container = styled.div`

`
const TitleSection = styled.div`
  text-align: center;
  margin-top: 60px;
  margin-bottom: 60px;
  width: 100%;
  position: relative;

  &::after {
    content: '';
    width: 120px;
    height: 2px;
    background: rgb(221,114,8);
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
`;

const Wrapper = styled.div`
    margin : 0px 20px;
`
const FiltersContainer = styled.div`
  display : flex;
  justify-content : space-between;
`
const Left = styled.div`
  margin-left : 50px;  
  display : flex;
  justify-content : center;
  align-items : center;
  ${maxiphone({
    flexDirection : "column",
    marginLeft : "50px"
  })}
`
const Right = styled.div`
  margin-right : 60px;
`
const Select = styled.select`
  padding : 5px 10px;
  color : white;
  font-weight : bold;
  margin-left : 15px;
  border-radius : 10px;
  background-color : rgb(221, 114, 8);
  ${maxiphone({
    margin : "5px 0px"
  })}
`
const Option = styled.option`
  text-align : center;
`


const ProductList = () => {

  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("")
  const handlechange = (e)=>{
    const value = e.target.value;
    setFilters({ ...filters,
    [e.target.name] : value}) 
  };

  return (
    <Container>
      <Announcement/>
      <Navbar/>
      <Wrapper>
      <TitleSection>
        <SectionTitle id='prodList'>{cat || 'Our Collection'}</SectionTitle>
      </TitleSection>
      <FiltersContainer>
        <Left>
          <Select name = "Brand" onChange={handlechange}>
            <Option selected disabled>Brand</Option>
            <Option>Apple</Option>
            <Option>Samsung</Option>
            <Option>OnePlus</Option>
            <Option>Boat</Option>
            <Option>Canon</Option>
            <Option>Nikon</Option>
          </Select>
          {cat === "All-Products" ? <Select name = "categories" onChange={handlechange}>
            <Option selected disabled>categories</Option>
            <Option>Clothing</Option>
            <Option>Home</Option>
            <Option>Beauty</Option>
            <Option>Jewelry</Option>
            <Option>Food</Option>
          </Select> : ""}
        </Left>
        <Right>
        <Select onChange={(e)=>setSort(e.target.value)}>
            <Option selected disabled>Sort</Option>
            <Option value = "h_to_l">High to low</Option>
            <Option value  = "l_to_h" >Low to high</Option>
          </Select>
        </Right>
      </FiltersContainer>
      </Wrapper>
      <Products cat = {cat} filters = {filters} sort = {sort}/>
      <Newsletter/>
      <Footer/>
    </Container>
  )
}
export default ProductList
