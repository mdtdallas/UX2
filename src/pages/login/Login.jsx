import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import * as Yup from "yup";
import './login.css';

export default function Login() {
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [warning, setWarning] = useState('')
  const [severity, setSeverity] = useState("");
  const [open, setOpen] = useState(false);
  let navigate = useNavigate();

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
      fetch("https://proj2-api.herokuapp.com/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.warning) setWarning(data.warning);
          if (data.warning) setSeverity('warning');
          if (data.error) setError(data.error);
          if (data.error) setSeverity("error");
          localStorage.clear();
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("userType", data.userType);
          localStorage.setItem('email', data.email);
          localStorage.setItem('userID', data.userID);
          localStorage.setItem('username', data.username);
          if (data.status) setStatus(data.status);
          if (data.status) setWarning('');
          if (data.status) setSeverity('success');
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
    if (status) {
      navigate("/");
    window.location.href = '/'
    action();
    }
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
  <div className="login">
    <h1>Login</h1>
    <div className="loginContainer">
      <input
      placeholder="Email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        value={formik.values.email}
        onBlur={formik.handleBlur}
        required
      />
      {formik.errors.email && formik.touched.email ? (
        <p>{formik.errors.email}</p>
      ) : null}
      <input
      placeholder="Password"
        name="password"
        type="password"
        onChange={formik.handleChange}
        value={formik.values.password}
        onBlur={formik.handleBlur}
        required
      />
      {formik.errors.password && formik.touched.password ? (
        <p>{formik.errors.password}</p>
      ) : null}
      <button
        type="submit"
        className="btn btn-light"
        onClick={formik.handleSubmit}
      >
        Submit
      </button>
      <Link to='/signup'>Not registered?</Link>
    </div>
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {[status, warning, error]}
      </Alert>
    </Snackbar>
  </div>
  );
}
