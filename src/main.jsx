import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import store from "./store/store.js";
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom';
import AuthLayout from "./Components/AuthLayout.jsx";
import { Home, EditPage, SignupPage, LoginPage, AddPage } from "./Pages/index.js";
import Profile from './Components/Profile.jsx';
import Post from './Pages/Post.jsx';
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={
        <Home />}
      />
      <Route
        path="/login"
        element={
          <AuthLayout authenticated={false}>
            <LoginPage />
          </AuthLayout>
        }
      />
      <Route
        path="/signup"
        element={
          <AuthLayout authenticated={false}>
            <SignupPage />
          </AuthLayout>
        }
      />
      <Route
        path="/add-post"
        element={
          <AuthLayout authenticated="true">
            <AddPage />
          </AuthLayout>
        }
      />
      <Route
        path="/profile"
        element={
          <AuthLayout authenticated="true">
            <Profile />
          </AuthLayout>
        }
      />
      <Route
        path="/edit-page"
        element={
          <AuthLayout authenticated="true">
            <EditPage />
          </AuthLayout>
        }
      />
      <Route
        path="/edit-post/:slug"
        element={
          <AuthLayout authenticated="true">
            <EditPage />
          </AuthLayout>
        }
      />
      <Route
        path="/post/:slug"
        element={
          
            <Post />
        
        }
      />
    </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
