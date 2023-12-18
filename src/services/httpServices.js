import axios from 'axios';

class HttpServices {
	constructor() {
		this.axios = axios;
	}
	attachTokenToHeader(token) {
		// Add a request interceptor
		this.axios.interceptors.request.use(
			function (config) {
				// Do something before request is sent
				config.headers['Authorization'] = 'Bearer ' + token;
				return config;
			},
			function (error) {
				// Do something with request error
				return Promise.reject(error);
			}
		);
	}
}

export default new HttpServices();
