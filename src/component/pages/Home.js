import {Link} from "react-router-dom";
import {Card, Col, Row} from "react-bootstrap";

export default function Home() {
  return (
    <Row>
      <Col xs={12} md={6}>
        <Link to='/out' className="card mb-3 rounded-3 shadow-lg" style={{textDecoration: 'none'}}>
          <Card>
            <Card.Body className='text-center'>
              <Card.Title as='h1' className='fw-bolder text-primary'>送文系統</Card.Title>
              <Card.Text as='h5'>陳報單、公文回覆</Card.Text>
            </Card.Body>
          </Card>
        </Link>
      </Col>
      <Col xs={12} md={6}>
        <Link to='/in' className="card mb-3 rounded-3 shadow-lg" style={{textDecoration: 'none'}}>
          <Card>
            <Card.Body className='text-center'>
              <Card.Title as='h1' className='fw-bolder text-primary'>收文系統</Card.Title>
              <Card.Text as='h5'>批閱、分派交辦單</Card.Text>
            </Card.Body>
          </Card>
        </Link>
      </Col>
    </Row>
  )
}