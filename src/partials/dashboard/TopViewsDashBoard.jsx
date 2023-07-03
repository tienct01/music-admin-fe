import React from 'react';
import CustomTable from '../../components/Table/CustomTable.jsx';
import { useQuery } from 'react-query';
import songServices from '../../services/songServices.js';
import { Loader } from '@mantine/core';

function TopViewsDashBoard() {
	const { data, isFetching, isLoading } = useQuery('topviews', () => songServices.getTopViews());

	return (
		<div className="col-span-full bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
			<header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
				<h2 className="font-semibold text-slate-800 dark:text-slate-100">Top Views Song</h2>
			</header>
			<div className="p-3">
				{/* Table */}
				<CustomTable
					thead={
						<>
							<tr>
								<th className="p-2">
									<div className="font-semibold text-left">Song</div>
								</th>
								<th className="p-2">
									<div className="font-semibold text-center">Artist</div>
								</th>
								<th className="p-2">
									<div className="font-semibold text-center">Views</div>
								</th>
								<th className="p-2">
									<div className="font-semibold text-center">Created At</div>
								</th>
							</tr>
						</>
					}
					tbody={
						isLoading ? (
							<tr>
								<td
									colSpan={4}
									className="text-center py-6"
								>
									<Loader width={'100%'} />
								</td>
							</tr>
						) : (
							<>
								{data?.data?.data?.map((song) => {
									return (
										<tr key={song._id}>
											<td className="p-2">
												<div className="flex items-center">
													<img
														width={36}
														height={36}
														className="shrink-0 mr-2 sm:mr-3"
														style={{
															width: 36,
															height: 36,
														}}
														src={song?.thumbnail?.url}
													/>
													<div className="text-slate-800 dark:text-slate-100">{song?.name}</div>
												</div>
											</td>
											<td className="p-2">
												<div className="text-center">{song?.artist?.name}</div>
											</td>
											<td className="p-2">
												<div className="text-center text-emerald-500">{song?.views}</div>
											</td>
											<td className="p-2">
												<div className="text-center text-sky-500">{new Date(song?.createdAt).toLocaleDateString('vi-vn')}</div>
											</td>
										</tr>
									);
								})}
							</>
						)
					}
				/>
			</div>
		</div>
	);
}

export default TopViewsDashBoard;
