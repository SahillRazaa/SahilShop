import React from 'react'
import styled from 'styled-components'
import Banner1 from '../images/banner1.png'

const Container = styled.div`

`

const Image = styled.img`
    width : 100%;
`

const Image_Section = () => {
  return (
    <Container>
        <Image src = {Banner1}/>
    </Container>
  )
}

export default Image_Section