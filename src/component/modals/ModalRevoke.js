import React, {useContext, useState} from 'react';
import {Alert, Modal} from "react-bootstrap";
import {MDBBtn} from "mdb-react-ui-kit";
import {rootIP} from "../../info";
import PropTypes from 'prop-types';
import {TiDelete} from "react-icons/ti";
import AuthContext from "../tools/AuthContext";
import {useAxios} from "../tools/useAxios";

export default function ModalRevoke({id, setIsLoading}) {
  // 用來撤銷送文

  const {userInfo} = useContext(AuthContext);
  let api = useAxios();

  const [modalShow, setModalShow] = useState(false);
  const handleModalShow = () => setModalShow(true);
  const handleModalClose = () => setModalShow(false);

  function revoke() {
    setIsLoading(true);
    api({
      method: 'PATCH',
      url: rootIP + '/doc/out/' + id + '/',
      data: {
        status: 2,
        currentUser: userInfo.username,
      },
      withCredentials: true,
    }).then(res => {
      setIsLoading(false);
      setModalShow(false);
    }).catch(err => {
      setIsLoading(false);
      console.error(err);
      alert('處理失敗，請重試');
    })
  }

  return (
    <>
      <MDBBtn color='danger' outline size='sm' className='d-flex mb-auto' onClick={handleModalShow}>
        <TiDelete className='i-12 me-1 my-auto'/>
        撤銷
      </MDBBtn>
      {modalShow &&
        <Modal show={modalShow} onHide={handleModalClose}>
          <Alert variant='info' className='m-0'>
            <Alert.Heading>是否撤銷此公文？</Alert.Heading>
            <p>若公文無法於當日送出，請點此撤銷。
              <br/>若想重新送出此公文，請再次新增。</p>
            <hr/>
            <div className='d-flex justify-content-end'>
              <MDBBtn color="danger" className='me-2' onClick={revoke}>確定撤銷</MDBBtn>
              <MDBBtn color="secondary" onClick={handleModalClose}>取消</MDBBtn>
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