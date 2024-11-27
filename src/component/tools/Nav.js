import {NavLink, Link} from "react-router-dom";
import {MDBContainer, MDBNavbar, MDBNavbarToggler, MDBCollapse} from 'mdb-react-ui-kit';
import {useState} from "react";
import {FaBars} from "react-icons/fa";


export default function Nav() {

  const [openNav, setOpenNav] = useState(false);

  return (
    <MDBNavbar expand='lg' className='bg-body-tertiary sticky-top'>
      <MDBContainer fluid>
        <Link to='/' className="navbar-brand fw-bolder">電子化收送公文簿</Link>
        <MDBNavbarToggler
          type='button'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setOpenNav(!openNav)}
        >
          <FaBars/>
        </MDBNavbarToggler>
        <MDBCollapse navbar open={openNav}>
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
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  )
}