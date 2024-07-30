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

export const getRunningRecord = async ({ userId }) => {
	return await requestApi.get(`/running/user/${userId}`);
};

export const getRunningRecordMonthly = async ({ userId }) => {
	return await requestApi.get(`/running/user/${userId}/monthly`);
};

/**
 *
 * @param {id?: 러닝ID(처음엔 X), endTime?: 끝난시각(마지막에만), distance: 누적 거리, pace: 누적 페이스} requestBody
 * @returns
 */
export const postRunning = async (requestBody) => {
	return await requestApi.post(`/running`, requestBody);
};

export const getRunning = async ({ id }) => {
	return await requestApi.post(`/running/${id}`);
};

export default requestApi;
