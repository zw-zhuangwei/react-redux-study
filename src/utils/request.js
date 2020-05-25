/* eslint-disable default-case */

import axios from "axios";
export default class Request {
  static setPromise(method, url, data) {
    return new Promise((resolve, reject) => {
      switch (method.toUpperCase()) {
        case "GET":
          axios
            .get(url, {
              params: data,
            })
            .then((res) => {
              if (res) {
                resolve(res.data);
              } else {
                reject(new Error());
              }
            });
          break;
        case "POST":
        case "PUT":
        case "PATCH":
          axios({
            method: method,
            url: url,
            data: data,
            transformRequest: (data) => {
              let ret = "";
              for (let it in data) {
                ret +=
                  encodeURIComponent(it) +
                  "=" +
                  encodeURIComponent(data[it]) +
                  "&";
              }
              return ret;
            },
          }).then((res) => {
            if (res) {
              resolve(res.data);
            } else {
              reject(new Error());
            }
          });
          break;
        case "DELETE":
          axios
            .delete(url, {
              data: data,
            })
            .then((res) => {
              // 后台已RequestBody接收
              if (res) {
                resolve(res.data);
              } else {
                reject(new Error());
              }
            });
          break;
      }
    });
  }
}
