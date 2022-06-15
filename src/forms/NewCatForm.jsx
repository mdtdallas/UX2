import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Alert, IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import * as Yup from "yup";

const NewCatForm = () => {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState('')

  let validationParams = Yup.object().shape({
    name: Yup.string().required("Name is required").matches(/^[aA-zZ\s]+$/, 'Please enter valid name'),
    breed: Yup.string()
      .required("Breed is required")
      .min(2, "Must be more than 2 characters"),
    age: Yup.number().required("Age is required"),
    image: Yup.string()
      .required("Photo is required")
      .min(2, "Must be more than 2 characters"),
    breeder: Yup.string()
      .required("Breeder is required")
      .min(2, "Must be more than 2 characters"),
  });
  let formik = useFormik({
    initialValues: {
      name: "",
      breed: "",
      age: "",
      image: "",
      breeder: "",
      email: localStorage.getItem('email'),
    },
    validationSchema: validationParams,
    onSubmit: (values) => {
      fetch("https://proj2-api.herokuapp.com/api/catCreate/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          accessToken: localStorage.getItem("accessToken"),
        },
        body: JSON.stringify(values),
      })
        .then((response) => response.json())
        .then((data) => {
          setStatus(data.status);
          handleClick();
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
    <div>
      <Container className="">
        <Form id="createCatForm" onSubmit={formik.handleSubmit}>
          <Col>
            <Row>
              <Col>
                <Form.Label className="p-2">Name:</Form.Label>
              </Col>
              <Col>
                <Form.Control
                  name="name"
                  pattern='[a-zA-Z\s]+{3}'
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.name && formik.touched.name ? (
                  <p>{formik.errors.name}</p>
                ) : null}
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label className="p-2">Breed:</Form.Label>
              </Col>
              <Col>
                <Form.Control
                  name="breed"
                  pattern='[a-zA-Z\s]+{3}'
                  onChange={formik.handleChange}
                  value={formik.values.breed}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.breed && formik.touched.breed ? (
                  <p>{formik.errors.breed}</p>
                ) : null}
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label className="p-2">Age:</Form.Label>
              </Col>
              <Col>
                <Form.Control
                  name="age"
                  pattern="[0-9]{1,}"
                  maxLength={2}
                  onChange={formik.handleChange}
                  value={formik.values.age}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.age && formik.touched.age ? (
                  <p>{formik.errors.age}</p>
                ) : null}
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label className="p-2">Photo:</Form.Label>
              </Col>
              <Col>
                <Form.Control
                  name="image"
                  type="url"
                  onChange={formik.handleChange}
                  value={formik.values.image}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.image && formik.touched.image ? (
                  <p>{formik.errors.image}</p>
                ) : null}
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label className="p-2">Breeder:</Form.Label>
              </Col>
              <Col>
                <Form.Control
                  name="breeder"
                  pattern='[a-zA-Z\s]+{3}'
                  onChange={formik.handleChange}
                  value={formik.values.breeder}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.breeder && formik.touched.breeder ? (
                  <p>{formik.errors.breeder}</p>
                ) : null}
              </Col>
            </Row>
            <Row>
              <Col>
                <Button className="ms-3" type="submit">
                  Add Cat
                </Button>
              </Col>
              <Col>
                <Button variant="danger">Cancel</Button>
              </Col>
            </Row>
          </Col>
        </Form>
      </Container>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={"success"}
          sx={{ width: "80%" }}
        >
          {status}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default NewCatForm;
