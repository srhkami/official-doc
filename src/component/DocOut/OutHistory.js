import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import OutManageList from "./OutManageList";
import {Button, Row, Col, Card, Dropdown, Form} from "react-bootstrap";
import ModalAddOut from "../modals/ModalAddOut";
import OutHistoryList from "./OutHistoryList";
import {MDBBtn} from "mdb-react-ui-kit";
import {IoArrowBackOutline} from "react-icons/io5";
import {IoMdPrint} from "react-icons/io";
import {rootIP} from "../../info";
import {MdOutlineHistory} from "react-icons/md";
import ModalSelectDate from "../modals/ModalSelectDate";


export default function OutHistory() {



  const [data, setData] = useState([]);
    const [params, setParams]
    = useState({ordering:'-id'}); //傳給API的參數

    useEffect(() => {
    axios({
      method: 'GET',
      url: rootIP + '/doc/out/',
      params:params,
    })
      .then(res => {
        setData(res.data.results);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);


  return (
    <>
      <Row>
        <Col xs='12' className='mb-3 d-flex'>
          <MDBBtn color='secondary' size='sm' className='d-flex' onClick={() => window.history.back()}>
            <IoArrowBackOutline className='me-1 my-auto'/>
            返回
          </MDBBtn>
          <ModalSelectDate/>
        </Col>
        <Col xs='12'>
          <Card className='p-0 shadow-lg rounded-3'>
            <Card.Header className='d-flex'>
              <MdOutlineHistory className='i-20 me-1 my-auto' color='#3B71CA'/>
              <h3 className="fw-bolder text-primary m-0">
                送文紀錄
              </h3>
              <div className="ms-auto d-flex">
                <Form method='get' className='my-auto'>
                  <Form.Control type='text' placeholder='關鍵字搜尋'></Form.Control>
                </Form>
                <Dropdown className='my-auto ms-2'>
                  <Dropdown.Toggle variant='secondary' size='sm'>
                    排序方式
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href='?ordering=-number'>送文號（新在上)</Dropdown.Item>
                    <Dropdown.Item href='?ordering=number'>送文號（舊在上）</Dropdown.Item>
                    <Dropdown.Item href='?ordering=username'>承辦人</Dropdown.Item>
                    <Dropdown.Item href='?ordering=group_name'>送達單位</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </Card.Header>
            <Card.Body>
              <table className="table">
                <thead>
                <tr>
                  <th scope="col">送文號</th>
                  <th scope="col">組別</th>
                  <th scope="col">主旨</th>
                  <th scope="col">承辦人</th>
                  <th scope="col">陳報日期</th>
                  <th scope="col">送文日期</th>
                  <th scope="col">狀態</th>
                </tr>
                </thead>
                <tbody>
                <OutHistoryList data={data}/>
                </tbody>
              </table>
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