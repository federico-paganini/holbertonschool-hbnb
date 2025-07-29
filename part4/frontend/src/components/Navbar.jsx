import { useLocation, Link } from 'react-router-dom';
import UserDropdown from './UserDropdown';
import logo from '../assets/logo.png';

const Navbar = (/*{ user, onLogout }*/) => {
  const location = useLocation();
  const user = null;

  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <span className="navbar-brand">
            <img
              src={logo}
              alt="Logo"
              className="d-inline-block align-text-top logo"
            ></img>
          </span>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="vr me-5"></div>
            <ul className="navbar-nav w-100 me-auto mb-2 mb-lg-0 d-flex justify-content-between">
              <li className="nav-item">
                <Link
                  className={`nav-link fs-5 ${location.pathname === '/' ? 'active' : ''}`}
                  aria-current="page"
                  to="/"
                >
                  <i className="bi bi-house-door-fill"></i> Home
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link fs-5" href="#">
                  <i className="bi bi-luggage-fill"></i> Experiences
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link fs-5" href="#">
                  <i className="bi bi-cup-hot-fill"></i> Services
                </a>
              </li>
              <div className="vr"></div>
              <li className="nav-item">
                <div className="contain text-center">
                  <label className="toggleswitch">
                    <input
                      type="checkbox"
                      name="switch"
                      className="form-check-input"
                      id="modeswitch"
                    />
                    <span>
                      <i className="bi bi-brightness-high-fill off"></i>
                      <i className="bi bi-moon-stars-fill on"></i>
                    </span>
                  </label>
                </div>
              </li>
              {!user ? (
                <li className="nav-item">
                  <Link
                    className={`nav-link fs-5 ${location.pathname === '/login' ? 'active' : ''}`}
                    aria-current="page"
                    to="/login"
                  >
                    <i className="bi bi-box-arrow-right"></i> Login
                  </Link>
                </li>
              ) : (
                <UserDropdown user={user} />
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
