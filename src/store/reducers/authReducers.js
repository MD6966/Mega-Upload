const initialState = {
    isAuthenticated: false,
    token : localStorage.getItem('token'),
    user: null
}

const authReducer = (state=initialState, action) => {
    switch(action.type) {
        case 'LOGIN_SUCCESS': {
            // console.log(action.payload.data.user, '+++++++++++')
            localStorage.setItem('token', action.payload.data.token);
            return {
                ...state,
                ...action.payload.data,
                token: action.payload.data.token,
                user:action.payload.data.user,
                isAuthenticated: true
            };
        };
        case 'VERIFY_OTP': {
            localStorage.setItem('token', action.payload.data.token);
            return {
                ...state,
                ...action.payload.data,
                token: action.payload.data.token,
                user:action.payload.data.user,
                isAuthenticated: true
            };
        };
        case 'LOGOUT_SUUCCESS' : {
            localStorage.removeItem('token')
            return {
                token: null,
                isAuthenticated: false,
                user:null,
              };
        };
        default :  return state
        
    }
}

export default authReducer