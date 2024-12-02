import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import OutManageList from "./OutManageList";
import {Row, Col, Card, Dropdown, Form} from "react-bootstrap";
import ModalAddOut from "../modals/ModalAddOut";
import ModalSendOut from "../modals/ModalSendOut";
import {MdOutlineHistory} from "react-icons/md";
import axios from "axios";
import {rootIP} from "../../info";
import ModalLoading from "../modals/ModalLoading";

export default function OutManage() {

  const [data, setData] = useState([]);
  const [params, setParams]
    = useState({status: 0, ordering: '-number'}); //傳給API的參數
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
    const keyword = form.get('keyword')
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
          <ModalSendOut  setIsLoading={setIsLoading}/>
          <Link to='history/1' className="btn btn-sm btn-secondary ms-3 my-auto d-flex">
            <MdOutlineHistory className='i-12 me-1 my-auto'/>
            查閱送文記錄
          </Link>
        </Col>
        <Col xs='12'>
          <Card className='p-0 shadow-lg rounded-0 bg-body-tertiary'>
            <Card.Header className='d-flex'>
              {/*<FaListCheck className='me-2 my-auto i-15' color='#3B71CA'/>*/}
              <h4 className="fw-bolder m-0 my-auto">
                待送公文
              </h4>
              <div className="ms-auto d-flex">
                <Form className='my-auto' onSubmit={searchStart}>
                  <Form.Control type='text' name='keyword' placeholder='搜尋' size='sm' style={{width:150}}/>
                </Form>
                <Dropdown className='my-auto ms-2'>
                  <Dropdown.Toggle variant='secondary' size='sm'>
                    排序方式
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => {
                      orderBy('-number')
                    }}>送文號（新到舊)</Dropdown.Item>
                    <Dropdown.Item onClick={() => {
                      orderBy('number')
                    }}>送文號（舊到新）</Dropdown.Item>
                    <Dropdown.Item onClick={() => {
                      orderBy('username')
                    }}>承辦人</Dropdown.Item>
                    <Dropdown.Item onClick={() => {
                      orderBy('groupName')
                    }}>送達單位</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </Card.Header>
            <Card.Body className='row'>
                <OutManageList data={data} setIsLoading={setIsLoading}/>
            </Card.Body>

          </Card>
        </Col>
      </Row>
    </>
  )
}