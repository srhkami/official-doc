import {Card, Col} from "react-bootstrap";
import ModalRevoke from "../modals/ModalRevoke";
import PropTypes from "prop-types";
import ModalCheck from "../modals/ModalCheck";

export default function OutManageList({data, setIsLoading}) {

  const dataList = data.map(obj => {
    return (
      <Col xs={12} md={6} lg={4} key={obj.id} className='mb-3'>
        <Card className='bg-body-secondary'>
          <Card.Body className='p-3'>
            <div className='d-flex justify-content-between align-items-center'>
              <div>
                <div className='fw-bold text-primary'>{obj.number}</div>
                <div className='text-secondary'>{obj.username}（{obj.groupName}）</div>
              </div>
              <div className='d-flex mb-auto'>
              {/*<ModalCheck id={obj.id} checked={obj.checked} setIsLoading={setIsLoading}/>*/}
              <ModalRevoke id={obj.id} setIsLoading={setIsLoading}/>
                </div>
            </div>
            <div className=''>{obj.title}</div>
          </Card.Body>
        </Card>
      </Col>
    )
  })

  return <>{dataList}</>
}

OutManageList.propTypes = {
  data: PropTypes.array,
  setIsLoading: PropTypes.func,
};