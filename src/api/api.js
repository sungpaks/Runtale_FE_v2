import axios from "axios";

const requestApi = axios.create({
	baseURL: "/api",
	withCredentials: true,
});

export const getUserTier = async ({ userId }) => {
	return await requestApi.get(`/tier/user/${userId}`);
};

export const getUserInfo = async ({ userId }) => {
	return await requestApi.get(`/users/${userId}`);
};

export default requestApi;
