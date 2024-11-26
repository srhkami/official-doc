import {Card, Table} from "react-bootstrap";
import {FaPlusCircle, FaUserCog} from "react-icons/fa";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {rootIP} from "../../info";
import {MDBBtn} from "mdb-react-ui-kit";
import ModalAddUser from "../modals/ModalAddUser";
import ModalLoading from "../modals/ModalLoading";
import ModalEditUser from "../modals/ModalEditUser";

export default function SettingUser() {

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
  }, [isLoading]);

  const dataList = data.map(obj => {
    return (
      <tr key={obj.id}>
        <td className='text-center'>{obj.name}</td>
        <td className='text-center'>{obj.area}</td>
        <td className='text-center'>{obj.workContent}</td>
        <td className='text-center'>
          <ModalEditUser id={obj.id} setIsLoading={setIsLoading}/>
        </td>
      </tr>
    )
  })


  return (
    <>
      <ModalLoading show={isLoading} setShow={setIsLoading}/>
      <Card className='p-0 shadow-lg rounded-3'>
        <Card.Header className='d-flex'>
          <FaUserCog className='me-2 my-auto i-18'/>
          <h3 className="fw-bolder m-0 my-auto">
            承辦人設定
          </h3>
          <ModalAddUser setIsLoading={setIsLoading}/>
        </Card.Header>
        <Card.Body>
          <Table hover>
            <thead>
            <tr>
              <th scope="col" className='text-center'>姓名</th>
              <th scope="col" className='text-center'>勤區</th>
              <th scope="col" className='text-center'>業務</th>
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