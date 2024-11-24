import React, {useState} from 'react';
import {Link} from "react-router-dom";
import LetterOutList from "./LetterOutList";
import {Button, Row, Col, Card, Dropdown, Form, Modal, Table} from "react-bootstrap";
import ModalAddForm from "../modals/ModalAddForm";
import ModalSend from "../modals/ModalSend";


export default function LetterOut() {

  //設定state
  const [showModalAdd, setShowModalAdd] = useState(false)


  return (
    <>
      <Row>
        <Col xs='12' className='mb-3 d-flex'>
          <Button as='button' variant='primary' className='ms-2 my-auto' onClick={() => setShowModalAdd(true)}>
            <i className="bi-file-earmark-plus me-1"></i>
            新增
          </Button>
          {showModalAdd && <ModalAddForm isShow={showModalAdd}
                                        onHide={() => setShowModalAdd(false)}/>}
          {/*<Button as='button' variant='success' className='ms-3 my-auto' onClick={()=> setShowModalSend(true)}>*/}
          {/*  <i className="bi-send-plus me-1"></i>*/}
          {/*  送出公文*/}
          {/*</Button>*/}


          <Link to='send' className="btn btn-success ms-3 my-auto">
            <i className="bi-send-plus me-1"></i>
            送出公文</Link>
          <Link to='history' className="btn btn-secondary ms-auto my-auto"><i
            className="bi-clock-history me-1"></i>
            查閱歷史記錄</Link>
        </Col>
        <Col xs='12'>
          <Card className='p-0 shadow-lg rounded-3'>
            <Card.Header className='d-flex'>
              <h2 className="fw-bolder text-primary m-0">
                <i className="bi bi-list-check me-2"></i>
                待送公文
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
                <LetterOutList/>
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