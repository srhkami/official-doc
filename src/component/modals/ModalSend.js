import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {Button, Modal, Alert} from "react-bootstrap";
import * as webApi from "../WebApi";

function send(handlePrint){
  webApi.updatePost('letter')
  handlePrint();
}


export default function ModalSend({isShow, onHide,handlePrint}) {
  return (
    <Modal
      show={isShow}
      onHide={onHide}
    >
      <Alert variant='info' className='m-0'>
        <Alert.Heading>
          <span className='fw-bolder'>是否列印送文簿？</span>
        </Alert.Heading>
        <p className='text-warning'>
          請再次核對待送清單是否與實際公文相同<br/>
          列印後，此頁紀錄將不可再更改；如需重新列印，請至「歷史紀錄→列印歷史送文簿」
        </p>
        <hr/>
        <div className='d-flex justify-content-end'>
          <Button variant="secondary" className='me-2' onClick={onHide}>取消</Button>
          <Button variant="info" onClick={handlePrint}>確定列印</Button>
        </div>
      </Alert>
    </Modal>
  )
}