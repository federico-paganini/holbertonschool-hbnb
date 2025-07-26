import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header>
      <nav>
        <h1>Mi App</h1>
        <ul>
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
