import React, { useState, useEffect } from "react";
import { Card, Row, Col, Container } from "react-bootstrap";
import CatList from "../components/CatList";
import { Spinner } from 'reactstrap';
import { Link } from "react-router-dom";


function Home() {
  const email = localStorage.getItem('email')
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    setLoading(true)
    fetch(`https://proj2-api.herokuapp.com/api/users/${email}`, {
      headers: {
        'Content-Type': 'application/json',
        accessToken: localStorage.getItem('accessToken'),
        Accept: 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`This is an HTTP error ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data) setData(data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  
  return (
    <div>
      {loading && <div><Spinner className="spinner" /></div>}
      {error && (
        <div>{`There is a problem fetching the post data - ${error}`}</div>
      )}
      {data && data.map(({ id, name, phone, email, image }) => (
        <Container key={id}>
        <h1 className="display-1 text-center">Profile</h1>
        <img
          src={image}
          className="m-3 mx-auto d-block img-thumbnail shadow rounded-circle"
          alt="avatar"
          width="500em"
        />
        <Card className="shadow m-3 p-2" key={email}>
          <Row>
            <Col>
              <Card.Text>Name:</Card.Text>
            </Col>
            <Col>
              <Card.Text>{name}</Card.Text>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card.Text>Phone:</Card.Text>
            </Col>
            <Col>
              <Card.Text>{phone}</Card.Text>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card.Text>Email:</Card.Text>
            </Col>
            <Col>
              <Card.Text>{email}</Card.Text>
            </Col>
          </Row>
        </Card>
        <Container>
        <Row>
          <Col>
            <h1 className="display-2 text-center ms-5">My Cats</h1>
          </Col>
          <Col className="col-2">
            <Link to='/newcat' className="btn">
              <i className="fa-solid fa-plus add fs-2 mt-4"/>
            </Link>
          </Col>
        </Row>
        </Container>
        </Container>
      ))}
      <CatList />
    </div>
  );
};

export default Home;

