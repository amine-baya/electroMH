import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className='justify-content-center mb-4'>
      <Nav.Item>
        {step1 ? (
          <LinkContainer to='/login'>
            <Nav.Link>S'identifier</Nav.Link>
          </LinkContainer>
        ) : (
            <Nav.Link disabled>S'identifier</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step2 ? (
          <LinkContainer to='/shipping'> 
            <Nav.Link>Livraison</Nav.Link>
          </LinkContainer>
        ) : (
            <Nav.Link disabled>Livraison</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step4 ? (
          <LinkContainer to='/placeorder'>
            <Nav.Link>Passer la Commande</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Passer La Commande </Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  )
}

export default CheckoutSteps