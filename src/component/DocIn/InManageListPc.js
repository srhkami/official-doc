import {Card, Col, Table} from "react-bootstrap";
import PropTypes from "prop-types";
import ModalAssign from "../modals/ModalAssign";
import ModalRemove from "../modals/ModalRemove";
import ModalRevoke from "../modals/ModalRevoke";
import React from "react";

export default function InManageListPc({data, setIsLoading}) {

  const dataList = data.map(obj => {
    // return (
    //   <Col xs={12} md={6} lg={4} key={obj.id} className='mb-3'>
    //     <Card className='bg-body-secondary'>
    //       <Card.Body className='p-3'>
    //         <div className='d-flex justify-content-between align-items-center'>
    //           <div>
    //             <div className='fw-bold text-primary'>{obj.number}</div>
    //             <div className='text-secondary'>{obj.groupName}</div>
    //           </div>
    //           <div className='d-flex mb-auto'>
    //
    //           </div>
    //         </div>
    //         <div>{obj.title}</div>
    //       </Card.Body>
    //     </Card>
    //   </Col>
    // )
    return (
      <tr key={obj.id}>
        <th scope="row" className='text-center'>{obj.groupName}</th>
        <td className='text-center'>{obj.number}</td>
        <td>{obj.title}</td>
        <td className='d-flex justify-content-between'>
          <ModalAssign id={obj.id} setIsLoading={setIsLoading} username={obj.username}/>
          <ModalRemove id={obj.id} setIsLoading={setIsLoading}/>
        </td>
      </tr>
    )

  })
  return (
    <Table hover>
      <thead>
      <tr>
        <th scope="col" width='15%' className='text-center'>組別</th>
        <th scope="col" width='15%' className='text-center'>字號</th>
        <th scope="col" width='43%' className='text-center'>主旨</th>
        <th scope="col" width='25%' className='text-center'>操作</th>
      </tr>
      </thead>
      <tbody>
      {dataList}
      </tbody>
    </Table>
  )
}

InManageListPc.propTypes = {
  data: PropTypes.array,
  setIsLoading: PropTypes.func,
};