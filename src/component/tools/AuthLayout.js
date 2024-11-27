import {useContext} from "react";
import AuthContext from "./AuthContext";
import PropTypes from 'prop-types';
import Login from "../pages/Login";

export default function AuthLayout({content, authLimit = 4}) {
  // 被此組件包裹住的其他組件，會驗證是否為登入狀態、權限是否符合，否則顯示錯誤提示。
  // 用在有包含敏感資訊的整個頁面

  let {isAuthenticated} = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Login/>
  } else {
    return <>{content}</>
  }
}

export function AuthComponent({content, authLimit = 4}) {
  // 被此組件包裹住的其他組件，會驗證是否為登入狀態、權限是否符合，否則顯示不會顯示組件。
  let {userInfo} = useContext(AuthContext);
  if (userInfo.auth <= authLimit) {
    return <>{content}</>
  } else {
    return <></>
  }
}

export function UserAuthDisplay() {

  let {userInfo} = useContext(AuthContext);
  const auth = userInfo.auth;

  // 返回使用者權限的字串

  if (auth === 0) {
    return <>開發者</>
  } else if (auth === 1) {
    return <>管理員</>
  } else if (auth === 2) {
    return <>協作者</>
  } else if (auth === 3) {
    return <>驗證會員</>
  } else if (auth === 4) {
    return <>一般會員</>
  } else {
    return <>未登入</>
  }
}

AuthLayout.propTypes = {
  content: PropTypes.element,
  authLimit: PropTypes.number,
}
