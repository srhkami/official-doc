import React, {useState, useEffect} from 'react';

export default function InHistoryList({data}){

  return (
    data.map((obj) => {
      return (
        <tr key={obj.id}>
          <th scope="row">{obj.number}</th>
          <td>{obj.receiveDate}</td>
          <td>{obj.groupName}</td>
          <td>{obj.title}</td>
          <td>{obj.readDate}</td>
          <td>{obj.username}</td>
          <td>{obj.status_display}</td>
        </tr>
      )
    })
  )
}