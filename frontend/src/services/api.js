import axios from "axios";
import { API_URL } from "../constants/apiConstants";

const $api = axios.create({
  baseURL: API_URL,
});

export default $api;
