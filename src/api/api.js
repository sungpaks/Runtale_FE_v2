import axios from "axios";

const requestApi = axios.create({
	baseURL: "/api",
	withCredentials: true,
});

export const getUserTier = async ({ userId }) => {
	return await requestApi.get(`/tier/user/${userId}`);
};

export default requestApi;
