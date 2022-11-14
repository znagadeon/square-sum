import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import SquareSumPage from './SquareSum';
import ModPage from './Mod';

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <SquareSumPage />,
    },
    {
      path: '/mod',
      element: <ModPage />,
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
};

export default App
