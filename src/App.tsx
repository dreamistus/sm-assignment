import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from 'pages';

const App: React.FC = () => <RouterProvider router={ router } />;

export default React.memo(App);
