import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  Homelayout,
  Landing,
  Register,
  Login,
  DashboardLayout,
  Error,
  Addsub,
  Stats,
  Allsubs,
  Profile,
  Admin,
  Db,
  EditSubject,
} from './pages';

import { action as registerAction } from './pages/register';
import { action as loginAction } from './pages/Login';
import { loader as userLoader } from './pages/DashboardLayout';
import { loader as dbLoader } from './pages/db';
import { loader as AllSubLoader } from './pages/Allsubs';
import { loader as editLoader } from './pages/EditSubject';
//import { action as contentAction } from './pages/Addsub';

export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem('darkTheme') === 'true';
  document.body.classList.toggle('dark-theme', isDarkTheme);
  return isDarkTheme;
};

checkDefaultTheme();
const router = createBrowserRouter([
  //{
  //path: '*',
  //element: <Error />,
  //},
  {
    path: '/',
    element: <Homelayout />, //component should be capitalize always
    //errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: 'register',
        element: <Register />,
        action: registerAction,
      },
      {
        path: 'login',
        element: <Login />,
        action: loginAction,
      },
      {
        path: 'dashboard',
        element: <DashboardLayout />,
        loader: userLoader,
        children: [
          {
            index: true,
            element: <Db />,
            loader: dbLoader,
          },
          {
            path: 'addsub',
            element: <Addsub />,
            //action:contentAction
          },
          {
            path: 'stats',
            element: <Stats />,
          },
          {
            path: 'all-subs',
            element: <Allsubs />,
            loader: AllSubLoader,
          },
          {
            path: 'profile',
            element: <Profile />,
          },
          {
            path: 'admin',
            element: <Admin />,
          },
          {
            path: 'edit-content/:id',
            element: <EditSubject />,
            loader:editLoader
          },
        ],
      },
    ],
  },
]);
export const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
