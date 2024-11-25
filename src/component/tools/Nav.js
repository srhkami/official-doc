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
            {/*<li className="nav-item">*/}
            {/*  <NavLink to='/test' className='nav-link'>測試頁面</NavLink>*/}
            {/*</li>*/}
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                 aria-expanded="false">
                系統設定
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">使用者設定</a></li>
                <li><a className="dropdown-item" href="#">組別設定</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}