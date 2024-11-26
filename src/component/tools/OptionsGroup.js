import {useEffect, useState} from "react";
import axios from "axios";
import {rootIP} from "../../info";

export default function OptionsGroup(){

  const [data, setData] = useState([]);

    useEffect(() => {
    axios({
      method: 'GET',
      url: rootIP + '/doc/groups/',
      params: {
        ordering: 'id',
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