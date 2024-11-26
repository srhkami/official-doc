import {NavLink,Link} from "react-router-dom";

export default function Nav() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top">
      <div className="container-fluid">
        <Link to='/' className="navbar-brand fw-bolder">派出所收送公文系統</Link>
        {/*<a className="navbar-brand fw-bolder"  href="/public">派出所收送公文系統</a>*/}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
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
        </div>
      </div>
    </nav>
  )
}