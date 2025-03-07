import React from 'react'
import Announcement from '../Components/Announcement'
import Navbar from '../Components/Navbar'
import Slider from '../Components/Slider'
import ChooseCategories from '../Components/ChooseCategories'
import BestProduct from '../Components/BestProduct'
import BestSeller from '../Components/BestSeller'
import Testimonial from '../Components/Testimonial'
import NewsLetter from '../Components/NewsLetter'
import Footer from '../Components/Footer'
import Image_Section from '../Components/Image_Section'


const Home = () => {
  return (
    <div>
      <Announcement/>
      <Navbar/>
      <Slider/>
      <ChooseCategories/>
      <Image_Section/>
      <BestProduct/>
      <BestSeller/>
      <Testimonial/>
      <NewsLetter/>
      <Footer/>
    </div>
  )
}

export default Home
