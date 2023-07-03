import React, { useEffect } from 'react';
import useAuth from '../hooks/useAuth.js';
import { useNavigate } from 'react-router-dom';

const PrivateRoute = (Component) => {
	return (props) => {
		const { user, isLoading } = useAuth();
		const navigate = useNavigate();

		useEffect(() => {
			if (!user && !isLoading) {
				navigate('/signin');
			}
		}, [user]);

		if (!user || isLoading) {
			return null;
		}

		return <Component {...props} />;
	};
};

export default PrivateRoute;
