import React, {useState, useEffect} from 'react';
import {Button} from "react-bootstrap";
import ModalRevoke from "../modals/ModalRevoke";
import * as webApi from '../WebApi'
import {MDBBtn} from "mdb-react-ui-kit";
import PropTypes from "prop-types";


export default function OutManageList({data, setIsLoading}) {

  const dataList = data.map(obj => {
    return (
      <tr key={obj.id}>
        <th scope="row">{obj.number}</th>
        <td>{obj.groupName}</td>
        <td>{obj.title}</td>
        <td>{obj.username}</td>
        <td><ModalRevoke id={obj.id} setIsLoading={setIsLoading}/></td>
      </tr>
    )
  })

  return <>{dataList}</>
}

OutManageList.propTypes = {
  data: PropTypes.array,
  setIsLoading: PropTypes.func,
};