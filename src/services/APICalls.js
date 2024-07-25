import { BASE_CALL } from "./baseCall";
const BASE = {
  USER: "/user/v1/admin",
  PRODUCT: "/product/v1",
  CATEGORY: "/product/v1/category"
};

export const CALL_API = {
  USERS: {
    get: async (params) => await BASE_CALL.get(BASE.USER + "/all", params),
    block: async (payload) =>
      await BASE_CALL.put(BASE.USER + "/block", payload),
    verify: async (payload) =>
      await BASE_CALL.put(BASE.USER + "/verify", payload)
  },

  CATEGORY: {
    get: async (params) => await BASE_CALL.get(BASE.CATEGORY + "/get", params),
    create: async (payload) =>
      await BASE_CALL.post(BASE.CATEGORY + "/create", payload),
    put: async (payload) =>
      await BASE_CALL.put(BASE.CATEGORY + "/update", payload)
  },
  PRODUCT: {
    get: async (params) =>
      await BASE_CALL.get(BASE.PRODUCT + "/get-admin", params),
    create: async (payload) =>
      await BASE_CALL.post(BASE.PRODUCT + "/create", payload),
    put: async (payload) =>
      await BASE_CALL.put(BASE.PRODUCT + "/update", payload),
    verify: async (payload) =>
      await BASE_CALL.put(
        BASE.PRODUCT + "/admin/verify-product/" + payload._id,
        payload
      )
  }
};
