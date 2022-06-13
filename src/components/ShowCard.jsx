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
            <div class="card shadow-md" as={Link} to={`/show/${id}`} key={id}>
            <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns={image} role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
            <h5 class="card-title">{title}</h5>
            <div class="card-body">
              <p class="card-text">Where:&nbsp;{location}</p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <button type="button" class="btn btn-sm btn-outline-secondary">Enter Show</button>
                </div>
                <small class="text-muted">When:&nbsp;{date}</small>
              </div>
            </div>
          </div>
            </>
          ))}
      </div>
    </div>
  );
}

export default Shows;


