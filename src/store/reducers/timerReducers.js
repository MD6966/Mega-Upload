
const initialState = {
    remainingTime: 0,
    resendDisabled: false,
    resendAttempts: 0,
  };
  
  const timerReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'UPDATE_TIMER':
        return {
          ...state,
          remainingTime: action.remainingTime,
        };
      case 'UPDATE_RESEND':
        return {
          ...state,
          resendDisabled: action.resendDisabled,
          resendAttempts: action.resendAttempts,
        };
      default:
        return state;
    }
  };
  
  export default timerReducer;
  