import React, {useState} from 'react';
import {Alert, Modal} from "react-bootstrap";
import {MDBBtn} from "mdb-react-ui-kit";
import axios from "axios";
import {rootIP} from "../../info";
import PropTypes from 'prop-types';

export default function ModalRevoke({id,setIsLoading}) {
  // 用來撤銷送文

  const [modalShow, setModalShow] = useState(false);
  const handleModalShow = () => setModalShow(true);
  const handleModalClose = () => setModalShow(false);

  function rovoke(){
    setIsLoading(true);
    axios({
      method: 'PATCH',
      url: rootIP + '/doc/out/' + id + '/',
      data: {
        "status": 2
      }
    }).then(res =>{
      setIsLoading(false);
      alert('撤銷成功')
    }).catch(err =>{
      setIsLoading(false);
      console.error(err);
      alert('撤銷失敗，請重試');
    })
  }

  return (
    <>
      <MDBBtn color='danger' size='sm' onClick={handleModalShow}>撤銷</MDBBtn>
      {modalShow &&
        <Modal show={modalShow} onHide={handleModalClose}>
          <Alert variant='info' className='m-0'>
            <Alert.Heading>是否撤銷此公文？</Alert.Heading>
            <p>若公文無法於當日送出，請點此撤銷。
              <br/>若想重新送出本公文，請再次新增。</p>
            <hr/>
            <div className='d-flex justify-content-end'>
              <MDBBtn color="danger" className='me-2' onClick={rovoke}>確定撤銷</MDBBtn>
              <MDBBtn color="secondary"  onClick={handleModalClose}>取消</MDBBtn>
            </div>
          </Alert>
        </Modal>
      }
    </>
  )
}

ModalRevoke.propTypes = {
  id: PropTypes.number,
  setIsLoading: PropTypes.func,
};