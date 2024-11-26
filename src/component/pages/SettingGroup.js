import {ButtonGroup, Card, Table} from "react-bootstrap";
import {FaPlusCircle, FaUserCog} from "react-icons/fa";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {rootIP} from "../../info";
import {MDBBtn} from "mdb-react-ui-kit";
import ModalAddUser from "../modals/ModalAddUser";
import ModalLoading from "../modals/ModalLoading";
import ModalEditUser from "../modals/ModalEditUser";
import {HiMiniRectangleGroup} from "react-icons/hi2";
import ModalAddGroup from "../modals/ModalAddGroup";
import ModalDeleteGroup from "../modals/ModalDeleteGroup";


export default function SettingGroup() {

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);

  useEffect(() => {
    axios({
      method: 'GET',
      url: rootIP + '/doc/groups/',
      params: {
        ordering: 'id',
      },
    })
      .then(res => {
        setData(res.data.results);
      })
      .catch(err => {
        console.log(err);
      })
  }, [isLoading]);



  const dataList = data.map(obj => {
    return (
      <tr key={obj.id}>
        <td className='text-center'>{obj.name}</td>
        <td className='text-center'>
          <ModalDeleteGroup id={obj.id} setIsLoading={setIsLoading}/>
        </td>
      </tr>
    )
  })


  return (
    <>
      <ModalLoading show={isLoading} setShow={setIsLoading}/>
      <Card className='p-0 shadow-lg rounded-3'>
        <Card.Header className='d-flex'>
          <HiMiniRectangleGroup className='me-2 my-auto i-18'/>
          <h3 className="fw-bolder m-0 my-auto">
            業務組設定
          </h3>
          <ModalAddGroup setIsLoading={setIsLoading}/>
        </Card.Header>
        <Card.Body>
          <Table hover>
            <thead>
            <tr>
              <th scope="col" className='text-center'>組別</th>
              <th scope="col" className='text-center'>操作</th>
            </tr>
            </thead>
            <tbody>
            {dataList}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </>
  )
}