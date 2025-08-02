import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/auth';
import { toast } from 'react-toastify';

import * as Yup from 'yup';
import logo from '../assets/logo.png';

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [stayLoggedIn, setStayLoggedIn] = useState(false);
  const credentials = { email, password };
  const { login } = useContext(AuthContext);

  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid Email format')
      .required('Email is required'),

    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await loginSchema.validate(credentials, { abortEarly: false });

      const res = await loginUser(credentials);
      if (res.access_token) {
        login(res.access_token, stayLoggedIn);
        setEmail('');
        setPassword('');
        toast.success('Login successful!');
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    } catch (err) {
      if (err.inner) {
        const messages = err.inner.map(e => e.message).join('\n');
        alert(messages);
      } else {
        alert(err.message);
      }
    }
  };

  return (
    <div className="col-md-5 p-5">
      <div className="mb-4 fw-bold fs-5">
        <img src={logo} className="img-fluid w-50" alt="Logo" />
      </div>
      <p className="text-muted mb-2">Welcome back !!!</p>
      <h2 className="fw-bold mb-4">Log In</h2>

      <form className="ps-1" onSubmit={handleSubmit} noValidate>
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

        <div className="mb-2">
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
        <div className="form-check mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            id="stayLoggedIn"
            checked={stayLoggedIn}
            onChange={e => setStayLoggedIn(e.target.checked)}
          />
          <label
            htmlFor="stayLoggedIn"
            className="form-check-label text-muted small"
          >
            Stay logged in
          </label>
        </div>
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-primary w-20 mb-4">
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
  );
};

export default LoginForm;
