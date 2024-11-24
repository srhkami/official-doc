import React, {useState,} from 'react';
import {Button, Col, Form, Modal} from "react-bootstrap";
import * as webApi from '../WebApi'

export function getDate() {
  // 用來處理日期相關的函數
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

function getNumber() {
  let number = ''


}

function formSumit(e, onHide, setErrorMsg) {
  e.preventDefault(); //禁止預設動作
  const form = e.target.form; //取得表單內容
  webApi.getList(`get-number/?ym=${getDate().ym}`)  //先取得流水號
    .then(res => {
      if (res.status) {
        const number = Number(res.data.number);
        const post = { //設定表單內容
          "report_date": form.elements.report_date.value,
          "group_name": form.elements.group_name.value,
          "username": form.elements.username.value,
          "title": form.elements.title.value,
          "number": number
        }
        console.log(post)
        if (!post.number || !post.group_name || !post.title) {
          setErrorMsg('選項或輸入框不得為空！');
          return
        }
        setErrorMsg('');
        webApi.createPost('letter-out/', post)
          .then(res => {
            alert(`新增成功！\n送文號為「${number}」`);
            onHide();
            window.location.reload();
          })
          .catch(res => console.log(res))
      }
    })
}

export default function ModalAddForm({isShow, onHide}) {

  const [errorMsg, setErrorMsg] = useState('')

  return (
    <Modal
      show={isShow}  //True or False：從上層傳入的參數，決定Modal是否彈出
      onHide={onHide} //隱藏Modal的函數
      backdrop="static"
    >
      <Modal.Header closeButton>
        <h3 className='fw-bolder text-primary'>新增送文</h3>
        <p className='text-danger ms-auto'>{errorMsg}</p>
      </Modal.Header>
      <Modal.Body>
        <Form className='row' action=''>
          <Form.Group className='col-12 mb-3'>
            <Form.Label>陳報日期：</Form.Label>
            <Form.Control name='report_date' type='date' defaultValue={getDate().today}></Form.Control>
          </Form.Group>
          <Form.Group className='col-6 mb-3'>
            <Form.Label>組別：</Form.Label>
            <Form.Select name='group_name'>
              {/*這個選項應該要動態刷新才對*/}
              <option value=''>請選擇</option>
              <option value="一組">一組</option>
              <option value="二組">二組</option>
              <option value="三組">三組</option>
              <option value="四組">四組</option>
              <option value="五組">五組</option>
              <option value="偵查隊">偵查隊</option>
              <option value="勤務中心">勤務中心</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className='col-6 mb-3'>
            <Form.Label>承辦人：</Form.Label>
            <Form.Select name='username'>
              {/*這個選項應該要動態刷新才對*/}
              <option value=''>請選擇</option>
              <option value="王小明">王小明</option>
              <option value="劉大華">劉大華</option>
              <option value="張三">張三</option>
              <option value="李四">李四</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className='col-12 mb-3'>
            <Form.Label>主旨：</Form.Label>
            <Form.Control name='title' type='text' placeholder='請輸入陳報公文之主旨'></Form.Control>
          </Form.Group>
          <Col xs='12' className='d-flex'>
            <p className='text-secondary'>※ 新增成功後會自動取號</p>
            <Button variant='primary' type='submit' className='ms-auto'
                    onClick={(e) => formSumit(e, onHide, setErrorMsg)}>
              確定新增
            </Button>
          </Col>
        </Form>
      </Modal.Body>
    </Modal>
  )
}