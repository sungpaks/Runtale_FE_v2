import axios from "axios";
import { USER_API_PREFIX } from "../constants/constants";

const requestApi = axios.create({
	baseURL: "/api",
	withCredentials: true,
});

export default requestApi;
