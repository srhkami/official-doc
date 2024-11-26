import React, {useState, useEffect} from 'react';
import {Button, Card, Col} from "react-bootstrap";
import ModalRevoke from "../modals/ModalRevoke";
import * as webApi from '../WebApi'
import {MDBBtn} from "mdb-react-ui-kit";
import PropTypes from "prop-types";
import {TiDelete} from "react-icons/ti";


export default function OutManageList({data, setIsLoading}) {

  const dataList = data.map(obj => {
    // return (
    //   <tr key={obj.id}>
    //     <th scope="row">{obj.number}</th>
    //     <td>{obj.groupName}</td>
    //     <td>{obj.title}</td>
    //     <td>{obj.username}</td>
    //     <td><ModalRevoke id={obj.id} setIsLoading={setIsLoading}/></td>
    //   </tr>
    // )
    return (
      <Col xs={12} md={6} lg={4} key={obj.id} className='mb-3'>
        <Card className='bg-body-secondary'>
          <Card.Body className='p-3'>
            <div className='d-flex justify-content-between align-items-center'>
              <div>
                <div className='fw-bold text-primary'>{obj.number}</div>
                <div className='text-secondary'>{obj.username}（{obj.groupName}）</div>
                <div className=''>{obj.title}</div>
              </div>
              <ModalRevoke id={obj.id} setIsLoading={setIsLoading}/>
            </div>
          </Card.Body>
        </Card>
      </Col>
    )
  })

  return <>{dataList}</>
}

OutManageList.propTypes = {
  data: PropTypes.array,
  setIsLoading: PropTypes.func,
};