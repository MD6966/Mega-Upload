const initialState = {
    isAuthenticatedAdmin: false,
    token : localStorage.getItem('token'),
    admin: null
}

const adminReducer = (state=initialState, action) => {
    switch(action.type) {
        case 'LOGIN_SUCCESS_ADMIN': {
            // console.log(action.payload.data.user, '+++++++++++')
            localStorage.setItem('token', action.payload.data.token);
            return {
                ...state,
                ...action.payload.data,
                token: action.payload.data.token,
                admin:action.payload.data.user,
                isAuthenticatedAdmin: true
            };
            
        };
        case 'LOGOUT_SUUCCESS_ADMIN' : {
            localStorage.removeItem('token')
            return {
                token: null,
                isAuthenticated: false,
                admin:null,
              };
        };
        default :  return state
        
    }
}

export default adminReducer