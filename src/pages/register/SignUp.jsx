import React, { useState } from "react";
import { Form, Container, Button, Nav, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Alert, Snackbar } from "@mui/material";
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import CloseIcon from '@mui/icons-material/Close';

const SignUp = () => {
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [severity, setSeverity] = useState('success');
  const [warning, setWarning] = useState();
  const [open, setOpen] = useState();
 
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    window.location.href = '/signin'
    action();
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <InsertEmoticonIcon
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </InsertEmoticonIcon>
    </React.Fragment>
  );



  let validationParams = Yup.object().shape({
    email: Yup.string().required("Email is required"),
    name: Yup.string().required(),
    phone: Yup.number().required().max(10).min(10),
    password: Yup.string().required("Password is required"),
    confirm: Yup.string().required().oneOf([Yup.ref("password"), null], "Passwords must match"),
    agree: Yup.bool().oneOf([true], "Accept Ts & Cs is required"),
  });
  let formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      phone: "",
      password: "",
      confirm: "",
      agree: false,
    },
    validationSchema: validationParams,
    onSubmit: values => {
        fetch('https://proj2-api.herokuapp.com/api/users/create', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(values)
      })
      .then(res => res.json())
      .then((data) => {
        if (data.warning) setWarning(data.warning);
        if (data.warning) setSeverity('warning')
        if(data.error) setError(data.error);
        if(data.error) setSeverity('error');
        if(data.status) setSuccess(data.status);
        handleClick();
      })
    },
  });
  return (
    <Container className="vh-100">
      <h2 className="display-3 text-center my-3">Sign Up</h2>
      <Form onSubmit={formik.handleSubmit} id="signUpForm">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && formik.touched.email ? (
            <p>{formik.errors.email}</p>
          ) : null}
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Name"
            pattern='[a-zA-Z\s]+{3,}'
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            onBlur={formik.handleBlur}
          />
          {formik.errors.name && formik.touched.name ? (
            <p>{formik.errors.name}</p>
          ) : null}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPhone">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="phone"
            placeholder="Phone"
            pattern="[0-9]+"
            maxLength={10}
            name="phone"
            onChange={formik.handleChange}
            value={formik.values.phone}
            onBlur={formik.handleBlur}
          />
          {formik.errors.phone && formik.touched.phone ? (
            <p>{formik.errors.phone}</p>
          ) : null}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            onBlur={formik.handleBlur}
          />
          {formik.errors.password && formik.touched.password ? (
            <p>{formik.errors.password}</p>
          ) : null}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicConfirm">
          <Form.Label>Confirm</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            name="confirm"
            onChange={formik.handleChange}
            value={formik.values.confirm}
            onBlur={formik.handleBlur}
          />
          {formik.errors.confirm && formik.touched.confirm ? (
            <p>{formik.errors.confirm}</p>
          ) : null}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Row>
            <Col className="col-1 mt-2 ms-2">
              <Form.Check type="checkbox" name="agree" onChange={formik.handleChange} value={formik.values.agree} onBlur={formik.handleBlur}/>
            </Col>
            <Col>
              <Nav.Link as={Link} to={"/"}>
                Agree to Terms and Conditions
              </Nav.Link>
              {formik.errors.agree && formik.touched.agree ? (<p>{formik.errors.agree}</p>) : null}
            </Col>
          </Row>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
         {[success, warning, error]}
        </Alert>
      </Snackbar>
      
    </Container>

  );
};

export default SignUp;
