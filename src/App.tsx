import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import SquareSumPage from './SquareSum';

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <SquareSumPage />,
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
};

export default App
