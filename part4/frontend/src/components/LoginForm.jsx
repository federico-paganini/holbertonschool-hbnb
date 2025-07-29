import { useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import loginimg from '../assets/login-img.png';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    console.log('Login data:', { email, password });
  };

  useEffect(() => {
    document.body.classList.add('login-page');
    return () => {
      document.body.classList.remove('login-page');
    };
  }, []);

  return (
    <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center">
      <div
        className="row shadow-lg rounded-5 overflow-hidden transparent w-100"
        style={{ maxWidth: '1000px' }}
      >
        <div className="col-md-5 p-5">
          <div className="mb-4 fw-bold fs-5">
            <img src={logo} className="img-fluid w-50" alt="Logo" />
          </div>
          <p className="text-muted mb-2">Welcome back !!!</p>
          <h2 className="fw-bold mb-4">Log In</h2>

          <form className="ps-1" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control bg-light"
                id="email"
                placeholder="login@gmail.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="form-label d-flex justify-content-between"
              >
                Password
                <a href="#" className="text-decoration-none text-primary small">
                  Forgot Password?
                </a>
              </label>
              <input
                type="password"
                className="form-control bg-light"
                id="password"
                placeholder="********"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <div className="d-flex align-items-center">
              <button type="submit" className="btn btn-pink w-20 mb-3">
                LOGIN ➜
              </button>
            </div>
          </form>

          <p className="text-center text-muted small">
            Don't have an account yet?{' '}
            <a href="#" className="text-decoration-none text-pink">
              Sign up for free
            </a>
          </p>
        </div>

        <div className="col-md-7 position-relative d-none d-md-block p-0">
          <img
            src={loginimg}
            className="position-absolute top-50 start-50 translate-middle"
            style={{ maxHeight: '500px', zIndex: 2 }}
            alt="Login illustration"
          />

          <div className="row h-100 m-0">
            <div className="col-md-5"></div>
            <div className="col-md-7 transparent2 rounded-start-5"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
