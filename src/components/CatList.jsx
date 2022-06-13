import React, { useState, useEffect }from "react";
import { Row, Col, Card, Image, Container, Spinner } from "react-bootstrap";
import { Link } from 'react-router-dom';

function CatList() {

  const email = localStorage.getItem('email')
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    setLoading(true)
    fetch(`https://proj2-api.herokuapp.com/api/catsEmail/${email}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        accessToken: localStorage.getItem("accessToken"),
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`This is an HTTP error ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [email]);

  return (
    <div>
      {loading && <Spinner/>}
      {error && (
        <div>{`There is a problem fetching the post data - ${error}`}</div>
      )}
      {data && data.map(({ id, name, breed, age, image, breeder }) => (
        <Container key={id}>
      <Link to={`/cat/${id}`} className='nav-link'>
        <Card className="card rounded mx-3 mt-3 bg-light shadow btn">
          <Row>
            <Col>
              <Image src={image} className="img-thumbnail" alt="Cat" />
            </Col>
            <Col className="col-7">
              <Row className="mx-auto my-auto">
                <Col>
                  <Card.Text>Name:</Card.Text>
                </Col>
                <Col>
                  <Card.Text>{name}</Card.Text>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Card.Text>Breed:</Card.Text>
                </Col>
                <Col>
                  <Card.Text>{breed}</Card.Text>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Card.Text>Age:</Card.Text>
                </Col>
                <Col>
                  <Card.Text>{age}</Card.Text>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Card.Text>Breeder</Card.Text>
                </Col>
                <Col>
                  <Card.Text>{breeder}</Card.Text>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
      </Link>
      </Container>
      ))}
      
    </div>
  );
}

export default CatList;
