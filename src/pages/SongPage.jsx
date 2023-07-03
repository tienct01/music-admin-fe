import React, { useEffect, useState } from 'react';
import PrivateRoute from '../HOCs/PrivateRoute.jsx';
import { Button, Loader, Pagination } from '@mantine/core';
import songServices from '../services/songServices.js';
import CardBox from '../components/CardBox.jsx';
import CustomTable from '../components/Table/CustomTable.jsx';
import { useMutation, useQuery } from 'react-query';
import { notifications } from '@mantine/notifications';
import { modals } from '@mantine/modals';
import SearchBox from '../components/SearchBox.jsx';
import AddIcon from '../components/Icons/AddIcon.jsx';
import { useNavigate } from 'react-router-dom';

const SongPage = () => {
	const [page, setPage] = useState(1);
	const [query, setQuery] = useState('');
	const navigate = useNavigate();
	const [result, setResult] = useState({
		totalPage: 0,
		songs: [],
	});
	const { totalPage, songs } = result;

	const { isRefetching, refetch, isLoading } = useQuery('songs', () => songServices.getSongs({ page, query }), {
		onSuccess: (data) => {
			setResult({
				totalPage: data?.data?.totalPage,
				songs: data?.data?.data,
			});
		},
		enabled: true,
	});

	const deleteSong = useMutation((id) => songServices.deleteSongs(id));

	const handleDeleteSong = (id) => {
		deleteSong.mutate(id, {
			onSuccess: (res) => {
				notifications.show({
					message: 'Success',
					color: 'green',
				});
				refetch();
			},
			onError: (err) => {
				notifications.show({
					message: 'Some thing has broken',
					color: 'red',
				});
			},
		});
	};

	const openModal = (id) =>
		modals.openConfirmModal({
			title: 'Do you want to delete this song ?',
			labels: { confirm: 'Confirm', cancel: 'Cancel' },
			onCancel: () => console.log('Cancel'),
			onConfirm: () => handleDeleteSong(id),
		});

	const handleSearchSubmit = () => {
		refetch();
	};
	useEffect(() => {
		refetch();
	}, [page]);
	console.log('songs', result);
	return (
		<div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
			<div className="pb-3 flex justify-between items-center">
				<Button
					variant="outline"
					leftIcon={
						<AddIcon
							width={30}
							height={30}
							fill="#228be6"
						/>
					}
					onClick={() => navigate('/songs/new')}
				>
					Upload Song
				</Button>
				<SearchBox
					handleChange={(value) => setQuery(value)}
					searchInput={query}
					handleSubmit={handleSearchSubmit}
				/>
			</div>
			<div className="grid grid-cols-12 gap-6">
				<CardBox col={12}>
					<div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
						<header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
							<h2 className="font-semibold text-slate-800 dark:text-slate-100">Songs</h2>
						</header>
						<div className="p-3">
							<CustomTable
								thead={
									<tr>
										<th className="p-2">
											<div className="font-semibold text-left">Name</div>
										</th>
										<th className="p-2">
											<div className="font-semibold text-center">Artist</div>
										</th>
										<th className="p-2">
											<div className="font-semibold text-center">Audio</div>
										</th>
										<th className="p-2">
											<div className="font-semibold text-center">Views</div>
										</th>
										<th className="p-2">
											<div className="font-semibold text-center">Created At</div>
										</th>
										<th className="p-2">
											<div className="font-semibold text-center"> </div>
										</th>
									</tr>
								}
								tbody={
									<>
										{isRefetching || isLoading ? (
											<tr>
												<td
													className="py-6"
													colSpan={6}
												>
													<Loader width={'100%'} />
												</td>
											</tr>
										) : (
											<>
												{songs.map((song) => {
													return (
														<tr key={song._id}>
															<td className="p-2 flex items-center">
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
															</td>
															<td className="p-2">
																<div className="text-center">{song?.artist?.name}</div>
															</td>
															<td className="p-2">
																<div className="flex items-center">
																	<audio
																		controls
																		src={song?.audio?.url}
																	/>
																</div>
															</td>
															<td className="p-2">
																<div className="text-center text-emerald-600">{song?.views}</div>
															</td>
															<td className="p-2">
																<div className="text-center">{new Date(song?.createdAt).toLocaleDateString('vi-vn')}</div>
															</td>
															<td className="p-2">
																<div className="text-center">
																	<Button
																		variant="outline"
																		onClick={() => openModal(song?._id)}
																	>
																		Delete
																	</Button>
																</div>
															</td>
														</tr>
													);
												})}
											</>
										)}
									</>
								}
							/>
						</div>
						<div className="flex justify-center items-center py-3">
							<Pagination
								total={totalPage}
								onChange={(page) => setPage(page)}
							/>
						</div>
					</div>
				</CardBox>
			</div>
		</div>
	);
};

export default PrivateRoute(SongPage);
