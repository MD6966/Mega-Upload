const initialState = {
    isAuthenticated: false,
    token : localStorage.getItem('token'),
}

const authReducer = (state=initialState, action) => {
    switch(action.type) {
        case 'LOGIN_SUCCESS': {
            // console.log(action.payload)
            localStorage.setItem('token', action.payload.data.token);
            return {
                ...state,
                ...action.payload.data,
                token: action.payload.data.token,
                isAuthenticated: true
            };
        };
        case 'VERIFY_OTP': {
            localStorage.setItem('token', action.payload.data.token);
            return {
                ...state,
                ...action.payload.data,
                token: action.payload.data.token,
                isAuthenticated: true
            };
        };
        case 'LOGOUT_SUUCCESS' : {
            localStorage.removeItem('token')
            return {
                token: null,
                isAuthenticated: false,
              };
        };
        default :  return state
        
    }
}

export default authReducer