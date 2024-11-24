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

export function getDate() {
  // 用來處理日期相關的函數
  // 返回：
  // today：今日的日期，格式為YYYY-MM-DD
  // ym：今日的民國年月，格式為YYYYMM
  // 範例：{today: "2023-08-10", ym: "10808"}
  const date = new Date();
  let month = date.getMonth() + 1
  if (month < 10) {
    month = `0${month}`;
  }
  let year = date.getFullYear()
  let day = date.getDate()
  if (day < 10) {
    day = `0${day}`;
  }
  return {
    today: `${year}-${month}-${day}`,
    ym: `${year - 1911}${month}`,
  }
}


export default function ModalAddOut({setIsLoading}) {

  const [modalShow, setModalShow] = useState(false);
  const handleModalShow = () => setModalShow(true);
  const handleModalClose = () => setModalShow(false);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    setValue,
    formState: {errors},
  }
    = useForm();

  const onSubmit = (formDate) => {
    setIsLoading(true);
    // 取得送文號
    axios({
      method: 'get',
      url: rootIP + '/doc/get_number/',
      params: {ym: getDate().ym},
    })
      .then(res => {
          formDate.number = Number(res.data);
          // 新增文章
          axios({
            method: 'post',
            url: rootIP + '/doc/out/',
            data: formDate,
          }).then(res => {
            setIsLoading(false);
            handleModalClose();
            alert('新增成功！');
          })
            .catch(err => {
              setIsLoading(false);
              console.log(err)
              if (err.response.data.number) {
                alert('取得送文號失敗，請重試');
                // 這個還沒測試
              }
            })
        }
      )
      .catch(err => {
        console.log(err);
      })
    console.log(formDate);
  }

  return (
    <>
      <MDBBtn color='primary' size='sm' className='ms-2 my-auto d-flex' onClick={handleModalShow}>
        <FaPlusCircle className='me-1 my-auto'/>
        新增
      </MDBBtn>
      <Modal show={modalShow} onHide={handleModalClose} backdrop="static">
        <Modal.Header closeButton>
          <BsFillSendPlusFill className='i-12 me-2' color='#3B71CA'/>
          <h4 className='fw-bolder text-primary my-auto'>新增送文</h4>
        </Modal.Header>
        <Modal.Body>
          <Form className='row' onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className='col-6 mb-3'>
              <Form.Label>陳報日期：</Form.Label>
              <input
                className='form-control'
                type='date'
                defaultValue={getDate().today}
                {...register('reportDate', {required: '請填寫此欄位'})}
              />
              <span className='text-danger f-07 fw-bolder'>{errors.reportDate && errors.reportDate.message}</span>
            </Form.Group>
            <Form.Group className='col-6 mb-3'>
              <Form.Label>送文號：</Form.Label>
              <input
                className='form-control'
                type='text'
                placeholder='儲存後會自動取號'
                readOnly
                {...register('number')}
              />
            </Form.Group>
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
              <Form.Label>承辦人：</Form.Label>
              <select className='form-select' {...register('username', {required: '請選擇此欄位'})}>
                {/*這個選項應該要動態刷新才對*/}
                <option value="">請選擇</option>
                <option value="王小明">王小明</option>
                <option value="劉小華">劉小華</option>
                <option value="陳小白">陳小白</option>
                <option value="吳小天">吳小天</option>
              </select>
              <span className='text-danger f-07 fw-bolder'>{errors.username && errors.username.message}</span>
            </Form.Group>
            <Form.Group className='col-12 mb-3'>
              <Form.Label>主旨：</Form.Label>
              <input
                className='form-control'
                type='text'
                placeholder='請輸入陳報主旨'
                {...register('title', {required: '請填寫此欄位'})}
              />
              <span className='text-danger f-07 fw-bolder'>{errors.title && errors.title.message}</span>
            </Form.Group>
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

ModalAddOut.propTypes = {
  setIsLoading: PropTypes.func,
};