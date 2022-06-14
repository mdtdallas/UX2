import { Alert, IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState, useEffect } from "react";
import { Row, Col, Form, Container, Button } from "react-bootstrap";
import { Spinner } from 'reactstrap'
import CatsNSW from "../img/CatsNSW.jpg";
import { useParams } from "react-router-dom";


const MapURL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3539.7686062359303!2d153.01621141560116!3d-27.476462323570043!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b915a0968742765%3A0x53b5b99532970ee3!2sBrisbane%20Convention%20%26%20Exhibition%20Centre!5e0!3m2!1sen!2sau!4v1645768985924!5m2!1sen!2sau";

function ShowView() {
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [cats, setCats] = useState('')
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://proj2-api.herokuapp.com/api/showsShowID/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        accessToken: localStorage.getItem("accessToken"),
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((show) => {
        setShow(show);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setShow(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);


  useEffect(() => {
    fetch(`https://proj2-api.herokuapp.com/api/catsEmail/${localStorage.getItem('email')}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        accessToken: localStorage.getItem("accessToken"),
      },
    })
      .then((res) => res.json())
      .then((info) => {
        setCats(info);
      })
      .catch((err) => {
        alert(err)
      })
  }, []);

  
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    window.location.href = '/shows'
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      {loading && <div><Spinner/></div>}
      {error && (
        <div>{`There is a problem fetching the post data - ${error}`}</div>
      )}
      {show && show.map(({ id, title, location, image, judges, date, council, ticket_price, ticket_count }) => (
        <Container key={id}>
        <div className="display-1 text-center p-4">{title}</div>
        <img
          src={image}
          className="mt-4 mx-auto d-block img-thumbnail shadow"
          alt="avatar"
          width="200em"
        />
        <Row>
          <div className="display-3 text-center">{location}</div>
        </Row>
        <Row>
          <div className="display-3 text-center pt-5">
            {date}
          </div>
        </Row>
        <Row>
          <div className="display-3 text-center">{council}</div>
        </Row>
        <Row>
          <div className="display-3 text-center">Judge: &nbsp;{judges}</div>
        </Row>
        <Row>
          <div className="display-3 text-center">Tickets: &nbsp;${ticket_price}</div>
        </Row>
        <Row>
          <Col className="mt-4">
            <iframe
              src={MapURL}
              title="MapView"
              width="90%"
              height="100%"
              className="ms-4"
            ></iframe>
          </Col>
          <Col>
            <Row className="mt-4 me-4">
              
                <Form.Select>
                  {cats && cats.map(({ id, name }) => (
                <option key={id}>{name}</option>
                ))}
              </Form.Select>
              

            </Row>
            <Row className="mt-3 me-4">
              <Button onClick={handleClick}>Enter Show</Button>
            </Row>
            <Row className="mt-3">
              <div className="display-6">{ticket_count}</div>
            </Row>
            <Row>
              <div>Tickets Remaining</div>
            </Row>
          </Col>
        </Row>
        <Row>
          <div className="p-3 ps-5 display-5">{council}</div>
        </Row>
        <Row>
          <marquee
            behavior="scroll"
            direction="left"
            className="pt-4 mb-4"
          >
            <img src={CatsNSW} alt="" className="pe-3" />
            <img src={CatsNSW} alt="" className="pe-3" />
            <img src={CatsNSW} alt="" className="pe-3" />
            <img src={CatsNSW} alt="" className="pe-3" />
            <img src={CatsNSW} alt="" className="pe-3" />
            <img src={CatsNSW} alt="" className="pe-3" />
            <img src={CatsNSW} alt="" className="pe-3" />
            <img src={CatsNSW} alt="" className="pe-3" />
            <img src={CatsNSW} alt="" className="pe-3" />
            <img src={CatsNSW} alt="" className="pe-3" />
          </marquee>
        </Row>
      </Container>
      ))}
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='success' sx={{ width: "100%" }}>
          Show Entered!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ShowView;