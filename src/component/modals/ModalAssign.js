import {MDBBtn} from "mdb-react-ui-kit";
import React, {useContext, useEffect, useState} from "react";
import {Col, Form, Modal, Table} from "react-bootstrap";
import {getDate} from "../tools/getDate";
import {useForm} from "react-hook-form";
import OptionsUser from "../tools/OptionsUser";
import PropTypes from "prop-types";
import ModalAddIn from "./ModalAddIn";
import ModalEditUser from "./ModalEditUser";
import axios from "axios";
import {rootIP} from "../../info";
import { BiSolidSelectMultiple } from "react-icons/bi";
import { TbCopy,TbCopyCheckFilled  } from "react-icons/tb";
import AuthContext from "../tools/AuthContext";
import {useAxios} from "../tools/useAxios";

export default function ModalAssign({id, setIsLoading, username}) {
  // 用來分派承辦人
  const {userInfo} = useContext(AuthContext);
  let api = useAxios();

  const [modalShow, setModalShow] = useState(false);
  const handleModalShow = () => setModalShow(true);
  const handleModalClose = () => setModalShow(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios({
      method: 'GET',
      url: rootIP + '/doc/users/',
      params: {
        ordering: 'area',
      },
    })
      .then(res => {
        setData(res.data.results);
      })
      .catch(err => {
        console.log(err);
      })
  }, []);

  const assigan = (username) => {
    setIsLoading(true);
    api({
      method: 'PATCH',
      url: rootIP + `/doc/in/${id}/`,
      data: {
        username: username,
        readDate: getDate().today,
        currentUser: userInfo.username,
      },
      withCredentials: true,
    })
      .then(res => {
        setIsLoading(false);
        setModalShow(false);
      })
      .catch(err => {
        setIsLoading(false);
        console.log(err);
        alert('處理失敗，請重試');
      })
  }

  const dataList = data.map(obj => {
    return (
      <tr key={obj.id} onClick={()=>{assigan(obj.name)}}>
        <td className='text-center px-0'>{obj.name}</td>
        <td className='text-center px-0'>{obj.area}</td>
        <td className='px-1'>{obj.workContent}</td>
      </tr>
    )
  })


  return (
    <>
      <MDBBtn size='sm' outline className='mb-auto d-flex' color={username ? '' : 'warning'} onClick={handleModalShow}>
        { username ? <TbCopyCheckFilled className='i-12 me-1 my-auto' /> : <TbCopy className='i-12 me-1 my-auto'/>}
        {username ? username : '分派'}
      </MDBBtn>
      {modalShow &&
        <Modal show={modalShow} onHide={handleModalClose} scrollable>
          <Modal.Header closeButton>
            <h4 className='fw-bolder text-primary my-auto'>分派承辦人</h4>
          </Modal.Header>
          <Modal.Body>
            <Table hover>
              <thead>
              <tr>
                <th scope="col" className='text-center px-0' width='25%'>姓名</th>
                <th scope="col" className='text-center px-0' width='20%'>勤區</th>
                <th scope="col" className='text-center px-0' width='55%'>業務</th>
              </tr>
              </thead>
              <tbody>
              {dataList}
              </tbody>
            </Table>
          </Modal.Body>
        </Modal>
      }
    </>
  );
}

ModalAssign.propTypes = {
  id: PropTypes.number,
  setIsLoading: PropTypes.func,
  username: PropTypes.string,
};