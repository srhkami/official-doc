import {Card, Col, Dropdown, Form, Row, Table} from "react-bootstrap";
import {MDBBtn} from "mdb-react-ui-kit";
import {IoArrowBackOutline} from "react-icons/io5";
import ModalSelectDate from "../modals/ModalSelectDate";
import {MdOutlineHistory} from "react-icons/md";
import OutHistoryList from "../DocOut/OutHistoryList";
import PageTool from "../tools/PageTool";
import React from "react";
import {LuFileSignature} from "react-icons/lu";
import InManageList from "../DocIn/InManageList";
import { FaUserCog } from "react-icons/fa";
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