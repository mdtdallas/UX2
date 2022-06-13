import React from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const AwardsList = () => {
  return (
    <div>
      <Row>
        <Col className="col-10">
          <div className="display-4 text-center ms-5">Awards</div>
        </Col>
        <Col>
          <Link to="/addaward" className="col-2">
            <i class="fa-solid fa-plus add"></i>
          </Link>
        </Col>
      </Row>
    </div>
  );
};

export default AwardsList;
