import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <main className="p-4">
      <Outlet />
    </main>
  );
};

export default AuthLayout;