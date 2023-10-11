// timerActions.js

export const updateTimer = (remainingTime) => {
    return {
      type: 'UPDATE_TIMER',
      remainingTime,
    };
  };
  
  export const updateResend = (resendDisabled, resendAttempts) => {
    return {
      type: 'UPDATE_RESEND',
      resendDisabled,
      resendAttempts,
    };
  };
  