import React, {useEffect, useState} from "react";
import * as webApi from "../WebApi";
import {Button} from "react-bootstrap";
import ModalRevoke from "../modals/ModalRevoke";

export default function OutSendList({data}) {

  return (
    data.map((obj) => {
      return (
        <tr key={obj.id} className='p-2'>
          <th scope="row" className='text-center p-2'>{obj.number}</th>
          <td className='text-center p-2'>{obj.groupName}</td>
          <td className='p-2'>{obj.title}</td>
          <td className='p-2'></td>
        </tr>
      )
    })
  )
}