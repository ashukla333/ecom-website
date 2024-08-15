import api from "./config";

// GET METHOD
export const customAxiosGET = async (microservice, url, params = {}) => {
  try {
    const response = await api.get(microservice + url, { params });
    return response.data;
  } catch (error) {
    return {
      message: "Something Went Wrong: " + error.message,
      error: error,
    };
  }
};

// POST METHOD
export const customAxiosPOST = async (microservice, url, data, config) => {
  try {
    const body = data;
    const response = await api.post(microservice + url, body, config);
    return response.data;
  } catch (error) {
    return {
      message: "Something Went Wrong: " + error.message,
      error: error,
    };
  }
};

// PUT METHOD
export const customAxiosPUT = async (microservice, url, data, config) => {
  try {
    const response = await api.put(microservice + url, data, config);
    return response.data;
  } catch (error) {
    return {
      message: "Something Went Wrong: " + error.message,
      error: error,
    };
  }
};

// DELETE METHOD
export const customAxiosDELETE = async (microservice, url, data, config) => {
  try {
    const response = await api.delete(microservice + url, { data, ...config });
    return response.data;
  } catch (error) {
    return {
      message: "Something Went Wrong: " + error.message,
      error: error,
    };
  }
};
