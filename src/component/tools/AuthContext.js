import {useState, createContext, useEffect} from "react";
import axios from 'axios'
import {rootIP} from "../../info";

let AuthContext = createContext({})
export default AuthContext;

export const AuthProvider = ({children}) => {

  let [isAuthenticatedState, setIsAuthenticatedState] = useState(false);
  let [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({});

  let setIsAuthenticated = (val) => {
    setIsAuthenticatedState(val)
  }

  let verifyToken = () => {
    // refresh token #######################
    axios({
      method: 'post',
      url: rootIP + '/api/token/refresh/',
      withCredentials: true,
      data: {
        'currentUser': localStorage.getItem('currentUser')
      }
    })
      .then((res) => {
        if (res.status === 200) {
          // verify token #####################
          axios({
            method: 'post',
            url: rootIP + '/api/token/verify/',
            withCredentials: true,
            data: {
              'currentUser': localStorage.getItem('currentUser')
            },
          })
            .then(res => {
              setIsLoading(false)
              // if token valid ########
              if (res.status === 200) {
                setIsAuthenticatedState(true);
                setUserInfo(res.data);
              }
            })
        } else {
          setIsLoading(false)
        }
      })
      .catch(err => {
        setIsLoading(false)
      })
  }

  let contextData = {
    // 全局可掉用的變數
    isAuthenticated: isAuthenticatedState,
    setIsAuthenticated: setIsAuthenticated,
    userInfo: userInfo,
  }
  useEffect(() => {
    verifyToken()
  }, [])

  return (
    <AuthContext.Provider value={contextData}>
      {isLoading ? null : children}
    </AuthContext.Provider>
  )
}