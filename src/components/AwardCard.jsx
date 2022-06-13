import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";

const AwardCard = () => {
  const [awards, setAwards] = useState();
  
  useEffect(() => {
    const email = localStorage.getItem('email');
      fetch(`https://proj2-api.herokuapp.com/awards/${email}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((res) => res.json())
      .then((data) => {
        setAwards(data);
      });
  }, []);

  async function handleDelete(id) {
    const res = await fetch(`https://proj2-api.herokuapp.com/api/catDelete/delete/${id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        accessToken: localStorage.getItem("accessToken"),
      },
    });
    const data = await res.json();
    if (data.status) alert(data.status);
    if (data.warning) alert(data.warning);
    if (data.error) alert(data.error);
  }

  return (
    <div>
      {awards && awards.map(({ id, title, year }) => (
        <div className="rounded mx-3 mt-3 bg-light shadow card p-2 btn" key={id}>
        <Row>
          <Col>
            <i className="fa-solid fa-award"></i>
          </Col>
          <Col>{title}</Col>
          <Col>{year}</Col>
          <Col><i className="fa-solid fa-minus" onClick={() => handleDelete(id)}></i></Col>
        </Row>
      </div>
      ))}
    </div>
  );
};

export default AwardCard;
