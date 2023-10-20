import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_URL,
});

const getToken = () => {
  return localStorage.getItem('token');
};

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const  editProfileDetails = (id,body) => async (dispatch) => {
    try{
      const res = await api.put(`api/user/profile/${id}`, body)
      dispatch({
        type:'UPDATE_PROFILE_DETAILS',
        payload:res.data
      })
        return res
    }
    catch(err) {
      throw err
    }
  }
