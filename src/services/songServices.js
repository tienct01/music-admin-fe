import { endPoint } from '../constants/apiEndPoints.js';
import httpServices from './httpServices.js';

class SongService {
	getSongs({ page = 1, limit = 10, query = '' }) {
		return httpServices.axios.get(`${endPoint.songs}`, {
			params: {
				page: page,
				limit: limit,
				q: query,
			},
		});
	}
	getTopViews() {
		return httpServices.axios.get(`${endPoint.collections}/topviews`);
	}
	deleteSongs(id) {
		return httpServices.axios.delete(`${endPoint.songs}/${id}`);
	}
	getGenres() {
		return httpServices.axios.get(`${endPoint.genres}`);
	}
	createSong(formData) {
		return httpServices.axios.post(`${endPoint.songs}`, formData);
	}
}

export default new SongService();
