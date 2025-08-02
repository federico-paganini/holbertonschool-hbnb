import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const UserDropdown = () => {
  const { logout } = useContext(AuthContext);

  return (
    <li className="nav-item dropdown">
      <a
        className="nav-link dropdown-toggle d-flex align-items-center"
        href="#"
        id="userMenuDropdown"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <i className="bi bi-person-circle user-icon"></i>
      </a>
      <ul
        className="dropdown-menu dropdown-menu-end"
        aria-labelledby="userMenuDropdown"
      >
        <li>
          <a className="dropdown-item" href="/profile">
            <i className="bi bi-person-vcard"></i> Profile
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="/publish">
            <i className="bi bi-house-add"></i> Publish Place
          </a>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li>
          <button className="dropdown-item" onClick={logout}>
            <i className="bi bi-box-arrow-left"></i> Logout
          </button>
        </li>
      </ul>
    </li>
  );
};

export default UserDropdown;
