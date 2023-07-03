export const BASE_URL = import.meta.env.VITE_BASE_URL;
export const endPoint = {
	login: `${BASE_URL}/login`,
	myProfile: `${BASE_URL}/my_profile`,
	users: `${BASE_URL}/users`,
	songs: `${BASE_URL}/songs`,
	collections: `${BASE_URL}/collections`,
	genres: `${BASE_URL}/genres`,
};
export const KEYS = {
	AUTH: 'AUTH',
};
