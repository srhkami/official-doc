import React, {useContext, useState,} from 'react';
import {Col, Form, Modal} from "react-bootstrap";
import {MDBBtn} from "mdb-react-ui-kit";
import {FaPlusCircle} from "react-icons/fa";
import {useForm} from "react-hook-form";
import {BsEnvelopePlusFill} from "react-icons/bs";
import {rootIP} from "../../info";
import PropTypes from "prop-types";
import {getDate} from "../tools/getDate";
import AuthContext from "../tools/AuthContext";
import {useAxios} from "../tools/useAxios";


export default function ModalAddIn({setIsLoading}) {

  const {userInfo} = useContext(AuthContext);
  let api = useAxios();


  const [modalShow, setModalShow] = useState(false);
  const handleModalShow = () => setModalShow(true);
  const handleModalClose = () => setModalShow(false);

  const {
    register,
    handleSubmit,
    formState: {errors},
  }
    = useForm();

  const onSubmit = (formData) => {
    setIsLoading(true);
    formData['receiveDate'] = getDate().today;
    formData['currentUser'] = userInfo.username;
    api({
      method: 'post',
      url: rootIP + '/doc/in/',
      data: formData,
      withCredentials: true,
    }).then(res => {
      setIsLoading(false);
      handleModalClose();
      alert('新增成功！');
    })
      .catch(err => {
        setIsLoading(false);
        console.log(err)
      })
  }

  return (
    <>
      <MDBBtn color='primary' size='sm' className='ms-2 my-auto d-flex' onClick={handleModalShow}>
        <FaPlusCircle className='me-1 my-auto'/>
        新增
      </MDBBtn>
      <Modal show={modalShow} onHide={handleModalClose} backdrop="static">
        <Modal.Header closeButton>
          <BsEnvelopePlusFill className='i-12 me-2' color='#3B71CA'/>
          <h4 className='fw-bolder text-primary my-auto'>新增收文</h4>
        </Modal.Header>
        <Modal.Body>
          <Form className='row' onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className='col-6 mb-3'>
              <Form.Label>組別：</Form.Label>
              <select className='form-select' {...register('groupName', {required: '請選擇此欄位'})}>
                {/*這個選項應該要動態刷新才對*/}
                <option value="">請選擇</option>
                <option value="一組">一組</option>
                <option value="二組">二組</option>
                <option value="三組">三組</option>
                <option value="四組">四組</option>
                <option value="五組">五組</option>
                <option value="偵查隊">偵查隊</option>
                <option value="勤務中心">勤務中心</option>
              </select>
              <span className='text-danger f-07 fw-bolder'>{errors.groupName && errors.groupName.message}</span>
            </Form.Group>
            <Form.Group className='col-6 mb-3'>
              <Form.Label>發文字號：</Form.Label>
              <input
                className='form-control'
                type='text'
                placeholder='填末五碼，或公文種類'
                {...register('number', {required: '請填寫此欄位', maxLength: {value: 16, message: '上限16個字'}})}
              />
              <span className='text-danger f-07 fw-bolder'>{errors.number && errors.number.message}</span>
            </Form.Group>
            <Form.Group className='col-12 mb-3'>
              <Form.Label>主旨：</Form.Label>
              <input
                className='form-control'
                type='text'
                placeholder='請輸入公文主旨'
                {...register('title', {required: '請填寫此欄位'})}
              />
              <span className='text-danger f-07 fw-bolder'>{errors.title && errors.title.message}</span>
            </Form.Group>
            {/*<Form.Group className='col-6 mb-3'>*/}
            {/*  <Form.Label>收文日期：</Form.Label>*/}
            {/*  <input*/}
            {/*    className='form-control'*/}
            {/*    type='date'*/}
            {/*    defaultValue={getDate().today}*/}
            {/*    {...register('receiveDate', {required: '請填寫此欄位'})}*/}
            {/*  />*/}
            {/*  <span className='text-danger f-07 fw-bolder'>{errors.receiveDate && errors.receiveDate.message}</span>*/}
            {/*</Form.Group>*/}
            {/*<Form.Group className='col-6 mb-3'>*/}
            {/*  <Form.Label>備註：</Form.Label>*/}
            {/*  <input*/}
            {/*    className='form-control'*/}
            {/*    type='text'*/}
            {/*    placeholder='可留空'*/}
            {/*    readOnly*/}
            {/*    {...register('remark')}*/}
            {/*  />*/}
            {/*</Form.Group>*/}
            <Col xs='12' className='d-flex'>
              <MDBBtn type='submit' className='ms-auto'>
                確定新增
              </MDBBtn>
            </Col>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}

ModalAddIn.propTypes = {
  setIsLoading: PropTypes.func,
};