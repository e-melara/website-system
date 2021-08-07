import axios from "axios";
import { KeyLocalStorage, BaseUrl } from "../consts";

class DBConnection {
  // para la instancia de singleton
  static instance;
  // para la configuracion de axios
  axiosConfig;
  base_url;
  urlLogin;

  constructor(baseUrl = "", urlLogin = "auth/login") {
    if (!!DBConnection.instance) {
      return DBConnection.instance;
    }
    this.instance = this;
    this.base_url = baseUrl;
    this.urlLogin = urlLogin;
    this.axiosConfig = axios.create({
      timeout: 1000,
      baseURL: this.base_url,
    });
    this.addHeaderAuthorization();
  }

  async login(username, password) {
    return new Promise(async (resolve, reject) => {
      try {
        const { token, carrera, usuario } = await this.post(this.urlLogin, {
          username,
          password,
        });
        localStorage.setItem(KeyLocalStorage, token);
        resolve({
          carrera,
          usuario,
        });
      } catch (error) {
        reject({
          error,
        });
      }
    });
  }

  addHeaderAuthorization() {
    const token = localStorage.getItem(KeyLocalStorage) || "";
    console.log(token, "LLamado desde el addHeaderAuthorization");
    this.axiosConfig.defaults.headers.common[
      "Authorization"
    ] = `bearer ${token}`;
  }

  errorCallback(error, callback) {
    if (error.response) {
      const { data, status } = error.response;
      callback({
        data,
        status: status,
      });
    } else if (error.request) {
      const { status, responseText } = error.request;
      callback(
        callback({
          data: responseText,
          status: status,
        })
      );
    } else {
      callback({
        status: 400,
        data: error.message,
      });
    }
  }

  get(url = "") {
    return new Promise((resolve, reject) => {
      this.axiosConfig
        .get(url)
        .then((response) => resolve(response.data))
        .catch((error) => {
          this.errorCallback(error, (err) => {
            reject(err);
          });
        });
    });
  }

  post(url = "", data) {
    return new Promise((resolve, reject) => {
      this.axiosConfig
        .post(url, data)
        .then((response) => resolve(response.data))
        .catch((error) => {
          this.errorCallback(error, (err) => {
            reject(err);
          });
        });
    });
  }

  morePromise(promises) {
    return Promise.all([...promises]);
  }
}

export default Object.freeze(new DBConnection(BaseUrl));
