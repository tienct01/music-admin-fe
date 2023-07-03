import React from 'react';
import PrivateRoute from '../HOCs/PrivateRoute.jsx';
import CardBox from '../components/CardBox.jsx';
import CustomTable from '../components/Table/CustomTable.jsx';
import userServices from '../services/userServices.js';
import { useQuery } from 'react-query';

const UserPage = () => {
	const { data } = useQuery('users', () => userServices.getAllUsers());
	return (
		<>
			<div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
				<div className="grid grid-cols-12 gap-6">
					<CardBox col={12}>
						<div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
							<header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
								<h2 className="font-semibold text-slate-800 dark:text-slate-100">Users</h2>
							</header>
							<div className="p-3">
								<CustomTable
									thead={
										<tr>
											<th className="p-2">
												<div className="font-semibold text-left">Id</div>
											</th>
											<th className="p-2">
												<div className="font-semibold text-center">Name</div>
											</th>
											<th className="p-2">
												<div className="font-semibold text-center">Email</div>
											</th>
											<th className="p-2">
												<div className="font-semibold text-center">Role</div>
											</th>
											<th className="p-2">
												<div className="font-semibold text-center">Created At</div>
											</th>
										</tr>
									}
									tbody={
										<>
											{data?.data?.data.map((user) => {
												return (
													<tr key={user._id}>
														<td className="p-2">
															<div className="text-slate-800 dark:text-slate-100">{user?._id}</div>
														</td>
														<td className="p-2">
															<div className="text-slate-800 dark:text-slate-100">{user?.name}</div>
														</td>
														<td className="p-2">
															<div className="text-center">{user?.email}</div>
														</td>
														<td className="p-2">
															<div className="text-center text-emerald-500">{user?.role === 1 ? 'Admin' : 'User'}</div>
														</td>
														<td className="p-2">
															<div className="text-center">{new Date(user?.createdAt).toLocaleDateString('vi-vn')}</div>
														</td>
													</tr>
												);
											})}
										</>
									}
								/>
							</div>
						</div>
					</CardBox>
				</div>
			</div>
		</>
	);
};

export default PrivateRoute(UserPage);
