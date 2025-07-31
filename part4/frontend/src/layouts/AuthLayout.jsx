import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  useEffect(() => {
    document.body.classList.add('login-page');
    return () => {
      document.body.classList.remove('login-page');
    };
  }, []);

  return (
    <>
      <title>HBnB | Sign In - Sign Up</title>
      <meta property="og:title" content="HBnB | Sign In - Sign Up" />
      <meta
        name="description"
        content="Sign In | Sign Up to your HBnB account"
      />
      <meta
        property="og:description"
        content="Sign In | Sign Up to your HBnB account"
      />

      <main>
        <Outlet />
      </main>
    </>
  );
};

export default AuthLayout;
