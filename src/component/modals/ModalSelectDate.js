import React, {useState,} from 'react';
import {Button, Col, Form, Modal} from "react-bootstrap";
import * as webApi from '../WebApi'
import {MDBBtn} from "mdb-react-ui-kit";
import {FaPlusCircle} from "react-icons/fa";
import {useForm} from "react-hook-form";
import {BsFillSendPlusFill} from "react-icons/bs";
import axios from "axios";
import {rootIP} from "../../info";
import PropTypes from "prop-types";
import ModalRevoke from "./ModalRevoke";
import {getDate} from "../tools/getDate";
import {IoMdPrint} from "react-icons/io";


export default function ModalSelectDate() {

  const [modalShow, setModalShow] = useState(false);
  const handleModalShow = () => setModalShow(true);
  const handleModalClose = () => setModalShow(false);

  const {
    register,
    handleSubmit,
  }
    = useForm();

  const onSubmit = (formDate) => {

  }

  return (
    <>
          <MDBBtn className='ms-3 d-flex' size='sm' onClick={handleModalShow}>
            <IoMdPrint className='me-1 i-12 my-auto'/>
            列印歷史送文簿
          </MDBBtn>
      <Modal show={modalShow} onHide={handleModalClose} size='sm'>
        <Modal.Body>
          <Form className='row' onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className='col-8'>
              <Form.Label>請選擇送文日期：</Form.Label>
              <input
                className='form-control'
                type='date'
                defaultValue={getDate().today}
                {...register('reportDate', {required: true})}
              />
            </Form.Group>
            <Col xs='4' className='d-flex'>
              <MDBBtn type='submit' className='mt-auto ms-auto'>
                查詢
              </MDBBtn>
            </Col>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}
