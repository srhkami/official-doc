import {Alert, Modal} from "react-bootstrap";
import {MDBBtn} from "mdb-react-ui-kit";
import React, {useState} from "react";

export default function ModalNotice() {

  const [modalShow, setModalShow] = useState(true);
  const handleModalShow = ()=>setModalShow(true);
  const handleModalClose = ()=>setModalShow(false);

  return (
    <Modal show={modalShow} onHide={handleModalClose} className='bg-body'>
      <Alert variant='warning' className='m-0'>
        <Alert.Heading>注意</Alert.Heading>
        <p>為簡化流程，即日起公文不用自行取號，統一由送公文人員輸入抄寫
        <br/>（陳報單送文號請留空）
        </p>
        <hr/>
        <div className='d-flex justify-content-end'>
          <MDBBtn color="success" onClick={handleModalClose}>繼續</MDBBtn>
        </div>
      </Alert>
    </Modal>
  )
}