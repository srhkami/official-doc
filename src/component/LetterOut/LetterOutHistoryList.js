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

export default function LetterOutHistoryList(){

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
  // 載入時，從後端取得資料
  const path = `letter-out/?ordering=${orderBy}&search=${searchKey}`;
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
          <td>{item.send_date}</td>
          <td>{GetStatus(item.status)}</td>
        </tr>
      )
    })
  )


}