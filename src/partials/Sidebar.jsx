import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import logoIcon from '../assets/music-svgrepo-com.svg';
import SidebarLinkGroup from './SidebarLinkGroup';

function Sidebar({ sidebarOpen, setSidebarOpen }) {
	const location = useLocation();
	const { pathname } = location;

	const trigger = useRef(null);
	const sidebar = useRef(null);

	const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
	const [sidebarExpanded, setSidebarExpanded] = useState(storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true');

	// close on click outside
	useEffect(() => {
		const clickHandler = ({ target }) => {
			if (!sidebar.current || !trigger.current) return;
			if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return;
			setSidebarOpen(false);
		};
		document.addEventListener('click', clickHandler);
		return () => document.removeEventListener('click', clickHandler);
	});

	// close if the esc key is pressed
	useEffect(() => {
		const keyHandler = ({ keyCode }) => {
			if (!sidebarOpen || keyCode !== 27) return;
			setSidebarOpen(false);
		};
		document.addEventListener('keydown', keyHandler);
		return () => document.removeEventListener('keydown', keyHandler);
	});

	useEffect(() => {
		localStorage.setItem('sidebar-expanded', sidebarExpanded);
		if (sidebarExpanded) {
			document.querySelector('body').classList.add('sidebar-expanded');
		} else {
			document.querySelector('body').classList.remove('sidebar-expanded');
		}
	}, [sidebarExpanded]);

	return (
		<div>
			{/* Sidebar backdrop (mobile only) */}
			<div
				className={`fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
					sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
				}`}
				aria-hidden="true"
			></div>

			{/* Sidebar */}
			<div
				id="sidebar"
				ref={sidebar}
				className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-slate-800 p-4 transition-all duration-200 ease-in-out ${
					sidebarOpen ? 'translate-x-0' : '-translate-x-64'
				}`}
			>
				{/* Sidebar header */}
				<div className="flex justify-between items-center mb-10 pr-3 sm:px-2">
					{/* Close button */}
					<button
						ref={trigger}
						className="lg:hidden text-slate-500 hover:text-slate-400"
						style={{
							marginRight: 'auto',
						}}
						onClick={() => setSidebarOpen(!sidebarOpen)}
						aria-controls="sidebar"
						aria-expanded={sidebarOpen}
					>
						<span className="sr-only">Close sidebar</span>
						<svg
							className="w-6 h-6 fill-current"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
						</svg>
					</button>
					{/* Logo */}
					<NavLink
						end
						to="/"
						className="block"
					>
						<svg
							width="40"
							height="40"
							viewBox="0 0 40 40"
						>
							<defs>
								<linearGradient
									x1="28.538%"
									y1="20.229%"
									x2="100%"
									y2="108.156%"
									id="logo-a"
								>
									<stop
										stopColor="#A5B4FC"
										stopOpacity="0"
										offset="0%"
									/>
									<stop
										stopColor="#A5B4FC"
										offset="100%"
									/>
								</linearGradient>
								<linearGradient
									x1="88.638%"
									y1="29.267%"
									x2="22.42%"
									y2="100%"
									id="logo-b"
								>
									<stop
										stopColor="#38BDF8"
										stopOpacity="0"
										offset="0%"
									/>
									<stop
										stopColor="#38BDF8"
										offset="100%"
									/>
								</linearGradient>
							</defs>
							<rect
								fill="#6366F1"
								width="32"
								height="32"
								rx="16"
							/>
							<path
								d="M18.277.16C26.035 1.267 32 7.938 32 16c0 8.837-7.163 16-16 16a15.937 15.937 0 01-10.426-3.863L18.277.161z"
								fill="#4F46E5"
							/>
							<path
								d="M7.404 2.503l18.339 26.19A15.93 15.93 0 0116 32C7.163 32 0 24.837 0 16 0 10.327 2.952 5.344 7.404 2.503z"
								fill="url(#logo-a)"
							/>
							<path
								d="M2.223 24.14L29.777 7.86A15.926 15.926 0 0132 16c0 8.837-7.163 16-16 16-5.864 0-10.991-3.154-13.777-7.86z"
								fill="url(#logo-b)"
							/>
						</svg>
					</NavLink>
				</div>

				{/* Links */}
				<div className="space-y-8">
					{/* Pages group */}
					<div>
						<h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
							<span
								className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
								aria-hidden="true"
							>
								•••
							</span>
							<span className="lg:hidden lg:sidebar-expanded:block 2xl:block">Pages</span>
						</h3>
						<ul className="mt-3">
							{/* Dashboard */}
							<li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${(pathname.includes('dashboard') || pathname === '/') && 'bg-slate-900'}`}>
								<NavLink
									end
									to="/"
									className={`block text-slate-200 truncate transition duration-150 ${
										pathname.includes('dashboard') ? 'hover:text-slate-200' : 'hover:text-white'
									}`}
								>
									<div className="flex items-center justify-between">
										<div className="grow flex items-center">
											<svg
												className="shrink-0 h-6 w-6"
												viewBox="0 0 24 24"
											>
												<path
													className={`fill-current ${pathname === '/' || pathname.includes('dashboard') ? 'text-indigo-500' : 'text-slate-400'}`}
													d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0z"
												/>
												<path
													className={`fill-current ${pathname === '/' || pathname.includes('dashboard') ? 'text-indigo-600' : 'text-slate-600'}`}
													d="M12 3c-4.963 0-9 4.037-9 9s4.037 9 9 9 9-4.037 9-9-4.037-9-9-9z"
												/>
												<path
													className={`fill-current ${pathname === '/' || pathname.includes('dashboard') ? 'text-indigo-200' : 'text-slate-400'}`}
													d="M12 15c-1.654 0-3-1.346-3-3 0-.462.113-.894.3-1.285L6 6l4.714 3.301A2.973 2.973 0 0112 9c1.654 0 3 1.346 3 3s-1.346 3-3 3z"
												/>
											</svg>
											<span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Dashboard</span>
										</div>
									</div>
								</NavLink>
							</li>
							{/* Users */}
							<li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('users') && 'bg-slate-900'}`}>
								<NavLink
									end
									to="/users"
									className={`block text-slate-200 truncate transition duration-150 ${
										pathname.includes('messages') ? 'hover:text-slate-200' : 'hover:text-white'
									}`}
								>
									<div className="flex items-center justify-between">
										<div className="grow flex items-center">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												className="shrink-0 h-6 w-6"
											>
												<g>
													<path
														fill="#323232"
														fillRule="evenodd"
														d="M3 12c0-7.412 1.588-9 9-9s9 1.588 9 9c0 4.31-.537 6.651-2.445 7.856l-.316-.978c-.335-1.208-.946-2.01-1.977-2.495-1.009-.474-2.398-.633-4.262-.633-1.866 0-3.255.172-4.264.66-1.03.497-1.64 1.31-1.975 2.517l-.31.932C3.537 18.656 3 16.314 3 12zm5.75-2a3.25 3.25 0 116.5 0 3.25 3.25 0 01-6.5 0z"
														clipRule="evenodd"
														opacity="0.1"
														className={`fill-current ${pathname.includes('users') ? 'text-indigo-500' : 'text-slate-600'}`}
													></path>
													<path
														stroke="#323232"
														strokeWidth="2"
														d="M3 12c0-7.412 1.588-9 9-9s9 1.588 9 9-1.588 9-9 9-9-1.588-9-9z"
														className={`fill-current ${pathname.includes('users') ? 'text-indigo-300' : 'text-slate-400'}`}
													></path>
													<path
														stroke="#323232"
														strokeWidth="2"
														d="M15 10a3 3 0 11-6 0 3 3 0 016 0z"
														className={`fill-current ${pathname.includes('users') ? 'text-indigo-300' : 'text-slate-400'}`}
													></path>
													<path
														stroke="#323232"
														strokeLinecap="round"
														strokeWidth="2"
														d="M6 19c.638-2.307 2.28-3 6-3s5.362.642 6 2.95"
														className={`fill-current ${pathname.includes('users') ? 'text-indigo-300' : 'text-slate-400'}`}
													></path>
												</g>
											</svg>
											<span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Users</span>
										</div>
									</div>
								</NavLink>
							</li>
							{/* Songs */}
							<li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('songs') && 'bg-slate-900'}`}>
								<NavLink
									end
									to="/songs"
									className={`block text-slate-200 truncate transition duration-150 ${
										pathname.includes('messages') ? 'hover:text-slate-200' : 'hover:text-white'
									}`}
								>
									<div className="flex items-center justify-between">
										<div className="grow flex items-center">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="#000"
												className="shrink-0 h-6 w-6"
												data-name="Flat Line"
												viewBox="0 0 24 24"
											>
												<g strokeWidth="2">
													<path
														fill="#2ca9bc"
														d="M9 10a1 1 0 011-1h7V4a1 1 0 00-1-1H5a1 1 0 00-1 1v14a1 1 0 001 1h4z"
														className={`fill-current ${pathname.includes('songs') ? 'text-indigo-500' : 'text-slate-600'}`}
													></path>
													<path
														fill="none"
														stroke="#000"
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M20 13h-3v6"
														className={`fill-current ${pathname.includes('songs') ? 'text-indigo-300' : 'text-slate-400'}`}
													></path>
													<path
														fill="none"
														stroke="#000"
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M9 19H5a1 1 0 01-1-1V4a1 1 0 011-1h11a1 1 0 011 1v5"
														data-name="primary"
														className={`fill-current ${pathname.includes('songs') ? 'text-indigo-300' : 'text-slate-400'}`}
													></path>
													<path
														fill="none"
														stroke="#000"
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M15 17a2 2 0 102 2 2 2 0 00-2-2zm-7-6h5m-5 4h3"
														data-name="primary"
														className={`fill-current ${pathname.includes('songs') ? 'text-indigo-300' : 'text-slate-400'}`}
													></path>
												</g>
											</svg>
											<span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Songs</span>
										</div>
									</div>
								</NavLink>
							</li>
							{/* Inbox */}
							{/* <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('notifications') && 'bg-slate-900'}`}>
								<NavLink
									end
									to="/notifications"
									className={`block text-slate-200 truncate transition duration-150 ${
										pathname.includes('notifications') ? 'hover:text-slate-200' : 'hover:text-white'
									}`}
								>
									<div className="flex items-center">
										<svg
											className="shrink-0 h-6 w-6"
											viewBox="0 0 24 24"
										>
											<path
												className={`fill-current ${pathname.includes('notifications') ? 'text-indigo-500' : 'text-slate-600'}`}
												d="M16 13v4H8v-4H0l3-9h18l3 9h-8Z"
											/>
											<path
												className={`fill-current ${pathname.includes('notifications') ? 'text-indigo-300' : 'text-slate-400'}`}
												d="m23.72 12 .229.686A.984.984 0 0 1 24 13v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1v-8c0-.107.017-.213.051-.314L.28 12H8v4h8v-4H23.72ZM13 0v7h3l-4 5-4-5h3V0h2Z"
											/>
										</svg>
										<span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Notifications</span>
									</div>
								</NavLink>
							</li> */}
							{/* <SidebarLinkGroup activecondition={pathname === '#' || pathname.includes('#')}>
								{(handleClick, open) => {
									return (
										<React.Fragment>
											<a
												href="#0"
												className={`block text-slate-200 truncate transition duration-150 ${
													pathname === '/' || pathname.includes('dashboard') ? 'hover:text-slate-200' : 'hover:text-white'
												}`}
												onClick={(e) => {
													e.preventDefault();
													sidebarExpanded ? handleClick() : setSidebarExpanded(true);
												}}
											>
												<div className="flex items-center justify-between">
													<div className="flex items-center">
														<svg
															className="shrink-0 h-6 w-6"
															viewBox="0 0 24 24"
														>
															<path
																className={`fill-current ${pathname === '/' || pathname.includes('dashboard') ? 'text-indigo-500' : 'text-slate-400'}`}
																d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0z"
															/>
															<path
																className={`fill-current ${pathname === '/' || pathname.includes('dashboard') ? 'text-indigo-600' : 'text-slate-600'}`}
																d="M12 3c-4.963 0-9 4.037-9 9s4.037 9 9 9 9-4.037 9-9-4.037-9-9-9z"
															/>
															<path
																className={`fill-current ${pathname === '/' || pathname.includes('dashboard') ? 'text-indigo-200' : 'text-slate-400'}`}
																d="M12 15c-1.654 0-3-1.346-3-3 0-.462.113-.894.3-1.285L6 6l4.714 3.301A2.973 2.973 0 0112 9c1.654 0 3 1.346 3 3s-1.346 3-3 3z"
															/>
														</svg>
														<span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
															Dashboard
														</span>
													</div>
													<div className="flex shrink-0 ml-2">
														<svg
															className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${open && 'rotate-180'}`}
															viewBox="0 0 12 12"
														>
															<path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
														</svg>
													</div>
												</div>
											</a>
											<div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
												<ul className={`pl-9 mt-1 ${!open && 'hidden'}`}>
													<li className="mb-1 last:mb-0">
														<NavLink
															end
															to="/"
															className={({ isActive }) =>
																'block transition duration-150 truncate ' + (isActive ? 'text-indigo-500' : 'text-slate-400 hover:text-slate-200')
															}
														>
															<span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Main</span>
														</NavLink>
													</li>
												</ul>
											</div>
										</React.Fragment>
									);
								}}
							</SidebarLinkGroup> */}
						</ul>
					</div>
				</div>

				{/* Expand / collapse button */}
				<div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
					<div className="px-3 py-2">
						<button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
							<span className="sr-only">Expand / collapse sidebar</span>
							<svg
								className="w-6 h-6 fill-current sidebar-expanded:rotate-180"
								viewBox="0 0 24 24"
							>
								<path
									className="text-slate-400"
									d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z"
								/>
								<path
									className="text-slate-600"
									d="M3 23H1V1h2z"
								/>
							</svg>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Sidebar;
