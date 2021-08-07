import axios from "axios";
import { KeyLocalStorage } from "../consts";


export const axiosConfig = () => {
  const getToken = localStorage.getItem(KeyLocalStorage) || '';
  return axios.create({
    timeout: 1000,
    baseURL: 'http://localhost:8000/api/',
    headers: {
      'Authorization': `bearer ${getToken}`
    }
  })
}