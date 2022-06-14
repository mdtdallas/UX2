import React, { useEffect, useState } from "react";
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
            <Link class="card shadow-md m-2 nav-link p-0" to={`/show/${id}`} key={id}>
              <img src={image} alt="Cat Show Title Cover" width="100%" height="100%"/>
            {/* <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns={image} role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg> */}
            <div class="card-title text-center p-10 mt-20">{title}</div>
            <div class="card-body">
              <p class="card-text text-center">Where:&nbsp;{location}</p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <button type="button" class="btn btn-sm btn-outline-secondary">Enter Show</button>
                </div>
                <small class="card-text">When:&nbsp;{date}</small>
              </div>
            </div>
          </Link>
            </>
          ))}
      </div>
    </div>
  );
}

export default Shows;


