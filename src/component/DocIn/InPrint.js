import React, {useEffect, useState, useRef} from "react";
import { Card, Col, Row, Table} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {useReactToPrint} from 'react-to-print'
import ModalSendOut from "../modals/ModalSendOut";
import {IoArrowBackOutline} from "react-icons/io5";
import {IoMdPrint} from "react-icons/io";
import {MDBBtn} from "mdb-react-ui-kit";
import axios from "axios";
import {rootIP} from "../../info";
import InPrintList from "./InPrintList";


export default function InPrint() {

  const {date} = useParams()

  const [data, setData] = useState([]);
  const contentRef = useRef(null);

  const handlePrint = useReactToPrint({contentRef})

  useEffect(() => {
    const params =  {receiveDate: date, ordering:'groupName'}
    axios({
      method: 'GET',
      url: rootIP + '/doc/in/',
      params: params,
    })
      .then(res => {
        setData(res.data.results);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <Row>
      <Col xs='12' className='ms-3 d-flex'>
        <MDBBtn color='secondary' size='sm' className='d-flex' onClick={() => window.history.back()}>
          <IoArrowBackOutline className='me-1 my-auto'/>
          返回
        </MDBBtn>
        <MDBBtn className='ms-3 d-flex' size='sm' onClick={handlePrint}>
          <IoMdPrint className='me-1 i-12 my-auto'/>
          列印
        </MDBBtn>
        {date === '0' && <ModalSendOut/>}
      </Col>
      <Col xs='12' ref={contentRef} className='py-4'>
        <Card className='p-0 shadow-0 rounded-3'>
          <Card.Header className='d-flex'>
            <h3 className="fw-bolder text-primary my-auto">
              民興派出所收文簿
            </h3>
            <h4 className='fw-medium ms-auto my-auto'>
              {date}
            </h4>
          </Card.Header>
          <Card.Body>
            <Table bordered>
              <thead>
              <tr className='text-center'>
                <th scope="col" width='10%'>組別</th>
                <th scope="col" width='10%'>收文號</th>
                <th scope="col" width='38%'>主旨</th>
                <th scope="col" width='15%'>批閱日期</th>
                <th scope="col" width='12%'>承辦人</th>
              </tr>
              </thead>
              <tbody>
              <InPrintList data={data}/>
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Col>
    </Row>

  )
}