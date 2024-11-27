import {Col, Row} from "react-bootstrap";
import React from "react";
import SettingUser from "./SettingUser";
import SettingGroup from "./SettingGroup";

export default function Setting() {
  return (
    <Row>
      <Col xs={12} md={4} className='mb-3'>
        <SettingGroup/>
      </Col>
      <Col xs={12} md={8}>
        <SettingUser/>
      </Col>
    </Row>
  );
}