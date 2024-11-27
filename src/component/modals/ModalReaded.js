import React, {useState} from 'react';
import {Alert, Modal} from "react-bootstrap";
import {MDBBtn} from "mdb-react-ui-kit";
import axios from "axios";
import {rootIP} from "../../info";
import PropTypes from 'prop-types';
import {TiDelete} from "react-icons/ti";
import {FaCheckCircle} from "react-icons/fa";

export default function ModalReaded({setIsLoading}) {
  // 用來完成批閱

  const [modalShow, setModalShow] = useState(false);
  const handleModalShow = () => setModalShow(true);
  const handleModalClose = () => setModalShow(false);

  function readed() {
    setIsLoading(true);
    axios({
      method: 'GET',
      url: rootIP + '/doc/read_doc/',
    }).then(res => {
      setIsLoading(false);
      handleModalClose();
      alert('批閱成功')
    }).catch(err => {
      setIsLoading(false);
      console.error(err);
      alert('處理失敗，請重試');
    })
  }

  return (
    <>
      <MDBBtn color='success' size='sm' className='ms-auto my-auto d-flex' onClick={handleModalShow}>
        <FaCheckCircle className='me-1 i-10 my-auto'/>
        完成批閱
      </MDBBtn>
      <Modal show={modalShow} onHide={handleModalClose}>
        <Alert variant='info' className='m-0'>
          <Alert.Heading>是否完成批閱？</Alert.Heading>
          <p>批閱後已分派的公文將存檔無法修改。
            <br/>未分派的公文不受影響。</p>
          <hr/>
          <div className='d-flex justify-content-end'>
            <MDBBtn color="success" className='me-2' onClick={readed}>完成批閱</MDBBtn>
            <MDBBtn color="secondary" onClick={handleModalClose}>取消</MDBBtn>
          </div>
        </Alert>
      </Modal>
    </>
  )
}

ModalReaded.propTypes = {
  id: PropTypes.number,
  setIsLoading: PropTypes.func,
};