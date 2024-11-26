import {Link} from "react-router-dom";
import {Col, Row} from "react-bootstrap";


export default function Home() {
  return (
    <Row>

      <Col xs={12} md={5}>
        <Link to='/out' className="card mb-3 rounded-3 shadow-lg" style={{textDecoration: 'none'}}>
          <div className="row g-0">
            <div className="col-md-4 d-flex justify-content-center">
              <i className="bi bi-send-plus-fill w-100"></i>
            </div>
            <div className="col-md-8 d-flex align-items-center">
              <div className="card-body">
                <h1 className="card-title fw-bolder text-primary">送文系統</h1>
                <h5 className="card-text">陳報單、公文回覆</h5>
              </div>
            </div>
          </div>
        </Link>
      </Col>
      <Col xs={12} md={5}>
        <Link to='/in' className="card mb-3 rounded-3 shadow-lg" style={{textDecoration: 'none'}}>
          <div className="row g-0">
            <div className="col-md-4 d-flex justify-content-center">
            </div>
            <div className="col-md-8 d-flex align-items-center">
              <div className="card-body">
                <h1 className="card-title fw-bolder text-primary">收文系統</h1>
                <h5 className="card-text">批閱、分派交辦單</h5>
              </div>
            </div>
          </div>
        </Link>
      </Col>
      <Col xs={12} md={2}>
        <Link to='/setting' className="card mb-3 rounded-3 shadow-lg" style={{textDecoration: 'none'}}>
          <div className="row g-0">
            <div className="col-md-4 d-flex justify-content-center">
            </div>
            <div className="col-md-8 d-flex align-items-center">
              <div className="card-body">
                <h5 className="card-title fw-bolder text-primary">系統設定</h5>
              </div>
            </div>
          </div>
        </Link>
      </Col>
    </Row>
  )
}