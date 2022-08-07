/* eslint-disable indent */
import * as axios from 'axios';
// import config from 'config';
import { APP_CONFIG } from 'utils/constants';
import { history } from 'utils/history';
import { notification } from 'antd';
import JWT from 'utils/jwt';
import { KEY } from 'commons/_store/constants';
// import { toast } from 'react-toastify';

const DEFAULT_HEADERS = {
	'Content-Type': 'application/json'
}
axios.defaults.credentials = 'include';

class HttpService {
  constructor() {
    // Set Header Auth for all APi
  }

  configRequest(multipart = false) {
    let defaultHeaders = DEFAULT_HEADERS;
    if (multipart) {defaultHeaders = {} }
    // console.log(JWT.getAccessToken(), 'token config request');
    if (JWT.getAccessToken()) {
      defaultHeaders = {
				'Authorization': `Bearer ${JWT.getAccessToken()}`,
				Accept: 'application/json',
				Cache: 'no-cache',
				common: {
					'X-Requested-With': 'XMLHttpRequest',
				},
				...defaultHeaders
			}
    }
    return {
      headers: defaultHeaders,
    };
  }

  querySearch(params) {
    return Object.keys(params)
      .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
      .join('&');
  }

  get(apiEndpoint, params = {}) {
    if (Object.keys(params).length > 0) {
      apiEndpoint = `${apiEndpoint}?${this.querySearch(params)}`;
    }
    return axios
      .get(APP_CONFIG.apiUrl + apiEndpoint, this.configRequest())
      .then(
        (res) => {
          if (res.data && res.data.status === KEY.FAILED) {
            this.hanleErorr(res.data.errors);
          }
          return res;
        },
        (err) => {
          this.hanleErorr(err.response);
        }
      );
  }

  post(apiEndpoint, payload) {
    return axios
      .post(APP_CONFIG.apiUrl + apiEndpoint, payload, this.configRequest())
      .then(
        (res) => {
          if (res.data && res.data.status === KEY.FAILED) {
            this.hanleErorr(res.data.errors);
          }
          return res;
        },
        (err) => {
          this.hanleErorr(err.response);
        }
      );
  }

  put(apiEndpoint, payload) {
    return axios
      .put(APP_CONFIG.apiUrl + apiEndpoint, payload, this.configRequest())
      .then(
        (res) => {
          if (res.data && res.data.status === KEY.FAILED) {
            this.hanleErorr(res.data.errors);
          }
          return res;
        },
        (err) => {
          this.hanleErorr(err.response);
        }
      );
  }

  delete(apiEndpoint) {
    return axios
      .delete(APP_CONFIG.apiUrl + apiEndpoint, this.configRequest())
      .then(
        (res) => {
          if (res.data && res.data.status === KEY.FAILED) {
            this.hanleErorr(res.data.errors);
          }
          return res;
        },
        (err) => {
          this.hanleErorr(err.response);
        }
      );
  }

  async uploadFile(apiEndpoint, fileData, isMap = false) {
    // if (!this.errorAuth) {
      if (fileData) {
        let formData = fileData;
        if (!isMap) {
          formData = await this.mapFilePayload(fileData);
        }
        if (formData) {
          return axios
            .post(
              APP_CONFIG.apiUrl + apiEndpoint,
              formData,
              this.configRequest(true)
            )
            .then(
              (res) => {
                if (res.data && res.data.status === KEY.FAILED) {
                  this.handleErorr(res.data.errors);
                }
                return res;
              },
              (err) => {
                this.handleErorr(err.response);
              }
            );
        }
      } else {
        this.showNotiAlert('Bạn chưa chọn file để tải lên');
      }
    // } else {
    //   return false;
    // }
  }

  mapFilePayload(data) {
    let formData = new FormData();
    Object.keys(data).map(function (key) {
      formData.append(key, data[key]);
    });
    return formData;
  }

  async hanleErorr(err) {
    let txtErr = '';
    if (!err) {
      notification['error']({
        message: 'Có lỗi xảy ra',
        description: txtErr,
      });
    }
    switch (err.status) {
      case 401:
        await JWT.destroyLogged();
        JWT.saveAuth(null);
        // console.log(JWT.getAccessToken(), 'token 401');
        history.push('/login');
        // Cho phép di tới location '/login'
        break;
      case 403:
        history.push('/');
        break;
      default:
        // console.log('Error has occurred');
        break;
    }
   
    if (Array.isArray(err) && err.length > 0) {
      err.map((item) => (txtErr += item.message));
    } else {
      txtErr = err.data.message ? err.data.message : 'Error has occurred';
    }
    notification['error']({
      message: 'Có lỗi xảy ra',
      description: txtErr,
    });
  }
}
export default new HttpService();
