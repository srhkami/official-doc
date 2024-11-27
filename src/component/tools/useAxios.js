import axios from 'axios'
import dayjs from 'dayjs'
import {rootIP} from "../../info";

// 攔截器：如果token未過期，則直接傳回請求。或先刷新token，然後返回請求。

export function useAxios(){
  const baseUrl = 'rootIP'
  const axiosInstance = axios.create({
    baseUrl
  });

  axiosInstance.interceptors.request.use(async req => {

    const value = `; ${document.cookie}`;
    const parts = value.split('; ' + localStorage.getItem('currentUser') + '_exp=');

    let isExpired = true
    let exp = parts
    if (parts.length === 2) {
      exp = parts.pop().split(';').shift();
      isExpired = dayjs.unix(exp).diff(dayjs()) < 1;
    }

    if (!isExpired) {
      return req
    } else {
      await axios({
        method: 'post',
        url: rootIP + '/api/token/refresh/',
        withCredentials: true,
        data: {
          'currentUser': localStorage.getItem('currentUser')
        }
      })

      return req
    }
  })
  return axiosInstance
}
