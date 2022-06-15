import React, { useState } from "react";
import { Form, FormLabel, Row, Col, Button } from "react-bootstrap";
import { Alert, IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import * as Yup from "yup";

const NewAward = () => {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState('');

  let validationParams = Yup.object().shape({
    title: Yup.string().required("Award Title required"),
    year: Yup.number()
      .required("Year is required")
      .min(3),
  });
  let formik = useFormik({
    initialValues: {
      title: "",
      year: "",
      email: localStorage.getItem("email"),
    },
    validationSchema: validationParams,
    onSubmit: (values) => {
      fetch("https://proj2-api.herokuapp.com/awards/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          accessToken: localStorage.getItem("accessToken"),
        },
        body: JSON.stringify(values),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`This is an HTTP error ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setStatus(data.status);
          handleClick();
        })
        .catch((err) => {
          alert(err);
        });
    },
  });

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    window.location.href = '/'
    action();
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
    <div className="addAward">
      <Form id="newAwardForm" onSubmit={formik.handleSubmit}>
        <Row className="my-5 mx-2">
          <Col>
            <FormLabel>Cat Show</FormLabel>
          </Col>
          <Col className="col-7">
            <Form.Control
              name="title"
              pattern='[a-zA-Z0-9\s]+{3}'
              onChange={formik.handleChange}
              value={formik.values.title}
              onBlur={formik.handleBlur}
            ></Form.Control>
            {formik.errors.title && formik.touched.title ? (
              <p>{formik.errors.title}</p>
            ) : null}
          </Col>
        </Row>
        <Row className="my-5 mx-2">
          <Col>
            <FormLabel>Year</FormLabel>
          </Col>
          <Col className="col-7">
            <Form.Control
              name="year"
              pattern='[0-9]'
              maxLength={4}
              onChange={formik.handleChange}
              value={formik.values.year}
              onBlur={formik.handleBlur}
            ></Form.Control>
            {formik.errors.year && formik.touched.year ? (
              <p>{formik.errors.year}</p>
            ) : null}
          </Col>
        </Row>
        <Row className="my-5 mx-4">
          <Col>
            <Button type="submit" variant="primary">
              Add Award
            </Button>
          </Col>
          <Col>
            <Button variant="outline-danger">Cancel</Button>
          </Col>
        </Row>
      </Form>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={'success'} sx={{ width: "100%" }}>
          {status}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default NewAward;
