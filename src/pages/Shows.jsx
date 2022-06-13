import React from 'react'
import { Col, Row } from 'react-bootstrap'
import ShowCard from '../components/ShowCard'

function Shows() {
  return (
    <>
    <Row>
      <Col>
        <h1 className='display-1 p-4 text-center'>Shows</h1>
      </Col>
      <Col className='col-2'>
      <a href="/newshow" className="btn">
              <i className="fa-solid fa-plus add fs-2 mt-4"/>
            </a>
      </Col>
    </Row>
    <ShowCard />
    </>
    
  )
}

export default Shows