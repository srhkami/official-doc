import {Card, Col, FloatingLabel, Form, Row} from "react-bootstrap";
import React from "react";
import {MDBBtn} from "mdb-react-ui-kit";
import {useContext} from "react"
import AuthContext from "../tools/AuthContext"
import {useForm} from "react-hook-form";
import axios from "axios"
import {rootIP} from "../../info";

export default function Login() {


  let {setIsAuthenticated} = useContext(AuthContext)

  const {
    register,
    handleSubmit,
    setError,
    formState: {
      errors,  // 錯誤內容
    }
  } = useForm()

  const onSubmit = (formData) => {
    axios({
      method: 'post',
      url: rootIP + '/api/token/login/',
      data: formData,
      withCredentials: true
    })
      .then(res => {

        if (res.status === 200) {
          localStorage.setItem('currentUser', res.data.username);
          console.log('登入成功1');
          setIsAuthenticated(true);
                  console.log('登入成功2');
          alert('登入成功！');
          window.location.reload();
        }
      })
      .catch(err => {
        const errorData = err.response.data; //取得後端回傳的錯誤訊息
        Object.keys(errorData).forEach(key => {
          setError(key, {message: errorData[key]}) //逐一顯示
        })
      })
  }

  return (
    <Row>
      <Col xs={12} md={6} xl={4} className='d-flex mx-auto'>
        <Card className='mx-auto'>
          <Card.Header className='d-flex'>
            <h3 className="fw-bolder text-primary mx-auto my-auto">登入</h3>
          </Card.Header>
          <Card.Body>
            <Form noValidate onSubmit={handleSubmit(onSubmit)}>
              <FloatingLabel label='帳號' className='mb-3'>
                <input
                  className='form-control'
                  type='text'
                  placeholder=''
                  {...register('username', {required: '請勿留空',})}
                />
              </FloatingLabel>
              <FloatingLabel label='密碼' className='mb-3'>
                <input
                  className='form-control'
                  type='password'
                  placeholder=''
                  {...register('password', {required: '請勿留空',})}
                />
                <span className='text-danger f-07 fw-bolder'>{errors.username && errors.username.message}</span>
              </FloatingLabel>
              <Row className='mt-3'>
                <Col xs={12}>
                  <MDBBtn type='submit' className='w-100'>登入</MDBBtn>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}