import { getCookies } from "cookies-next";

// login
export const AuthToken = getCookies("AuthToken");
export const loginApi = "/users/login";
export const signUpApi = "/users/addUser";
export const getUserApi = "/users/MyprofileDetail";
export const logOutUserApi = "/users/logOut";

// category
export const createCategoryApi = "/v1/category/createCategory";
export const getCategoryApi = "/v1/category/getCategory";
export const getCategoryByIdApi = (id) => `/v1/category/getCategoryByID/${id}`;
export const categoryApi = (id) => `/v1/category/${id}`;
