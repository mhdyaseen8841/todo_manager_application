const { USER_INSTANCE } = require('./axiosInstance');

// Home route

export async function registerUser(data) {
  try {
    const response = await USER_INSTANCE.post('/', data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function loginUser(data) {
  try {
    const response = await USER_INSTANCE.post('/login', data);
    return response.data;
  } catch (error) {
    throw error;
  }
}




