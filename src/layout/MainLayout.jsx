import React, { useState } from 'react';
import Sidebar from '../partials/Sidebar.jsx';
import Header from '../partials/Header.jsx';
import Banner from '../partials/Banner.jsx';

const MainLayout = ({ children }) => {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	return (
		<div className="flex h-screen overflow-hidden">
			{/* Sidebar */}
			<Sidebar
				sidebarOpen={sidebarOpen}
				setSidebarOpen={setSidebarOpen}
			/>

			{/* Content area */}
			<div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
				{/*  Site header */}
				<Header
					sidebarOpen={sidebarOpen}
					setSidebarOpen={setSidebarOpen}
				/>

				<main>{children}</main>

				{/* <Banner /> */}
			</div>
		</div>
	);
};

export default MainLayout;
