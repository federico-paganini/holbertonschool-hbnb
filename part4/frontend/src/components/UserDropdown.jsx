const UserDropdown = (/*{ user, onLogout }*/) => {
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
        <img
          src={user.avatar || '/default-avatar.png'}
          alt={user.name || 'User'}
          className="rounded-circle"
          style={{ height: '35px', width: '35px', objectFit: 'cover' }}
        />
      </a>
      <ul
        className="dropdown-menu dropdown-menu-end"
        aria-labelledby="userMenuDropdown"
      >
        <li>
          <a className="dropdown-item" href="/profile">
            Profile
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="/new-user">
            Sign new user
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="/publish">
            Publish
          </a>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li>
          <button className="dropdown-item" onClick={onLogout}>
            Logout
          </button>
        </li>
      </ul>
    </li>
  );
};

export default UserDropdown;
