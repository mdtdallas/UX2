import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../img/logo.jpeg";
import { useFormik } from "formik";
import * as Yup from "yup";

const SignIn = () => {
  let validationParams = Yup.object().shape({
    email: Yup.string().required("Email address is required"),
    password: Yup.string()
      .required("Password is required")
      .min(2, "Must be more than 2 characters"),
  });
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationParams,
    onSubmit: (values) => {
      window.localStorage.setItem("email", values.email);
      fetch("https://catshow-api.herokuapp.com/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
        .then((response) => {
          if (!response.ok) {
            response.json("This is an error");
          }
          return response.json();
        })
        .then((data) => {
          localStorage.setItem('userType', data.userType)
          localStorage.setItem('email', data.email)
        })
    },
  });
  return (
    <Container>
      <img src={logo} height="300em" className="my-5 mx-auto d-block" />
      <h2 className="display-3 text-center">Sign In</h2>
      <Form id="signInForm" onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}
            autoComplete="on"
          />
          {formik.errors.email && formik.touched.email ? (
            <p>{formik.errors.email}</p>
          ) : null}
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
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
            autoComplete="on"
          />
          {formik.errors.password && formik.touched.password ? (
            <p>{formik.errors.password}</p>
          ) : null}
        </Form.Group>
        <Row>
          <Col>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Col>
          <Col>
            <Button as={Link} variant="secondary" to={"/signup"}>
              Sign Up
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default SignIn;
