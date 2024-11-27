import React, {useContext, useEffect, useState,} from 'react';
import {ButtonGroup, Col, Form, Modal} from "react-bootstrap";
import {MDBBtn} from "mdb-react-ui-kit";
import {useForm} from "react-hook-form";
import axios from "axios";
import {rootIP} from "../../info";
import PropTypes from "prop-types";
import {FaUserPlus} from "react-icons/fa";
import AuthContext from "../tools/AuthContext";
import {useAxios} from "../tools/useAxios";

export default function ModalEditUser({id, setIsLoading}) {

  const {userInfo} = useContext(AuthContext);
  let api = useAxios();

  const [modalShow, setModalShow] = useState(false);
  const handleModalShow = () => setModalShow(true);
  const handleModalClose = () => setModalShow(false);
  const [data, setData] = useState('');
  const [deleteShow, setDeleteShow] = useState(false);

  const {
    register,
    handleSubmit,
    formState: {errors},
  }
    = useForm({
    values: data,
  });

  useEffect(() => {
    axios({
      method: 'get',
      url: rootIP + `/doc/users/${id}/`,
    }).then(res => {
      setData(res.data);
    })
      .catch(err => {
        console.log(err)
      })
  }, []);

  const onSubmit = (formData) => {
    setIsLoading(true);
    formData['currentUser'] = userInfo.username;
    api({
      method: 'put',
      url: rootIP + `/doc/users/${id}/`,
      data: formData,
      withCredentials: true,
    }).then(res => {
      setIsLoading(false);
      setModalShow(false);
      handleModalClose();
    })
      .catch(err => {
        setIsLoading(false);
        console.log(err)
      })
  }

  const deleteUser = () => {
    setIsLoading(true);
    api({
      method: 'DELETE',
      url: rootIP + `/doc/users/${id}/`,
      data: {
        currentUser: userInfo.username,
      },
      withCredentials: true,
    }).then(res => {
      setIsLoading(false);
      setModalShow(false);
      handleModalClose();
    })
      .catch(err => {
        setIsLoading(false);
        console.log(err)
      })
  }

  return (
    <>
      <MDBBtn color='secondary' size='sm' outline onClick={handleModalShow}>編輯</MDBBtn>
      {modalShow &&
        <Modal show={modalShow} onHide={handleModalClose} backdrop="static">
          <Modal.Header closeButton>
            <FaUserPlus className='i-12 me-2' color='#3B71CA'/>
            <h4 className='fw-bolder text-primary my-auto'>編輯承辦人</h4>
          </Modal.Header>
          <Modal.Body>
            <Form className='row' onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className='col-6 mb-3'>
                <Form.Label>姓名：</Form.Label>
                <input
                  className='form-control'
                  type='text'
                  placeholder=''
                  {...register('name', {required: '請填寫此欄位', maxLength: {value: 16, message: '上限16個字'}})}
                />
                <span className='text-danger f-07 fw-bolder'>{errors.number && errors.number.message}</span>
              </Form.Group>
              <Form.Group className='col-6 mb-3'>
                <Form.Label>勤區：</Form.Label>
                <input
                  className='form-control'
                  type='number'
                  placeholder=''
                  {...register('area', {required: '請填寫此欄位'})}
                />
                <span className='text-danger f-07 fw-bolder'>{errors.title && errors.title.message}</span>
              </Form.Group>
              <Form.Group className='col-12 mb-3'>
                <Form.Label>業務內容/勤區範圍：</Form.Label>
                <input
                  className='form-control'
                  type='text'
                  {...register('workContent', {
                    required: '請填寫此欄位',
                    maxLength: {value: 128, message: '上限128字'}
                  })}
                />
                <span className='text-danger f-07 fw-bolder'>{errors.receiveDate && errors.receiveDate.message}</span>
              </Form.Group>
              <Col xs='12' className='d-flex'>
                {!deleteShow &&
                  <MDBBtn type='button' color='danger' onClick={() => setDeleteShow(true)}>
                    刪除
                  </MDBBtn>}
                {deleteShow &&
                  <ButtonGroup>
                    <MDBBtn type='button' color='secondary' onClick={() => setDeleteShow(false)}>
                      取消
                    </MDBBtn>
                    <MDBBtn type='button' color='danger' onClick={deleteUser}>
                      確定刪除
                    </MDBBtn>
                  </ButtonGroup>}
                <MDBBtn type='submit' className='ms-auto'>
                  確定修改
                </MDBBtn>
              </Col>
            </Form>
          </Modal.Body>
        </Modal>
      }
    </>
  )
}

ModalEditUser.propTypes = {
  setIsLoading: PropTypes.func,
};