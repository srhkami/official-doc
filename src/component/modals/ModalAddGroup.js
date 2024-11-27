import {useState,} from 'react';
import {Col, Form, Modal} from "react-bootstrap";
import {MDBBtn} from "mdb-react-ui-kit";
import {FaPlusCircle} from "react-icons/fa";
import {useForm} from "react-hook-form";
import {rootIP} from "../../info";
import PropTypes from "prop-types";
import {useContext} from "react"
import AuthContext from "../tools/AuthContext"
import {useAxios} from "../tools/useAxios";

export default function ModalAddGroup({setIsLoading}) {

  const {userInfo} = useContext(AuthContext);
  let api = useAxios();

  const [modalShow, setModalShow] = useState(false);
  const handleModalShow = () => setModalShow(true);
  const handleModalClose = () => setModalShow(false);

  const {
    register,
    handleSubmit,
    formState: {errors},
  }
    = useForm();

  const onSubmit = (formData) => {
    setIsLoading(true);
    formData['currentUser'] = userInfo.username;
    api({
      method: 'post',
      url: rootIP + '/doc/groups/',
      data: formData,
      withCredentials: true,
    }).then(res => {
      setIsLoading(false);
      handleModalClose();
    })
      .catch(err => {
        setIsLoading(false);
        console.log(err)
      })
  }

  return (
    <>
      <MDBBtn size='sm' className='my-auto d-flex ms-auto' onClick={handleModalShow}>
        <FaPlusCircle className='me-1 my-auto'/>
        新增
      </MDBBtn>
      <Modal show={modalShow} onHide={handleModalClose} backdrop="static">
        <Modal.Header closeButton>
          <FaPlusCircle className='i-12 me-2' color='#3B71CA'/>
          <h4 className='fw-bolder text-primary my-auto'>新增業務組</h4>
        </Modal.Header>
        <Modal.Body>
          <Form className='row' onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className='col-6 mb-3'>
              <Form.Label>組別：</Form.Label>
              <input
                className='form-control'
                type='text'
                placeholder=''
                {...register('name', {required: '請填寫此欄位', maxLength: {value: 16, message: '上限16個字'}})}
              />
              <span className='text-danger f-07 fw-bolder'>{errors.number && errors.number.message}</span>
            </Form.Group>
            <Col xs='6' className='d-flex'>
              <MDBBtn type='submit' className='ms-auto mt-auto'>
                確定新增
              </MDBBtn>
            </Col>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}

ModalAddGroup.propTypes = {
  setIsLoading: PropTypes.func,
};