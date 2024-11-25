import {NavLink,Link} from "react-router-dom";
import {Container, Navbar} from "react-bootstrap";

export default function Nav() {
  return (
    <Navbar expand='lg' className='bg-body-tertiary'>
      <Container fluid='xl'>
        <Link to='/' className="navbar-brand fw-bolder">電子化收送公文簿</Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to='/out' className='nav-link'>送文 / 陳報</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to='/in' className='nav-link'>收文 / 審批</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to='/setting' className='nav-link'>系統設定</NavLink>
            </li>
          </ul>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  // <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top">
  //   <div className="container-fluid">
  //
  //     <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
  //             data-bs-target="#navbarSupportedContent">
  //       <span className="navbar-toggler-icon"></span>
  //     </button>
  //     <div className="collapse navbar-collapse" id="navbarSupportedContent">
  //
  //     </div>
  //     </div>
  //   </nav>
  )
}