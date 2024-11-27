import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Row, Col, Card, Dropdown, Form} from "react-bootstrap";
import OutHistoryList from "./OutHistoryList";
import {MDBBtn} from "mdb-react-ui-kit";
import {IoArrowBackOutline} from "react-icons/io5";
import {rootIP} from "../../info";
import {MdOutlineHistory} from "react-icons/md";
import ModalSelectDate from "../modals/ModalSelectDate";
import PageTool from "../tools/PageTool";
import {useParams} from "react-router-dom";


export default function OutHistory() {


  const [data, setData] = useState([]);
  const [params, setParams]
    = useState({page_size: 30, ordering: 'id'}); //傳給API的參數
  let {pageNumber} = useParams(); // 網址的頁碼參數
  const [pageCount, setPageCount] = useState({}) // 頁碼總數

  useEffect(() => {
    setData([]);
    axios({
      method: 'GET',
      url: rootIP + '/doc/out/',
      params: {
        ...params,
        page: pageNumber, // 當前頁碼}
      }
    })
      .then(res => {
        setData(res.data.results);
        setPageCount(res.data.page_count);
      })
      .catch(err => {
        console.log(err);
      });
  }, [pageNumber, params]);

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
                <Form method='get' className='my-auto' onSubmit={searchStart}>
                  <Form.Control type='text' name='keyword' placeholder='搜尋文號/主旨/承辦人'></Form.Control>
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
              <div className='d-flex justify-content-center align-items-center'>
                <PageTool path='/out/history/' pageNumber={pageNumber} pageCount={pageCount}/>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </>
  )
}