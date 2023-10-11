import { combineReducers } from "@reduxjs/toolkit";
import adminReducer from './adminReducers'
import authReducer from './authReducers'
import timerReducer from "./timerReducers";
const rootReducer = combineReducers({
    admin: adminReducer,
    auth: authReducer,
    timer:timerReducer,

    
})

export default rootReducer