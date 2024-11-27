import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {Modal, Alert} from "react-bootstrap";
import * as webApi from "../WebApi";
import {IoMdPrint} from "react-icons/io";
import {MDBBtn} from "mdb-react-ui-kit";
import {BsFillSendArrowUpFill} from "react-icons/bs";
import axios from "axios";
import {getDate} from "../tools/getDate";
import {rootIP} from "../../info";
import {useNavigate} from "react-router";

function send(handlePrint) {
  webApi.updatePost('letter')
  handlePrint();
}


export default function ModalSendOut({setIsLoading}) {

  const [modalShow, setModalShow] = useState(false);
  const handleModalShow = () => setModalShow(true);
  const handleModalClose = () => setModalShow(false);
  let navigate = useNavigate();

  function sendDoc() {
    setIsLoading(true);
    // 確認送出公文
    const today = getDate().today;
    axios({
      method: 'GET',
      url: rootIP + '/doc/send_doc/',
      params: {
        "sendDate": today
      }
    })
      .then(res => {
        setIsLoading(false);
        alert('送出成功');
        navigate('/out/print/' + today);
      })
      .catch(err => {
        console.error(err);
        setModalShow(false);
        setIsLoading(false);
        if (err.response.status === 404) {
          alert('沒有任何待送公文');
        } else {
          alert('處理失敗，請重試');
        }
      })
  }


  return (
    <>
      <MDBBtn color='success' className='ms-auto d-flex' size='sm' onClick={handleModalShow}>
        <BsFillSendArrowUpFill className='me-1 my-auto'/>
        送出公文
      </MDBBtn>
      <Modal show={modalShow} onHide={handleModalClose}>
        <Alert variant='info' className='m-0'>
          <Alert.Heading>
            <span className='fw-bolder'>是否確定送出並列印今日送文簿？</span>
          </Alert.Heading>
          <p className='text-warning'>
            請再次核對待送清單是否與實際公文相同！<br/>
            送出後，此頁紀錄將不可再更改；<br/>
            如需重新列印，請至「歷史紀錄→列印歷史送文簿」
          </p>
          <hr/>
          <div className='d-flex justify-content-end'>
            <MDBBtn color='success' className='me-2' onClick={sendDoc}>確認送出</MDBBtn>
            <MDBBtn color="secondary" onClick={handleModalClose}>取消</MDBBtn>
          </div>
        </Alert>
      </Modal>
    </>
  )
}