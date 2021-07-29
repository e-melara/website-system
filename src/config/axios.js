import axios from "axios";
import { KeyLocalStorage } from "../consts";

const getToken = localStorage.getItem(KeyLocalStorage)

export const axiosConfig = axios.create({
  timeout: 1000,
  baseURL: 'http://localhost:8000/api/',
  headers: {
    'Authorization': getToken ? `bearer ${getToken}` : ''
  }
});