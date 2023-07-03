import React from 'react';
import CardBox from '../components/CardBox.jsx';
import { useForm } from '@mantine/form';
import { useMutation, useQuery } from 'react-query';
import songServices from '../services/songServices.js';
import { notifications } from '@mantine/notifications';
import { useNavigate } from 'react-router-dom';
import { Loader } from '@mantine/core';

const CreateSong = () => {
	const form = useForm({
		initialValues: {
			name: '',
			genre: '',
			audio: null,
			thumbnail: null,
		},
	});
	const navigate = useNavigate();
	const { data: genreRes } = useQuery('genres', () => songServices.getGenres());
	const createSong = useMutation((formData) => songServices.createSong(formData));

	const handleSubmit = (data) => {
		console.log('data', data);
		let formData = new FormData();
		formData.append('name', data.name);
		formData.append('genreId', data.genre);
		formData.append('audio', data.audio);
		formData.append('thumbnail', data.thumbnail);
		createSong.mutate(formData, {
			onSuccess: (data) => {
				notifications.show({
					color: 'green',
					title: 'Success',
				});
				navigate('/songs');
			},
			onError: (err) => {
				notifications.show({
					color: 'red',
					title: 'Something has broken',
				});
			},
		});
	};
	return (
		<div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
			<div className="grid grid-cols-12 gap-6">
				<CardBox col={12}>
					<div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
						<header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
							<h2 className="font-semibold text-slate-800 dark:text-slate-100">Create Songs</h2>
						</header>
					</div>

					{/* Form create */}
					<form
						className="p-3"
						onSubmit={form.onSubmit(handleSubmit)}
					>
						<div className="grid gap-6 mb-6 md:grid-cols-2">
							<div>
								<label
									htmlFor="first_name"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Name
								</label>
								<input
									type="text"
									id="first_name"
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder="Name song"
									{...form.getInputProps('name')}
								/>
							</div>
							<div>
								<label
									htmlFor="countries"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Select an genre
								</label>
								<select
									id="countries"
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									{...form.getInputProps('genre')}
								>
									{genreRes?.data?.data?.map((genre, index) => {
										return (
											<option
												key={genre._id}
												value={genre._id}
												defaultChecked={index === 0}
											>
												{genre.genreName}
											</option>
										);
									})}
								</select>
							</div>
						</div>
						<div className="mb-6">
							<>
								<label
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									htmlFor="file_input"
								>
									Upload audio
								</label>
								<input
									className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
									id="file_input"
									type="file"
									accept="audio/*"
									onChange={(e) => form.setFieldValue('audio', e.target.files[0])}
								/>
							</>
						</div>
						<div className="mb-6">
							<>
								<label
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									htmlFor="file_input"
								>
									Upload thumbnail
								</label>
								<input
									className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
									id="file_input"
									type="file"
									accept="image/*"
									onChange={(e) => form.setFieldValue('thumbnail', e.target.files[0])}
								/>
							</>
						</div>
						<button
							type="submit"
							className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
							disabled={createSong.isLoading}
						>
							{createSong.isLoading ? <Loader /> : 'Create Song'}
						</button>
					</form>
				</CardBox>
			</div>
		</div>
	);
};

export default CreateSong;
