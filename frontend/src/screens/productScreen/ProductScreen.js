import React, {useState ,useEffect, useRef} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux' 
import { Row, Col, Image, ListGroup, Card, Button, Form, Breadcrumb} from 'react-bootstrap'
import Rating from '../../components/Rating'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import Product from '../../components/product/Product'
import Meta from '../../components/Meta'
import {listProductDetails,createProductReview} from '../../actions/productActions'
import { SubCategory2 } from '../../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../../constants/productConstants' 
import SwiperCore, { Navigation, Pagination, } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import './ProductScreenCss.css'


SwiperCore.use([Navigation, Pagination]);

const ProductScreen = ({match, history}) => {
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    const [index, setindex] = useState(0)

    const container = useRef(null)
    
    const dispatch = useDispatch()
    
    const  productDetails = useSelector(state => state.productDetails)
    const {loading, error, product} =  productDetails 

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const productReviewCreate = useSelector((state) => state.productReviewCreate)
    const {
        success: successProductReview,
        loading: loadingProductReview,
        error: errorProductReview,
    } = productReviewCreate 

    const productNavbar = useSelector((state) => state.productNavbar)
    const {  products } = productNavbar

    

    

    let productReviews = []
    for (let index = 0; index < 10 ; index++) {
        if (product.reviews[index] !== undefined) {
            productReviews.push(product.reviews[index])
        }

    }

    let productSmallImages = []
    if (product.image !== undefined) {
        
        for (let index = 0; index < 5; index++) {
            if (product.image[index] !== undefined) {
                productSmallImages.push(product.image[index])
            }

        }

    }
   
    useEffect(() => { 

           dispatch(listProductDetails(match.params.id))
        dispatch(SubCategory2(history.location.search.split("=")[1]))
           
    if (successProductReview) {
      setRating(0)
      setComment('')
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }
    
  }, [dispatch, match, successProductReview])

    const addToCartHandler = () => {
        
        history.push(`/cart/${match.params.id}/?qty=${qty}`)  
    } 

    const submitHandler = (e) => {

    e.preventDefault()
    
    dispatch( createProductReview(match.params.id, { rating, comment,  }))

  }

/*************************************************************** */
        
       if (container.current != null) {
           
               container.current.addEventListener('mouseover', function () {
                   imageZoom('featured')

               })


               function imageZoom(imgID) {
                   let img = document.getElementById(imgID)
                   let lens = document.getElementById('lens')

                   lens.style.backgroundImage = `url( ${img.src} )`

                   let ratio = 3

                   lens.style.backgroundSize = (img.width * ratio) + 'px ' + (img.height * ratio) + 'px';

                   img.addEventListener("mousemove", moveLens)
                   lens.addEventListener("mousemove", moveLens)
                   img.addEventListener("touchmove", moveLens)

                   function moveLens() {
                       /*
                       Function sets sets position of lens over image and background image of lens
                       1 - Get cursor position
                       2 - Set top and left position using cursor position - lens width & height / 2
                       3 - Set lens top/left positions based on cursor results
                       4 - Set lens background position & invert
                       5 - Set lens bounds
                   
                       */

                       //1
                       let pos = getCursor()
                       //console.log('pos:', pos)

                       //2
                       let positionLeft = pos.x - (lens.offsetWidth / 2)
                       let positionTop = pos.y - (lens.offsetHeight / 2)

                       //5
                       if (positionLeft < 0) {
                           positionLeft = 0
                       }

                       if (positionTop < 0) {
                           positionTop = 0
                       }

                       if (positionLeft > img.width - lens.offsetWidth / 3) {
                           positionLeft = img.width - lens.offsetWidth / 3
                       }

                       if (positionTop > img.height - lens.offsetHeight / 3) {
                           positionTop = img.height - lens.offsetHeight / 3
                       }

                       


                       //3
                       lens.style.left = positionLeft + 'px';
                       lens.style.top = positionTop + 'px';

                       //4
                       lens.style.backgroundPosition = "-" + (pos.x * ratio) + 'px -' + (pos.y * ratio) + 'px'
                   }

                   function getCursor() {
                       /* Function gets position of mouse in dom and bounds
                        of image to know where mouse is over image when moved
                       
                       1 - set "e" to window events
                       2 - Get bounds of image
                       3 - set x to position of mouse on image using pageX/pageY - bounds.left/bounds.top
                       4- Return x and y coordinates for mouse position on image
                       
                        */

                       let e = window.event
                       let bounds = img.getBoundingClientRect()

                       //console.log('e:', e)
                       //console.log('bounds:', bounds)
                       let x = e.pageX - bounds.left
                       let y = e.pageY - bounds.top
                       x = x - window.pageXOffset;
                       y = y - window.pageYOffset;

                       return { 'x': x, 'y': y }
                   }

               }

               imageZoom('featured')
         
       }

    const responsive = {
        0: {

            slidesPerView: 2,
        },
        // when window width is >= 768px
        768: {

            slidesPerView: 3,
        },
        992: {
            slidesPerView: 4,
        },
        1200:
        {
            slidesPerView: 5,
        }

    }
    

    
    return (
        <>
                 

            {loading ? <Loader /> 
                 : error ? (<Message variant='danger'>{error}</Message>) 
                 : (
                     <>
                     <Meta title={product.name} />
                    <Row>
                        <Col>
                            <Breadcrumb className="Breadcrumb-style">
                                <Breadcrumb.Item >
                                            <Link to='/'> Accueil </Link>
                                </Breadcrumb.Item>
                                    <Breadcrumb.Item>
                                            <Link to={`/product/category/${product.category}`}>   {product.category} </Link>
                                    </Breadcrumb.Item>
                                        <Breadcrumb.Item  ><Link to={`/product/sub-category/${product.subCategoryId}`}>{product.subCategoryId}</Link></Breadcrumb.Item>
                                        <Breadcrumb.Item  ><Link to={`/product/sub-category2/${product.subCategoryId2}`}>{product.subCategoryId2}</Link></Breadcrumb.Item>
                                    <Breadcrumb.Item  active>{product.name}</Breadcrumb.Item>
                            </Breadcrumb>

                                    
                        </Col>
                    </Row>

                        <Row>

                   

                                    <Col md={1} lg={1} sm={2} xs={2} className="small-Images-Small-Size" >
                                        {product.image !== undefined && productSmallImages.map((el, ind) =>

                                        (
                                            <Image id='smallFeatured' src={el} alt={product.name} fluid onClick={() => setindex(ind)} />
                                        )

                                        )}
                                    </Col>
                                    <Col md={5} lg={4} sm={10} xs={10} ref={container} >
                                        <div id="img-zoom-container">
                                            <div id="lens"></div>
                                            <Image id='featured' src={product.image !== undefined && product.image[index]} alt={product.name} fluid />
                                        </div>
                                    </Col>

                   

                                
                                
                                
                            <Col  md={6} lg={4}> 
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <h3 className="flash_title" >{product.name} </h3>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Rating  value={product.rating} text={`   ${product.numReviews} avis`} />
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                            {product.remise ? <> <Card.Text as='h6' className='price-line' > {product.price != undefined && product.price.toFixed(2)} DT</Card.Text>
                                                <Card.Text as='h4' className='price'>{product.remise !== undefined && product.remise.toFixed(2)}DT</Card.Text>
                                            </> : <Card.Text as='h4' className='price'>{product.price !== undefined && product.price.toFixed(2)}DT</Card.Text>}

                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                          {product.description} 
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>

                            <Col  md={12} lg={3} className='my-4'>
                                <Card>
                                    <ListGroup variant='flash'>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Prix:</Col>
                                                <Col>
                                                        {product.remise ? <>
                                                            <Card.Text as='h4' className='price'>{product.remise != undefined && product.remise.toFixed(2) }DT</Card.Text>
                                                        </> : <Card.Text as='h4' className='price'>{product.price != undefined && product.price.toFixed(2)}DT</Card.Text>}
                                                </Col>

                                            </Row>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <Row>
                                                    <Col>Statut:</Col>
                                                <Col>
                                                        {product.countInStock > 0 ? 'En Stock' : 'En rupture de stock' }
                                                </Col>

                                            </Row>
                                        </ListGroup.Item>

                                        {product.countInStock > 0 && <ListGroup.Item>
                                            <Row>
                                                    <Col>Quantité:</Col>
                                                <Col>
                                                    <Form.Control as= 'select' value={qty}
                                                     onChange={(e) => setQty(e.target.value)}>

                                                         {[...Array(product.countInStock).keys()].map(x => (
                                                             
                                                             <option key={x + 1} value={x + 1}>
                                                                 {x + 1}
                                                             </option>
                                                         ))}
                                                    </Form.Control>
                                                </Col>

                                            </Row>
                                        </ListGroup.Item> 
                                        }
                                        
                                        <ListGroup.Item>
                                        <Button 
                                        onClick={addToCartHandler}
                                        className='btn-block' 
                                        type='button' 
                                        disabled= { product.countInStock === 0} 
                                        >
                                            Ajouter Au Panier
                                        </Button>
                                        </ListGroup.Item>

                                    </ListGroup>
                                </Card>
                            </Col>
                        </Row>

                            <Row>
                                <Col md={12} className="mahboulet_ESS">
                                    <section className="promis_product">
                                        <h4 className="h4">{products.length} Autres Produits Dans La Même Catégorie : </h4>
                                        <div className='product'>
                                            {
                                                loading ? (
                                                    <Loader />
                                                ) : error ? (
                                                    <Message variant='danger'>{error}</Message>
                                                ) : (
                                                    <>
                                                        <div className="">
                                                            <Swiper
                                                                spaceBetween={0}
                                                                breakpoints={responsive}
                                                                navigation
                                                                pagination={{ clickable: true }}
                                                            >
                                                                {products.map((product) => (
                                                                    <SwiperSlide key={product._id}>
                                                                        <div key={product._id}>
                                                                            <Product product={product} history={history} />
                                                                        </div>
                                                                    </SwiperSlide>
                                                                ))}
                                                            </Swiper>
                                                        </div>
                                                    </>
                                                )
                                            }
                                        </div>
                                    </section>
                                </Col>


                            </Row>


                            <Row className="avis-client" >
                            
                            <Col md={6}>
                            <h2>Avis</h2>
                                    {product.reviews.length === 0 && <Message> Aucun avis</Message>}
                            <ListGroup variant='flush'>
                               
                                <ListGroup.Item>
                                 <h2>écrivez votre commentaire </h2>
                                {successProductReview && (
                                    <Message variant='success'>
                                        Avis soumis avec succès
                                    </Message>
                                )}
                                {loadingProductReview && <Loader />}
                                {errorProductReview && (
                                    <Message variant='danger'>{errorProductReview}</Message>
                                )}
                                {userInfo ? (
                                    <Form onSubmit={submitHandler}>
                                    <Form.Group controlId='rating'>
                                        <Form.Label>Rating</Form.Label>
                                        <Form.Control
                                        as='select'
                                        value={rating}
                                        onChange={(e) => setRating(e.target.value)}
                                        >
                                        <option value=''>Select...</option>
                                        <option value='1'>1 - Faible</option>
                                        <option value='2'>2 - Normal</option>
                                        <option value='3'>3 - Bien</option>
                                        <option value='4'>4 - Trés Bien</option>
                                        <option value='5'>5 - Excellent</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId='comment'>
                                        <Form.Label>Comment</Form.Label>
                                        <Form.Control
                                        as='textarea'
                                        row='3' 
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        ></Form.Control>
                                    </Form.Group>
                                    <Button
                                        disabled={loadingProductReview}
                                        type='submit'
                                        variant='primary'
                                    >
                                        Submit
                                    </Button>
                                    </Form>
                                ) : (
                                    <Message>
                                    Please <Link to='/login'>sign in</Link> to write a review{' '}
                                    </Message>
                                )}
                                </ListGroup.Item>
                            </ListGroup>
                            </Col>
                            <Col md={6}>
                                    {productReviews.map((review) => (
                                        <ListGroup.Item key={review._id}>
                                            <strong>{review.name}</strong>
                                            <Rating value={review.rating} />
                                            <p>{review.createdAt.substring(0, 10)}</p>
                                            <p>{review.comment}</p>
                                        </ListGroup.Item>
                                    ))}
                            </Col>
                           
                        </Row>

                      
                           

                </>
                 )  }
           
        </>
    )

/********************************** */


   

}

export default ProductScreen
