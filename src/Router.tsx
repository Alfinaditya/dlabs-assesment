import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import RootLayout from '@/pages/layout';
import ResponsiveDesignPage from './pages/responsive-design';
import CrudPage from './pages/crud';
import HomePage from './pages/home';
import ApiIntegrationPage from './pages/api-integration';

const Router = () => {
	const router = createBrowserRouter([
		{
			id: 'root',
			path: '/',
			element: <RootLayout />,
			children: [
				{
					path: '/',
					element: <HomePage />,
				},
				{
					path: '/responsive-design',
					element: <ResponsiveDesignPage />,
				},
				{
					path: '/crud',
					element: <CrudPage />,
				},
				{
					path: '/api-integration',
					element: <ApiIntegrationPage />,
				},
			],
		},
	]);
	return <RouterProvider router={router} />;
};
export default Router;
