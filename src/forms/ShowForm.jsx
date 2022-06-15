import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { Alert, Snackbar } from "@mui/material";
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import CloseIcon from '@mui/icons-material/Close';

function ShowForm() {
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [warning, setWarning] = useState();
  const [severity, setSeverity] = useState('success')
  const [open, setOpen] = useState();
 
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    window.location.href = '/shows'
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
    title: Yup.string().required('Name is required'),
    location: Yup.string().required('Location is required').min(2, 'Must be more than 2 characters'),
    photo: Yup.string().url().required('Photo is required').min(2, 'Must be more than 2 characters'),
    judges: Yup.string().required('Judge is required').min(2, 'Must be more than 2 characters'),
    date: Yup.date().required('Date is required'),
    council: Yup.string().required('Council is required').min(2, 'Must be more than 2 characters'),
    ticket_price: Yup.number().positive().required('Ticket price is required'),
    ticket_count: Yup.number().positive().required('Ticket amount is required'),
  })
  let formik = useFormik({
    initialValues: {
      title: '',
      location: '',
      photo: '',
      judges: '',
      date: '',
      council: '',
      ticket_price: '',
      ticket_count: '',
      email: localStorage.getItem('email')
    },
    validationSchema: validationParams,
    onSubmit: values => {
      fetch('https://proj2-api.herokuapp.com/api/shows/create', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          accessToken: localStorage.getItem("accessToken"),
        },
        body: JSON.stringify(values)
      })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.warning) setWarning(data.warning);
        if (data.warning) setSeverity('warning');
        if(data.error) setError(data.error);
        if(data.error) setSeverity('error');
        if(data.status) setSuccess(data.status);
        handleClick();
      })
      .catch((err) => {
        console.error(err);
      })
    }
  })
  return (
    <div>
      <Container className="vh-100">
      <Form id="createCatForm" onSubmit={formik.handleSubmit}>
        <Col>
          <Row>
            <Col>
              <Form.Label className='p-2'>Title:</Form.Label>
            </Col>
            <Col>
              <Form.Control name="title" onChange={formik.handleChange} value={formik.values.title} onBlur={formik.handleBlur}/>
              {formik.errors.title && formik.touched.title ? (<p>{formik.errors.title}</p>) : null}
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label className='p-2'>Location:</Form.Label>
            </Col>
            <Col>
              <Form.Control name="location" onChange={formik.handleChange} value={formik.values.location} onBlur={formik.handleBlur}/>
              {formik.errors.location && formik.touched.location ? (<p>{formik.errors.location}</p>) : null}
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label className='p-2'>Photo:</Form.Label>
            </Col>
            <Col>
              <Form.Control name="photo" onChange={formik.handleChange} value={formik.values.photo} onBlur={formik.handleBlur}/>
              {formik.errors.photo && formik.touched.photo ? (<p>{formik.errors.photo}</p>) : null}
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label className='p-2'>Judge:</Form.Label>
            </Col>
            <Col>
              <Form.Control name="judges" onChange={formik.handleChange} value={formik.values.judges} onBlur={formik.handleBlur}/>
              {formik.errors.judges && formik.touched.judges ? (<p>{formik.errors.judges}</p>) : null}
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label className='p-2'>Date:</Form.Label>
            </Col>
            <Col>
              <Form.Control name="date" type='date' onChange={formik.handleChange} value={formik.values.date} onBlur={formik.handleBlur}/>
              {formik.errors.date && formik.touched.date ? (<p>{formik.errors.date}</p>) : null}
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label className='p-2'>Council:</Form.Label>
            </Col>
            <Col>
              <Form.Control name="council" onChange={formik.handleChange} value={formik.values.council} onBlur={formik.handleBlur}/>
              {formik.errors.council && formik.touched.council ? (<p>{formik.errors.council}</p>) : null}
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label className='p-2'>Ticket Price:</Form.Label>
            </Col>
            <Col>
              <Form.Control name="ticket_price" onChange={formik.handleChange} value={formik.values.ticket_price} onBlur={formik.handleBlur}/>
              {formik.errors.ticket_price && formik.touched.ticket_price ? (<p>{formik.errors.ticket_price}</p>) : null}
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label className='p-2'>Ticket Amount:</Form.Label>
            </Col>
            <Col>
              <Form.Control name="ticket_count" onChange={formik.handleChange} value={formik.values.ticket_count} onBlur={formik.handleBlur}/>
              {formik.errors.ticket_count && formik.touched.ticket_count ? (<p>{formik.errors.ticket_count}</p>) : null}
            </Col>
          </Row>
          <Row>
            <Col>
              <Button className='ms-3' type="submit">Add Show</Button>
            </Col>
            <Col>
              <Button variant='danger'>Cancel</Button>
            </Col>
          </Row>
        </Col>
      </Form>
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
         {[success, warning, error]}
        </Alert>
      </Snackbar>
      </Container>
    </div>
  )
}

export default ShowForm