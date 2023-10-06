import axios from 'axios';


export const login = ({ email, password, role }) => async (dispatch) => {
    const body = {
      email,
      password,
      role
    };
  
    try {
      const res = await axios.post(`${process.env.REACT_APP_URL}api/auth/login`, body, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: res.data,
      });
      return res ;

  
    } catch (err) {
      // Handle the error
      throw err;
    }
  };
  
  export const registerUser = (body) => async (dispatch) => {
  
    try {
      const res = await axios.post(`${process.env.REACT_APP_URL}api/auth/register`, body, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return res ;

  
    } catch (err) {
      // Handle the error
      throw err;
    }
  };

  export const forgotPassword = (email) => async (dispatch) => {
  
    try {
      const res = await axios.post(`${process.env.REACT_APP_URL}api/auth/password/forgot?email=${email}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return res ;

  
    } catch (err) {
      // Handle the error
      throw err;
    }
  };

  export const resetPassword = (body) => async (dispatch) => {
  
    try {
      const res = await axios.post(`${process.env.REACT_APP_URL}api/auth/password/reset`,body, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return res ;

  
    } catch (err) {
      // Handle the error
      throw err;
    }
  };

  export const verifyOTP = (id,otp) => async (dispatch) => {
  
    try {
      const res = await axios.post(`${process.env.REACT_APP_URL}api/auth/otp/verify?user_id=${id}&otp=${otp}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      dispatch({
        type: 'VERIFY_OTP',
        payload: res.data,
      });
      return res ;

  
    } catch (err) {
      // Handle the error
      throw err;
    }
  };
  
  export const resendOTP = (id) => async (dispatch) => {
  
    try {
      const res = await axios.post(`${process.env.REACT_APP_URL}api/auth/otp/resend?user_id=${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return res ;

  
    } catch (err) {
      // Handle the error
      throw err;
    }
  };
  export const logOut = () => (dispatch) => {
      dispatch({
          type: 'LOGOUT_SUUCCESS'
        });
  }

