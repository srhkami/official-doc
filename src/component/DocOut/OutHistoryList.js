import React, {useState, useEffect} from 'react';
import {Button} from "react-bootstrap";
import * as webApi from '../WebApi'

function GetStatus(status){
  // 將狀態轉化為中文
  if(status === 0){
    return <span className='text-warning'>未送出</span>
  }else if(status === 1){
    return <span className='text-primary'>已送出</span>
  }else{
    return <span className='text-danger'>已撤回</span>
  }
}

export default function OutHistoryList({data}){

  return (
    data.map((obj) => {
      return (
        <tr key={obj.id}>
          <th scope="row">{obj.number}</th>
          <td>{obj.groupName}</td>
          <td>{obj.title}</td>
          <td>{obj.username}</td>
          <td>{obj.reportDate}</td>
          <td>{obj.sendDate}</td>
          <td>
            {obj.status_display}
          </td>
        </tr>
      )
    })
  )
}