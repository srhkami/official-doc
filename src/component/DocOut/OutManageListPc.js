import {Card, Col, Table} from "react-bootstrap";
import ModalRevoke from "../modals/ModalRevoke";
import PropTypes from "prop-types";
import ModalCheck from "../modals/ModalCheck";
import OutHistoryList from "./OutHistoryList";
import React from "react";

export default function OutManageListPc({data, setIsLoading}) {

  const dataList = data.map(obj => {
    return (
      <tr key={obj.id}>
        <th scope="row" className='text-center'>{obj.number}</th>
        <td className='text-center'>{obj.username}</td>
        <td className='text-center'>{obj.groupName}</td>
        <td>{obj.title}</td>
        <td className='d-flex justify-content-center'>
          <ModalRevoke id={obj.id} setIsLoading={setIsLoading}/>
        </td>
      </tr>
    )
  })

  return <>
    <Table hover>
      <thead>
      <tr>
        <th scope="col" width='15%' className='text-center'>送文號</th>
        <th scope="col" width='12%' className='text-center'>承辦人</th>
        <th scope="col" width='10%' className='text-center'>組別</th>
        <th scope="col" width='48%' className='text-center'>主旨</th>
        <th scope="col" width='15%' className='text-center'>操作</th>
      </tr>
      </thead>
      <tbody>
      {dataList}
      </tbody>
    </Table>


  </>
}

OutManageListPc.propTypes = {
  data: PropTypes.array,
  setIsLoading: PropTypes.func,
};