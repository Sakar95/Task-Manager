import { combineReducers } from "redux";
import authReducer from "../slices/authSlice";
import profileReducer from "../slices/profileSlice"
import taskReducer from "../slices/taskSlice"



const rootReducer = combineReducers({
    auth:authReducer,
    profile: profileReducer,
    tasks: taskReducer,
})

export default rootReducer;