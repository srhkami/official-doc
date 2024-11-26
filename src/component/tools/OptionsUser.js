import {useEffect, useState} from "react";
import axios from "axios";
import {rootIP} from "../../info";

export default function OptionsUser(){

  const [data, setData] = useState([]);

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
  }, []);

   const dataList = data.map(obj =>{
     return (
        <option key={obj.id} value={obj.name}>{obj.name}</option>
     )
   })

  return(
    <>
      <option value=''>請選擇</option>
      {dataList}
    </>
  )
}