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

// -------------PICTURE ACTIONS--------------------

  export const  getPictures = () => async (dispatch) => {
    try{
      const res = await api.get('api/user/upload/pictures')
      dispatch({
        type:'GET_PICTURES',
        payload:res.data
      })
        return res
    }
    catch(err) {
      throw err
    }
  }


  //----------------DOCUMENT ACTIONS--------------------

  export const  getDocuments = () => async (dispatch) => {
    try{
      const res = await api.get('api/user/upload/documents')
      dispatch({
        type:'UPLOAD_PICTURE',
        payload:res.data
      })
        return res
    }
    catch(err) {
      throw err
    }
  }

//---------------SOFTWARE ACTIONS------------------------

export const  getSoftwares = () => async (dispatch) => {
    try{
      const res = await api.get('api/user/upload/software')
      dispatch({
        type:'UPLOAD_PICTURE',
        payload:res.data
      })
        return res
    }
    catch(err) {
      throw err
    }
  }