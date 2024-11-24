import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import OutManageList from "./OutManageList";
import {Button, Row, Col, Card, Dropdown, Form, Modal, Table} from "react-bootstrap";
import ModalAddOut from "../modals/ModalAddOut";
import ModalSend from "../modals/ModalSend";
import {MDBBtn} from "mdb-react-ui-kit";
import {FaPlusCircle} from "react-icons/fa";
import {BsFillSendArrowUpFill} from "react-icons/bs";
import {MdOutlineHistory} from "react-icons/md";
import { FaListCheck } from "react-icons/fa6";
import axios from "axios";
import {rootIP} from "../../info";
import ModalLoading from "../modals/ModalLoading";

export default function OutManage() {

  const [modalShow, setModalShow] = useState(false);
  const [data, setData] = useState([]);
  const [params, setParams]
    = useState({status:0,ordering:'-number'}); //傳給API的參數
  const [isLoading, setIsLoading] = useState(false); // 是否為載入中的狀態

  useEffect(() => {
    axios({
      method: 'GET',
      url: rootIP + '/doc/out/',
      params: params,
    })
      .then(res => {
        setData(res.data.results);
      })
      .catch(err => console.log(err))
  }, [params, isLoading]);

  const searchStart = (e) => {
    // 關鍵字搜尋
    e.preventDefault();
    const form = new FormData(e.target);
    const keyword = form.get('search')
    setParams((state) => ({...state, search: keyword}))
  }

  const orderBy = (value) => {
    // 排序
    setParams((state) => ({...state, ordering: value}))
  }

  return (
    <>
      <ModalLoading show={isLoading} setShow={setIsLoading}/>
      <Row>
        <Col xs='12' className='mb-3 d-flex'>
          <ModalAddOut setIsLoading={setIsLoading}/>
          <Link to='send' className="btn btn-sm btn-success ms-3 my-auto d-flex">
            <BsFillSendArrowUpFill className='me-1 my-auto'/>
            送公文作業</Link>
          <Link to='history' className="btn btn-sm btn-secondary ms-auto my-auto d-flex">
            <MdOutlineHistory className='i-12 me-1 my-auto'/>
            查閱歷史記錄
          </Link>
        </Col>
        <Col xs='12'>
          <Card className='p-0 shadow-lg rounded-3'>
            <Card.Header className='d-flex'>
              <FaListCheck className='me-2 my-auto i-15' color='#3B71CA'/>
              <h3 className="fw-bolder m-0 my-auto text-primary">
                待送公文
              </h3>
              <div className="ms-auto d-flex">
                <Form className='my-auto' onSubmit={searchStart}>
                  <Form.Control type='text' name='search' placeholder='搜尋文號/主旨/承辦人'></Form.Control>
                </Form>
                <Dropdown className='my-auto ms-2'>
                  <Dropdown.Toggle variant='secondary' size='sm'>
                    排序方式
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={()=>{orderBy('-number')}}>送文號（新到舊)</Dropdown.Item>
                    <Dropdown.Item onClick={()=>{orderBy('number')}}>送文號（舊到新）</Dropdown.Item>
                    <Dropdown.Item onClick={()=>{orderBy('username')}}>承辦人</Dropdown.Item>
                    <Dropdown.Item onClick={()=>{orderBy('groupName')}}>送達單位</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </Card.Header>
            <Card.Body>
              <Table hover>
                <thead>
                <tr>
                  <th scope="col">送文號</th>
                  <th scope="col">組別</th>
                  <th scope="col">主旨</th>
                  <th scope="col">承辦人</th>
                  <th scope="col">陳報日期</th>
                  <th scope="col">操作</th>
                </tr>
                </thead>
                <tbody>
                  <OutManageList data={data} setIsLoading={setIsLoading}/>
                </tbody>
              </Table>
            </Card.Body>
            <Card.Footer>
              {/*<ul className="pagination m-0">*/}
              {/*  {{page_html}}*/}
              {/*</ul>*/}
            </Card.Footer>
          </Card>
        </Col>
      </Row>
      {/*<LetterOutAddForm n={number} d={today}/>*/}
    </>
  )
}