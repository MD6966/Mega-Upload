import axios from 'axios';

export const adminLogin = ({ email, password, role }) => async (dispatch) => {
    const body = {
      email,
      password,
      role
    };
  
    try {
      const res = await axios.post(`${process.env.REACT_APP_URL}api/auth/admin/login`, body, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      dispatch({
        type: 'LOGIN_SUCCESS_ADMIN',
        payload: res.data,
      });
      return res ;

  
    } catch (err) {
      // Handle the error
      throw err;
    }
  };