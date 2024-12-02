import {MDBBtn} from "mdb-react-ui-kit";
import React, {useContext} from "react";
import PropTypes from "prop-types";
import {rootIP} from "../../info";
import { TbCopy,TbCopyCheckFilled  } from "react-icons/tb";
import AuthContext from "../tools/AuthContext";
import {useAxios} from "../tools/useAxios";

export default function ModalCheck({id, checked, setIsLoading}) {
  // 用來核對送出公文
  const {userInfo} = useContext(AuthContext);
  let api = useAxios();

  const check = () => {
    setIsLoading(true);
    const data = checked ? 0 : 1 ;
    api({
      method: 'PATCH',
      url: rootIP + `/doc/out/${id}/`,
      data: {
        checked: data,
        currentUser: userInfo.username,
      },
      withCredentials: true,
    })
      .then(res => {
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
        console.log(err);
        alert('處理失敗，請重試');
      })
  }

  return (
      <MDBBtn size='sm' outline className='d-flex' color={checked ? '' : 'warning'} onClick={check}>
        { checked ? <TbCopyCheckFilled className='i-12 me-1 my-auto' /> : <TbCopy className='i-12 me-1 my-auto'/>}
        {checked ? '核對' : '核對'}
      </MDBBtn>
  );
}

ModalCheck.propTypes = {
  id: PropTypes.number,
  setIsLoading: PropTypes.func,
  checked: PropTypes.number,
};