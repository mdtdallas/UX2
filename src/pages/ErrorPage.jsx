import React from 'react'
import { Container } from 'react-bootstrap'

const ErrorPage = () => {
  return (
    <Container className='errorPage'>
        <div className="errorContainer">
        <h1>Error 404</h1>
        <h2>Page not found!</h2>
        </div>
    </Container>
  )
}

export default ErrorPage