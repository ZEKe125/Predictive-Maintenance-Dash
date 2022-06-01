import React, { useState } from "react";
import { Row, Col, Container, Stack } from "react-bootstrap";
import { GenericTable } from "../../components/index";

function MaintenanceDeck() {
  return (
    <div className="maintenance-deck">
      <Row>
        <Col>
          <GenericTable title="Recommended Maintenance" purpose="Maintanance" />
        </Col>

        <Col>
          <GenericTable title="Maintenance Log" purpose="Maintanance" />
        </Col>
      </Row>
    </div>
  );
}

export default MaintenanceDeck;
