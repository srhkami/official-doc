import React, {useState} from 'react';
import {Alert, Modal} from "react-bootstrap";
import {MDBBtn} from "mdb-react-ui-kit";
import axios from "axios";
import {rootIP} from "../../info";
import PropTypes from 'prop-types';

export default function ModalDeleteGroup({id,setIsLoading}) {
  // 用來撤銷送文

  const [modalShow, setModalShow] = useState(false);
  const handleModalShow = () => setModalShow(true);
  const handleModalClose = () => setModalShow(false);

    const deleteGroup = () => {
    setIsLoading(true);
    axios({
      method: 'DELETE',
      url: rootIP + `/doc/groups/${id}/`,
    }).then(res => {
      setIsLoading(false);
      setModalShow(false);
    })
      .catch(err => {
        setIsLoading(false);
        console.log(err)
      })
  }

  return (
    <>
      <MDBBtn color='danger' size='sm' outline onClick={handleModalShow}>刪除</MDBBtn>
      {modalShow &&
        <Modal show={modalShow} onHide={handleModalClose}>
          <Alert variant='info' className='m-0'>
            <Alert.Heading>是否確定刪除？</Alert.Heading>
            <p>刪除不影響原有紀錄。</p>
            <hr/>
            <div className='d-flex justify-content-end'>
              <MDBBtn color="danger" className='me-2' onClick={deleteGroup}>確定刪除</MDBBtn>
              <MDBBtn color="secondary"  onClick={handleModalClose}>取消</MDBBtn>
            </div>
          </Alert>
        </Modal>
      }
    </>
  )
}

ModalDeleteGroup.propTypes = {
  id: PropTypes.number,
  setIsLoading: PropTypes.func,
};