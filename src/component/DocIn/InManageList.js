import React, {useState, useEffect} from 'react';
import {Button, Card, Col} from "react-bootstrap";
import ModalRevoke from "../modals/ModalRevoke";
import * as webApi from '../WebApi'
import {MDBBtn} from "mdb-react-ui-kit";
import PropTypes from "prop-types";
import ModalAssign from "../modals/ModalAssign";
import {MdDeleteForever} from "react-icons/md";
import ModalRemove from "../modals/ModalRemove";


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
              <div className='d-flex mb-auto'>
                <ModalAssign id={obj.id} setIsLoading={setIsLoading} username={obj.username}/>
                <ModalRemove id={obj.id} setIsLoading={setIsLoading}/>
              </div>
            </div>
            <div>{obj.title}</div>
          </Card.Body>
        </Card>
      </Col>
    )

  })
  return <>{dataList}</>
}

InManageList.propTypes = {
  data: PropTypes.array,
  setIsLoading: PropTypes.func,
};