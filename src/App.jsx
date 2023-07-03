import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import './css/style.css';

import './charts/ChartjsConfig';

// Import pages
import Dashboard from './pages/Dashboard';
import MainLayout from './layout/MainLayout.jsx';
import UserPage from './pages/UserPage.jsx';
import SongPage from './pages/SongPage.jsx';
import { SignInPage } from './pages/SignIn.jsx';
import AuthProvider from './providers/AuthProvider.jsx';
import Notfound from './pages/404.jsx';
import CreateSong from './pages/CreateSong.jsx';

function App() {
	const location = useLocation();

	useEffect(() => {
		document.querySelector('html').style.scrollBehavior = 'auto';
		window.scroll({ top: 0 });
		document.querySelector('html').style.scrollBehavior = '';
	}, [location.pathname]); // triggered on route change

	return (
		<AuthProvider>
			<Routes>
				<Route
					exact
					path="/"
					element={
						<MainLayout>
							<Dashboard />
						</MainLayout>
					}
				/>
				<Route
					exact
					path="/users"
					element={
						<MainLayout>
							<UserPage />
						</MainLayout>
					}
				/>
				<Route
					exact
					path="/songs"
					element={
						<MainLayout>
							<SongPage />
						</MainLayout>
					}
				/>
				<Route
					exact
					path="/songs/new"
					element={
						<MainLayout>
							<CreateSong />
						</MainLayout>
					}
				/>
				<Route
					exact
					path="/signin"
					element={<SignInPage />}
				/>
				<Route
					exact
					path="*"
					element={<Notfound />}
				/>
			</Routes>
		</AuthProvider>
	);
}

export default App;
