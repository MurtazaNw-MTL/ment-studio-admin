import axios from "axios";
// const baseUrl = "http://localhost:5000";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGM3YjI1MjUxZTNjYjJlNzhlM2E5ZTkiLCJlbWFpbCI6ImFkbWluMkBnbWFpbC5jb20iLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE2OTA4MDg5MTR9.0ZZVBfKJZgpuqYb5A3AE33ZGsUCK85ngEQd_x5EmR84";
const getHeader = () => {
  const header = {
    Authorization: `Bearer ${token}`
  };
  return header;
};

const baseUrl = process.env.REACT_APP_BASE_URL;

export const BASE_CALL = {
  post: async (url, payload) =>
    await axios.post(baseUrl + url, payload, {
      headers: getHeader()
    }),
  put: async (url, payload) =>
    await axios.put(baseUrl + url, payload, {
      headers: getHeader()
    }),
  get: async (url, params) =>
    await axios.get(baseUrl + url, {
      params,
      headers: getHeader()
    }),
  delete: async (url, payload) =>
    await axios.delete(baseUrl + url, payload, {
      headers: getHeader()
    })
};
