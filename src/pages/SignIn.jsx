import { useToggle } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import userServices from '../services/userServices.js';
import useAuth from '../hooks/useAuth.js';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';

export function SignInPage(props) {
	const navigate = useNavigate();
	const { user, saveUser } = useAuth();
	const form = useForm({
		initialValues: {
			email: '',
			password: '',
		},

		validate: {
			email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
			password: (val) => (val.length < 6 ? 'Password should include at least 6 characters' : null),
		},
	});

	const login = useMutation(({ email, password }) => userServices.login({ email, password }));
	const handleSubmit = (data) => {
		login.mutate(data, {
			onSuccess: (res) => {
				saveUser({
					user: res.data?.user,
					accessToken: res.data?.accessToken,
				});
			},
			onError: (res) => {
				const message = res.response?.data?.message;
				switch (message) {
					case 'Password wrong': {
						form.setFieldError('password', message);
						break;
					}
					case "Account doesn't exist": {
						form.setFieldError('email', message);
						break;
					}
					default: {
						form.setFieldError('email', 'Your input is invalid');
						break;
					}
				}
			},
		});
	};

	useEffect(() => {
		if (user) {
			navigate('/');
		}
	}, [user]);

	if (user) {
		return null;
	}

	return (
		<section className="bg-gray-50 dark:bg-gray-900">
			<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
				<a
					href="#"
					className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
				>
					<img
						className="w-8 h-8 mr-2"
						src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
						alt="logo"
					/>
					Music Admin
				</a>
				<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
					<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
						<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Sign in to your account</h1>
						<form
							className="space-y-4 md:space-y-6"
							onSubmit={form.onSubmit(handleSubmit)}
						>
							<div>
								<label
									htmlFor="email"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Your email
								</label>
								<input
									name="email"
									id="email"
									className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder="name@company.com"
									{...form.getInputProps('email')}
								/>
								<div className="text-red-600 text-sm">{form.errors?.email}</div>
							</div>
							<div>
								<label
									htmlFor="password"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Password
								</label>
								<input
									type="password"
									name="password"
									id="password"
									placeholder="••••••••"
									className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									{...form.getInputProps('password')}
								/>
								<div className="text-red-600 text-sm">{form.errors?.password}</div>
							</div>
							<button
								type="submit"
								className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-blue-800"
								disabled={login.isLoading}
							>
								Sign in
							</button>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}
