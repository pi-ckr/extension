import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { createBrowserRouter, RouterProvider, useLocation } from 'react-router-dom';
import { Login, Main } from './pages';
import ThemeProvider from '@pickr/shared/components/ThemeProvider.tsx';
 
const NotFound = () => {
	const location = useLocation();

	return (
		<div>
			<h1>404 Not Found</h1>
			<p>현재 경로: { location.pathname }</p>
		</div>
	);
};

const router = createBrowserRouter([
	{
		path: '/',
		element: <Main />,
	},
	{
		path: '/index.html',
		element: <Main />,
	},
	{
		path: '/login',
		element: <Login />,
	},
	{
		path: '*',
		element: <NotFound />,
	},
]);


createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ThemeProvider>
			<RouterProvider router={ router } />
		</ThemeProvider>
	</StrictMode>,
);
