import axios from "axios";
import { RegisterFailure, RegisterStart, RegisterSuccess, loginFailure, loginStart, loginSuccess } from "./userRedux"

const login = async(dispatch,user)=>{
    dispatch(loginStart());
    try{
        const res = await axios.post("https://sahilshop-backend.onrender.com/api/auth/login",user);
        
        dispatch(loginSuccess(res.data));
    }catch(err)
    {
        dispatch(loginFailure())
    }
}
const register = async(dispatch,user)=>{
    dispatch(RegisterStart());
    try{
        const res = await axios.post("https://sahilshop-backend.onrender.com/api/auth/register",user);
        dispatch(RegisterSuccess(res.data));
    }catch(err)
    {
        dispatch(RegisterFailure())
    }
}

export {login,register};