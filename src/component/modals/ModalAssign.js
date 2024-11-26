import {MDBBtn} from "mdb-react-ui-kit";
import React, {useState} from "react";
import {Col, Form, Modal} from "react-bootstrap";
import {getDate} from "../tools/getDate";
import {useForm} from "react-hook-form";
import OptionsUser from "../tools/OptionsUser";

export default function ({id, setIsLoading}) {
  // 用來分派承辦人

  const [modalShow, setModalShow] = useState(false);
  const handleModalShow = () => setModalShow(true);
  const handleModalClose = () => setModalShow(false);

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    }
  }
    = useForm()

  const onSubmit = () => {

  }

  return (
    <>
      <MDBBtn size='sm' outline onClick={handleModalShow}>分派</MDBBtn>
      {modalShow &&
        <Modal show={modalShow} onHide={handleModalClose} size='sm'>
          <Modal.Body>
            <Form className='row' onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className='col-8'>
                <Form.Label>請選擇分派對象：</Form.Label>
                <select className='form-select' {...register('username', {required: true})}>
                  <OptionsUser/>
                </select>
                <span className='text-danger f-07 fw-bolder'>{errors.username && errors.username.message}</span>
              </Form.Group>
              <Col xs='4' className='d-flex'>
                <MDBBtn type='submit' className='mt-auto ms-auto'>
                  確定
                </MDBBtn>
              </Col>
            </Form>
          </Modal.Body>
        </Modal>
      }
    </>
  );
}