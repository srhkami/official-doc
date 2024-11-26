import React, {useState, useEffect} from 'react';
import {Button, Card, Col} from "react-bootstrap";
import ModalRevoke from "../modals/ModalRevoke";
import * as webApi from '../WebApi'
import {MDBBtn} from "mdb-react-ui-kit";
import PropTypes from "prop-types";
import ModalAssign from "../modals/ModalAssign";


export default function InManageList({data, setIsLoading}) {

  const dataList = data.map(obj => {
    return (
      <Col xs={12} md={6} lg={4} key={obj.id} className='mb-3'>
        <Card className='bg-body-secondary'>
          <Card.Body className='p-3'>
            <div className='d-flex justify-content-between align-items-center'>
              <div>
                <div className='fw-bold text-primary'>{obj.number}</div>
                <div className='text-secondary'>{obj.groupName}</div>
              </div>
              <ModalAssign id={obj.id} setIsLoading={setIsLoading} username={obj.username}/>
            </div>
            <div>{obj.title}</div>
          </Card.Body>
        </Card>
      </Col>
    )
    // return (
    //   <tr key={obj.id}>
    //     <th scope="row">{obj.number}</th>
    //     <td>{obj.groupName}</td>
    //     <td>{obj.title}</td>
    //     <td>{obj.username}</td>
    //     <td>
    //       <ModalAssign id={obj.id} setIsLoading={setIsLoading}/>
    //     </td>
    //   </tr>
    // )
  })
  return <>{dataList}</>
}

InManageList.propTypes = {
  data: PropTypes.array,
  setIsLoading: PropTypes.func,
};