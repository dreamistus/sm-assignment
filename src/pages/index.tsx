import LoginPage from 'pages/LoginPage';
import PostsPage from 'pages/PostsPage';
import ErrorPage from 'pages/ErrorPage';
import {
  createBrowserRouter,
  LoaderFunction,
  Navigate
} from 'react-router-dom';
import CommonLayout from 'layouts/CommonLayout';
import ProtectedRouteLayout from 'layouts/ProtectedRouteLayout';

const checkPageNumberIsInteger: LoaderFunction = ({ params }): void => {
  if (Number.isNaN(parseInt(params.page ?? '', 10))) {
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw new Error('Page number should be an integer value');
  }
};

const router = createBrowserRouter([
  {
    element: <CommonLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Navigate to="posts" />
      },
      {
        path: '/login',
        element: <LoginPage />
      },
      {
        element: <ProtectedRouteLayout />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: '/posts',
            element: <Navigate to="1" />
          },
          {
            path: '/posts/:page',
            element: <PostsPage />,
            loader: checkPageNumberIsInteger,
            children: [
              {
                path: ':senderId',
                element: <PostsPage />
              }
            ]
          }
        ]
      }
    ]
  }
], { basename: process.env.PUBLIC_URL });

export default router;
