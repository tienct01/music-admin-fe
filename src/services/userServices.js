import { KEYS, endPoint } from '../constants/apiEndPoints.js';
import httpServices from './httpServices.js';

class UserService {
	login({ email, password }) {
		return httpServices.axios.get(`${endPoint.login}`, {
			params: {
				email: email,
				password: password,
			},
		});
	}
	myProfile(id) {
		return httpServices.axios.get(`${endPoint.myProfile}`, {
			params: {
				id: id,
			},
		});
	}
	saveUserToLS(userData) {
		if (typeof localStorage !== 'undefined') {
			localStorage.setItem(KEYS.AUTH, JSON.stringify(userData));
		}
	}
	getUserFromLS() {
		if (typeof localStorage !== 'undefined') {
			const raw = localStorage.getItem(KEYS.AUTH);
			if (!raw) {
				return null;
			}
			const data = JSON.parse(raw);
			return data;
		}
		return null;
	}
	removeUserLS() {
		localStorage.removeItem(KEYS.AUTH);
	}
	getAllUsers() {
		return httpServices.axios.get(`${endPoint.users}`);
	}
}

export default new UserService();
