/*eslint-disable */
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api/',
  timeout: 120000,
});

axiosInstance.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
axiosInstance.interceptors.response.use(function (response) {
  // Do something with response data
  return response;
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});

class HttpRequest {
  constructor (path) {
    this.basepath = path;
    this.axios = axios;
  }

  setHeader (header) {
    axiosInstance.defaults.headers.common[header.key] = header.value;
    axiosInstance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  }

  existHeader (key) {
    return axiosInstance.defaults.headers.common[key]
  }

  fetch (methodName, data) {
    return axiosInstance.get(this.basepath + '/' + methodName, {
      params: data,
    });
  }

  create (methodName, data) {
    return axiosInstance.post(this.basepath + '/' + methodName, data);
  }

  update (methodName, data) {
    return axiosInstance.put(this.basepath + '/' + methodName, data);
  }

  delete (methodName, id) {
    return axiosInstance.delete(this.basepath + '/' + methodName, { params: { id: id } });
  }

  request (type, url, data) {
    let promise = null
    switch (type) {
      case 'GET': promise = axios.get(url, { params: data }); break
      case 'POST': promise = axios.post(url, data); break
      case 'PUT': promise = axios.put(url, data); break
      case 'DELETE': promise = axios.delete(url, data); break
      default : promise = axios.get(url, { params: data }); break
    }
    return promise
  }
}

export default HttpRequest
