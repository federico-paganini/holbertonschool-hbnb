# HBnB Frontend

This is the React frontend for the HolbertonBnB project. It provides a user interface for browsing, reviewing, and managing places, as well as user authentication.

## Features

- User authentication (sign in/up, JWT-based)
- Browse and view details for places
- Submit and view reviews for places
- Responsive UI with Bootstrap 5
- Toast notifications for feedback
- Dark/light mode toggle

## Dependencies

- [React](https://react.dev/) ^19.1.0
- [React Router DOM](https://reactrouter.com/) ^7.7.1
- [Bootstrap](https://getbootstrap.com/) ^5.3.7
- [Bootstrap Icons](https://icons.getbootstrap.com/) ^1.13.1
- [React Toastify](https://fkhadra.github.io/react-toastify/) ^11.0.5
- [Yup](https://github.com/jquense/yup) ^1.6.1
- [jwt-decode](https://github.com/auth0/jwt-decode) ^4.0.0
- [Vite](https://vitejs.dev/) ^7.0.4 (for development/build)
- ESLint, Prettier (for code quality)

## Getting Started

### 1. Install dependencies

```sh
cd part4/frontend
npm install
```

### 2. Run the development server

```sh
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173) by default.

### 3. Build for production

```sh
npm run build
```

### 4. Lint the code

```sh
npm run lint
```

## Project Structure

- `src/`
  - `components/` – Reusable UI components (Navbar, Footer, ReviewForm, etc.)
  - `pages/` – Main pages (Home, PlaceDetails, SignInUp)
  - `layouts/` – Layout wrappers for main and auth pages
  - `context/` – React context for authentication
  - `services/` – API and auth helpers
  - `styles.css` – Custom styles
  - `main.jsx` – Entry point

## General Implementation

- **Routing:** Uses React Router for navigation between pages.
- **Authentication:** JWT tokens are stored in cookies. The `AuthContext` manages user state and login/logout.
- **API Communication:** Fetches data from the backend via REST API endpoints (proxied to `/api/v1`).
- **UI:** Built with Bootstrap 5 for layout and components, with custom CSS for branding.
- **State Management:** Uses React hooks (`useState`, `useEffect`, `useContext`) for local and global state.
- **Forms & Validation:** Uses Yup for form validation (e.g., review submission).
- **Notifications:** Uses React Toastify for user feedback.

## Environment

- By default, API requests are proxied to `http://127.0.0.1:5000/api/v1` (see `vite.config.js`).
- No environment variables are required for the frontend unless customizing the API URL.

---

For more details, see the backend documentation in [../backend/README.md](../backend/README.md).
