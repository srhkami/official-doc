import React, {createRef, useState} from "react";
import {Button, Card, Col, Dropdown, Form, Row, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useReactToPrint} from 'react-to-print'
import OutSendList from "./OutSendList";
// import Pdf from 'react-to-pdf'
import {getDate} from "../modals/ModalAddOut";
import ModalSend from "../modals/ModalSend";


export default function OutSend() {
  const today = getDate().today
  const [showModalSend, setShowModalSend] = useState(false)
  const ref = createRef()
  const handlePrint = useReactToPrint({
    content: () => ref.current,
  })

  return (
    <>
      <Row>
        <Col xs='12' className='ms-3'>
          <Button variant='secondary' onClick={() => window.history.back()}>
            <i className="bi bi-arrow-left me-1"></i>
            返回
          </Button>
          <Button variant='primary' className='ms-3' onClick={()=>setShowModalSend(true)}>
            <i class="bi bi-printer me-1"></i>
            確定列印
          </Button>
          {showModalSend &&
            <ModalSend
              isShow={showModalSend}
              onHide={()=>setShowModalSend(false)}
              handlePrint={handlePrint}
            />}
          <p className='text-secondary mt-1 mb-0'>※ 列印後，下列紀錄將不可再更改；如需重新列印，請至「歷史紀錄」。</p>
        </Col>
        <Col xs='12' ref={ref} className='py-4'>
          <Card className='p-0 shadow-lg rounded-3'>
            <Card.Header className='d-flex'>
              <h2 className="fw-bolder text-primary">
                民興派出所送文簿
              </h2>
              <h3 className='fw-medium ms-auto '>
                {today}
              </h3>
            </Card.Header>
            <Card.Body>
              <Table bordered>
                <thead>
                <tr className='text-center'>
                  <th scope="col" width='15%'>送文號</th>
                  <th scope="col" width='15%'>組別</th>
                  <th scope="col" width='55%'>主旨</th>
                  <th scope="col" width='15%'>簽收</th>
                </tr>
                </thead>
                <tbody>
                <OutSendList/>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  )
}