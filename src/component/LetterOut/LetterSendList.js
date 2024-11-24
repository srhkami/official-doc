import React, {useEffect, useState} from "react";
import * as webApi from "../WebApi";
import {Button} from "react-bootstrap";
import ModalRevoke from "../modals/ModalRevoke";

export default function LetterSendList() {
  // 設定state
  const [data, setData] = useState([]); //用來動態設定資料
  // 載入時，從後端取得資料
  const path = `letter-out/?status=0&ordering=group_name`;
  useEffect(() => {
    webApi.getList(path)
      .then(response => {
        setData(response.data.results);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    data.map((item) => {
      return (
        <tr key={item.id}>
          <th scope="row" className='text-center'>{item.number}</th>
          <td className='text-center'>{item.group_name}</td>
          <td>{item.title}</td>
          <td></td>
        </tr>
      )
    })
  )
}