import React, { useState } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import WelcomeBanner from '../partials/dashboard/WelcomeBanner';
import DashboardAvatars from '../partials/dashboard/DashboardAvatars';
import FilterButton from '../components/DropdownFilter';
import Datepicker from '../components/Datepicker';
import DashboardCard01 from '../partials/dashboard/DashboardCard01';
import DashboardCard02 from '../partials/dashboard/DashboardCard02';
import DashboardCard03 from '../partials/dashboard/DashboardCard03';
import DashboardCard04 from '../partials/dashboard/DashboardCard04';
import DashboardCard05 from '../partials/dashboard/DashboardCard05';
import DashboardCard06 from '../partials/dashboard/DashboardCard06';
import DashboardCard07 from '../partials/dashboard/TopViewsDashBoard';
import DashboardCard08 from '../partials/dashboard/DashboardCard08';
import DashboardCard09 from '../partials/dashboard/DashboardCard09';
import DashboardCard10 from '../partials/dashboard/DashboardCard10';
import DashboardCard11 from '../partials/dashboard/DashboardCard11';
import DashboardCard12 from '../partials/dashboard/DashboardCard12';
import DashboardCard13 from '../partials/dashboard/DashboardCard13';
import Banner from '../partials/Banner';
import CardBox from '../components/CardBox.jsx';
import { BASE_URL } from '../constants/apiEndPoints.js';
import PrivateRoute from '../HOCs/PrivateRoute.jsx';
import TopViewsDashBoard from '../partials/dashboard/TopViewsDashBoard';

function Dashboard() {
	return (
		<>
			<div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
				<WelcomeBanner />

				{/* Cards */}
				<div className="grid grid-cols-12 gap-6">
					<TopViewsDashBoard />
				</div>
			</div>
		</>
	);
}

export default PrivateRoute(Dashboard);
