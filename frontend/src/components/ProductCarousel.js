import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {  Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader'
import Message from './Message'
import { listTopProducts } from '../actions/productActions'
import axios from 'axios'
import AddCarouselModal from './AddCarouselModel.js'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel'

const ProductCarousel = () => {
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const dispatch = useDispatch()

  const [image, setImage] = useState([])
  const [data, setdata] = useState([])
  const [show, setshow] = useState(false)

  const productTopRated = useSelector((state) => state.productTopRated)
  const { loading, error, products } = productTopRated 

  const dispat = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.get('/api/upload/carousel', config)

    setdata(data[data.length - 1].image)
  }

  useEffect(() => {
    //dispatch(listTopProducts())
    
    dispat()

  

  }, [dispatch, show])

 const uploadFileHandler = async (files) => {
    const file = files

    const formData = new FormData()

    for (let key of file) {
      console.log(key);

      formData.append('image', key)

    }

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload/two', formData, config)

      setImage(data.split(','))

      
    } catch (error) {
      console.error(error)
      
    }
  }
  const create = async () => {

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.post('/api/upload/carousel',{image}, config)

 

    setdata(data.image)

    setshow(false)
    }


  

  return loading ? (  <Loader /> ) : error ? ( <Message variant='danger'>{error}</Message>) : (<section className="carou">
    {userInfo && userInfo.isAdmin && (<span className="carouse_edit" onClick={() => setshow(true)}><i class="far fa-edit"></i></span>)}
    <Carousel showArrows={true} autoPlay={true} infiniteLoop={true} interval = {5000} >
      
      {data != undefined && data.map((el, ind) => (
            
            <div>
              <img src={el} alt={"sorry"} className="carousel_image"/>
            </div>
        
      ))}
    </Carousel>
    <AddCarouselModal
        show={show}
        handleclose={() => setshow(false)}
        modaltitle="change the carousel"
        uploadFileHandler={uploadFileHandler}
        onSubmit={create}
    />
  </section>
  )
}

export default ProductCarousel