import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

import Home from './pages/Index';
import SignInUp from './pages/SignInUp';
import PlaceDetails from './pages/PlaceDetails';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/places/:id" element={<PlaceDetails />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/signin-up" element={<SignInUp />} />
        </Route>
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss={true}
        draggable={true}
        pauseOnHover={true}
      />
    </BrowserRouter>
  );
}

export default App;
