import React, { createContext, useEffect, useState } from 'react';
import httpServices from '../services/httpServices.js';
import userServices from '../services/userServices.js';
import { notifications } from '@mantine/notifications';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext({
	user: null,
});

const AuthProvider = ({ children }) => {
	const navigate = useNavigate();
	const [user, setUser] = useState(null);
	const [accessToken, setAccessToken] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	const saveUser = async (userData) => {
		try {
			const res = await userServices.myProfile(userData?.user?._id);
			if (res.data?.data?.role === 1) {
				setUser(userData?.user);
				setAccessToken(userData?.accessToken);
				httpServices.attachTokenToHeader(userData?.accessToken);
				userServices.saveUserToLS(userData);
			} else {
				notifications.show({
					title: 'Forbidden',
					message: 'You are not the admin',
					autoClose: 3000,
				});
			}
		} catch (error) {
			console.log(error);
		}
	};

	const removeUser = () => {
		setUser(null);
		setAccessToken(null);
		userServices.removeUserLS();
	};

	useEffect(() => {
		async function getData() {
			const data = userServices.getUserFromLS();
			if (data) {
				try {
					const res = await userServices.myProfile(data?.user?._id);
					if (res.data?.data?.role === 1) {
						setUser(data?.user);
						setAccessToken(data?.accessToken);
						httpServices.attachTokenToHeader(data?.accessToken);
					} else {
						notifications.show({
							title: 'Forbidden',
							message: 'You are not the admin',
							autoClose: 3000,
						});
						navigate('/login', { replace: true });
					}
				} catch (error) {
					console.log(error);
				}
			}
		}
		getData();
		setIsLoading(false);
	}, []);

	const value = {
		user,
		accessToken,
		saveUser,
		removeUser,
		isLoading,
	};
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
