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

  export const  delPicture = (id) => async (dispatch) => {
    try{
      const res = await api.delete(`api/user/upload/pictures/${id}`)
      dispatch({
        type:'DEL_PICTURE',
        payload:res.data
      })
        return res
    }
    catch(err) {
      throw err
    }
  }

  export const  editPicDetails = (id,name,desc) => async (dispatch) => {
    try{
      const res = await api.put(`api/user/upload/pictures/${id}?name=${name}&description=${desc}`)
      dispatch({
        type:'UPDATE_PICTURE_DETAILS',
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

  export const  delDocument = (id) => async (dispatch) => {
    try{
      const res = await api.delete(`api/user/upload/documents/${id}`)
      dispatch({
        type:'DEL_PICTURE',
        payload:res.data
      })
        return res
    }
    catch(err) {
      throw err
    }
  }

  export const  editDocDetails = (id,name,desc) => async (dispatch) => {
    try{
      const res = await api.put(`api/user/upload/documents/${id}?name=${name}&description=${desc}`)
      dispatch({
        type:'UPDATE_DOC_DETAILS',
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

  export const  delSoftware = (id) => async (dispatch) => {
    try{
      const res = await api.delete(`api/user/upload/software/${id}`)
      dispatch({
        type:'DEL_PICTURE',
        payload:res.data
      })
        return res
    }
    catch(err) {
      throw err
    }
  }

  export const  editSwDetails = (id,name,desc) => async (dispatch) => {
    try{
      const res = await api.put(`api/user/upload/software/${id}?name=${name}&description=${desc}`)
      dispatch({
        type:'UPDATE_DOC_DETAILS',
        payload:res.data
      })
        return res
    }
    catch(err) {
      throw err
    }
  }