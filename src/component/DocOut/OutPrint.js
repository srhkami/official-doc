import React, {useEffect, useState, useRef} from "react";
import {Card, Col, Row, Table} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {useReactToPrint} from 'react-to-print'
import OutPrintList from "./OutPrintList";
import {IoArrowBackOutline} from "react-icons/io5";
import {IoMdPrint} from "react-icons/io";
import {MDBBtn} from "mdb-react-ui-kit";
import {getDate} from "../tools/getDate";
import axios from "axios";
import {rootIP} from "../../info";


export default function OutPrint() {

  const {date} = useParams()

  const today = getDate().today
  const [data, setData] = useState([]);
  const contentRef = useRef(null);

  const handlePrint = useReactToPrint({contentRef})

  useEffect(() => {
    const params = date === '0' ? {status:0,ordering:'groupName'} : {sendDate: date, status: 1, ordering:'groupName'}
    axios({
      method: 'GET',
      url: rootIP + '/doc/out/',
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
      </Col>
      <Col xs='12' ref={contentRef} className='py-4'>
        <Card className='p-0 shadow-0 rounded-3'>
          <Card.Header className='d-flex'>
            <h3 className="fw-bolder text-primary my-auto">
              民興派出所送文簿
            </h3>
            <h4 className='fw-medium ms-auto my-auto'>
              {date}
            </h4>
          </Card.Header>
          <Card.Body>
            <Table bordered>
              <thead>
              <tr className='text-center'>
                <th scope="col" width='12%'>送文號</th>
                <th scope="col" width='12%'>組別</th>
                <th scope="col" width='15%'>承辦人</th>
                <th scope="col" width='46%'>主旨</th>
                <th scope="col" width='15%'>簽收</th>
              </tr>
              </thead>
              <tbody>
              <OutPrintList data={data}/>
              </tbody>
            </Table>
            <div className='text-secondary'>
              ※ 公文經簽收後，請妥善保存此表，以利事後檢閱。
              {date !== today && `(此表為${getDate().today}重新列印)`}
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>

  )
}