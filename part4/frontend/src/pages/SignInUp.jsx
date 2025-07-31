import { useState, useEffect } from 'react';
import LoginForm from '../components/LoginForm';
import loginimg from '../assets/login-img.png';

const SignInUp = () => {
  return (
    <>
      <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center">
        <div
          className="row shadow-lg rounded-5 overflow-hidden transparent w-100"
          style={{ maxWidth: '1000px' }}
        >
          <LoginForm />
          {/* Login Form Component */}

          {/* Image Section */}
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
    </>
  );
};

export default SignInUp;
