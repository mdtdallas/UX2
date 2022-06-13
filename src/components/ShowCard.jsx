import React, { useEffect, useState } from "react";
import { Col, Row, Container, Card, Button } from "react-bootstrap";
import { Spinner } from "reactstrap";
import { Link } from "react-router-dom";

function Shows() {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://proj2-api.herokuapp.com/api/shows", {
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
      .then((shows) => {
        setShows(shows.results);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setShows(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {loading && (
        <div>
          <Spinner className="my-auto" />
        </div>
      )}
      {error && (
        <div>{`There is a problem fetching the post data - ${error}`}</div>
      )}
      <div>
        { shows.map(({ id, title, location, image, date }) => (
            <>
              <Container key={id}>
                <Card
                  as={Link}
                  to={`/show/2`}
                  className="rounded-50 shadow mb-2 nav-link text-dark"
                >
                  <Row>
                    <div className="text-center display-5">{title}</div>
                  </Row>
                  <Row>
                    <Col>
                      <img
                        src={image}
                        alt=""
                        className="showImage m-4 me-6"
                        width='40%'
                      />
                    </Col>
                    <Col>
                      <Row>
                        <div className="fs-4 pt-2">{date}</div>
                      </Row>
                      <Row>
                        <div className="fs-4 pt-2">{location}</div>
                      </Row>
                      <Button as={Link} to={`/show/2`} className="fs-4 mt-2">
                        Enter Show
                      </Button>
                    </Col>
                  </Row>
                </Card>
              </Container>
            </>
          ))}
      </div>
    </div>
  );
}

export default Shows;
