import React, {useState, useEffect} from 'react';
import {Button} from "react-bootstrap";
import ModalRevoke from "../modals/ModalRevoke";
import * as webApi from '../WebApi'


export default function LetterOutList() {
  // 將排序方式的值傳給後端
  let orderBy = new URLSearchParams(window.location.search).get('ordering')
  if (!orderBy) {
    orderBy = 'number'
  }
  //將搜尋的值傳給後端
  let searchKey = new URLSearchParams(window.location.search).get('search')
  if (!searchKey) {
    searchKey = ''
  }
  // 設定state
  const [data, setData] = useState([]); //用來動態設定資料
  const [isModalShow, setIsModalShow] = useState(false) //用來設定Modal是否彈出
  const [id, setId] = useState(0) //用來動態設定ID
  // 載入時，從後端取得資料
  const path = `letter-out/?status=0&ordering=${orderBy}&search=${searchKey}`;
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
          <th scope="row">{item.number}</th>
          <td>{item.group_name}</td>
          <td>{item.title}</td>
          <td>{item.username}</td>
          <td>{item.report_date}</td>
          <td>{item.send_date}
            <Button variant='danger' size='sm' onClick={
              () => {
                setIsModalShow(true);
                setId(item.id);
              }
            }>撤回</Button>
            {isModalShow &&  // 如果isShow變數為true，才會繪製組件
              <ModalRevoke
                isShow={isModalShow}
                onHide={() => setIsModalShow(false)}
                path={path}
                id={id}
                setData = {setData}
              />}
          </td>
        </tr>
      )
    })
  )
}