import {Alert, Modal, Spinner} from "react-bootstrap";
import PropTypes from "prop-types";

export default function ModalLoading({show, setShow, msg = '載入中，請稍候……'}) {

  return (
    <>
      {show &&
        <Modal show={show} onHide={() => setShow(false)} backdrop="static">
          <Alert className='m-0 d-flex justify-content-center' variant='warning'>
            <Spinner/>
            <h5 className='my-auto ms-3'>{msg}</h5>
          </Alert>
        </Modal>
      }
    </>
  )
}

ModalLoading.propTypes = {
  show: PropTypes.bool,
  setShow: PropTypes.func,
  msg: PropTypes.string
};