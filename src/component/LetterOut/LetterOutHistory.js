import React, {useState} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import LetterOutList from "./LetterOutList";
import {Button, Row, Col, Card, Dropdown, Form} from "react-bootstrap";
import ModalAddForm from "../modals/ModalAddForm";
import LetterOutHistoryList from "./LetterOutHistoryList";


export default function LetterOutHistory() {

  //設定state
  // const [isModalShow, setIsModalShow] = useState(false)

  return (
    <>
      <Row>
        <Col xs='12' className='mb-3'>
          <Button variant='secondary me-3' onClick={() => window.history.back()}>
            <i className="bi bi-arrow-left me-1"></i>
            返回
          </Button>
          <Button variant='success' onClick={() => window.history.back()}>
            <i className="bi bi-printer me-1"></i>
            列印歷史送文簿
          </Button>
        </Col>
        <Col xs='12'>
          <Card className='p-0 shadow-lg rounded-3'>
            <Card.Header className='d-flex'>
              <h2 className="fw-bolder text-primary m-0">
                <i className="bi-send-plus-fill me-2"></i>
                送文紀錄
              </h2>
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
                <LetterOutHistoryList/>
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