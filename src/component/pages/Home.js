import {Link} from "react-router-dom";


export default function Home() {
  return (
    <>
      <div className="row">
        <div className="col-6">
          <Link to='/letter-out' className="card mb-3 rounded-3 shadow-lg" style={{textDecoration:'none'}}>
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
        </div>
        <div className="col-6">
          <a className="card mb-3 rounded-3 shadow-lg" style={{textDecoration:'none'}} href="/letter/in">
            <div className="row g-0">
              <div className="col-md-4 d-flex justify-content-center">
              </div>
              <div className="col-md-8 d-flex align-items-center">
              <div className="card-body">
                  <h1 className="card-title fw-bolder text-primary">收文系統</h1>
                  <h5 className="card-text">審批、分派交辦單</h5>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </>
  )
}