import React, {useContext, useState} from 'react';
import {Alert, Modal} from "react-bootstrap";
import {MDBBtn} from "mdb-react-ui-kit";
import {rootIP} from "../../info";
import PropTypes from 'prop-types';
import {MdDeleteForever} from "react-icons/md";
import AuthContext from "../tools/AuthContext";
import {useAxios} from "../tools/useAxios";

export default function ModalRemove({id, setIsLoading}) {
  // 用來刪除收文

  const {userInfo} = useContext(AuthContext);
  let api = useAxios();

  const [modalShow, setModalShow] = useState(false);
  const handleModalShow = () => setModalShow(true);
  const handleModalClose = () => setModalShow(false);

  function remove() {
    setIsLoading(true);
    api({
      method: 'DELETE',
      url: rootIP + '/doc/in/' + id + '/',
      data: {
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
      <MDBBtn color='danger' size='sm' outline className='ms-1 px-2 d-flex' onClick={handleModalShow}>
        <MdDeleteForever className='i-15 my-auto'/>
      </MDBBtn>
      {modalShow &&
        <Modal show={modalShow} onHide={handleModalClose}>
          <Alert variant='info' className='m-0'>
            <Alert.Heading>是否刪除此筆紀錄？</Alert.Heading>
            <p>此操作無法復原。</p>
            <hr/>
            <div className='d-flex justify-content-end'>
              <MDBBtn color="danger" className='me-2' onClick={remove}>確定刪除</MDBBtn>
              <MDBBtn color="secondary" onClick={handleModalClose}>取消</MDBBtn>
            </div>
          </Alert>
        </Modal>
      }
    </>
  )
}

ModalRemove.propTypes = {
  id: PropTypes.number,
  setIsLoading: PropTypes.func,
};