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


// brand
export const createBrandApi = "/v1/brand/createBrand";
export const getBrandApi = "/v1/brand/getBrand";
export const getBrandByIdApi = (id) => `/v1/brand/getBrandByID/${id}`;
export const brandApi = (id) => `/v1/brand/${id}`;


//product
export const createProductApi = "/v1/product/createProduct";
export const getproductApi = "/v1/product/getproduct";
export const getproductByIdApi = (id) => `/v1/product/${id}`;
export const getProductByCategoryIdApi = (id) => `/v1/product/ProductByCategoryId/${id}`;
export const productApi = (id) => `/v1/product/${id}`;




