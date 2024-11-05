import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import RootLayout from '@/pages/RootLayout';
import ResponsiveDesignPage from '@/pages/responsive-design/ResponsiveDesignPage';

const Router = () => {
	const router = createBrowserRouter([
		{
			id: 'root',
			path: '/',
			element: <RootLayout />,
			children: [
				{
					path: '/',
					element: <ResponsiveDesignPage />,
				},
				// {
				// 	path: '/poke',
				// 	element: <PokePage />,
				// },
			],
		},
		// {
		// 	id: 'dashboard',
		// 	path: '/dashboard',
		// 	loader: () => {
		// 		const cookies = new Cookies();
		// 		const auth = cookies.get('cred');

		// 		if (!auth) {
		// 			return redirect('/');
		// 		}
		// 		return null;
		// 	},
		// 	element: <DashboardLayout />,
		// 	children: [
		// 		{ path: '/dashboard', element: <WelcomePage />, index: true },
		// 		{ path: '/dashboard/product', element: <ProductPage /> },
		// 	],
		// },
		// {
		// 	id: 'any',
		// 	path: '*',
		// 	element: (
		// 		<>
		// 			<h1>Not Found</h1>
		// 		</>
		// 	),
		// },
	]);
	return <RouterProvider router={router} />;
};
export default Router;
