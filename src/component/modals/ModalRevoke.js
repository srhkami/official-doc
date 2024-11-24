import React, {useState, useEffect} from 'react';
import {Alert, Button, Modal} from "react-bootstrap";
import * as webApi from '../WebApi'


export default function ModalRevoke({isShow, onHide, path, id, setData}) {

  const post = {
    "id": id,
    "status": 2
  }

  return (
    <Modal
      show={isShow}  //True or False：從上層傳入的參數，決定Modal是否彈出
      onHide={onHide} //隱藏Modal的函數
    >
      <Alert variant='danger' className='m-0'>
        <Alert.Heading>是否確定撤回？</Alert.Heading>
        <p>如經撤回，若想重新送出同一公文，請再次新增。</p>
        <hr/>
        <div className='d-flex justify-content-end'>
          <Button variant="secondary" className='me-2' onClick={onHide}>取消</Button>
          <Button variant="danger" onClick={() => {
            webApi.updatePost('letter-out/', post)
              .then(res => {
                if (res.status == 200) {
                  webApi.getList(path).then(response => {
                    setData(response.data.results)
                  });
                  alert('撤回成功！')
                  onHide();
                }
              })
          }}>確定撤回</Button>
        </div>
      </Alert>
    </Modal>
  )
}