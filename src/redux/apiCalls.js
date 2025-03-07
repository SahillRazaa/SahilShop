import axios from "axios";
import { RegisterFailure, RegisterStart, RegisterSuccess, loginFailure, loginStart, loginSuccess } from "./userRedux"

const login = async(dispatch,user)=>{
    dispatch(loginStart());
    try{
        
        const res = await axios.post("http://localhost:8000/api/auth/login",user);
        
        dispatch(loginSuccess(res.data));
    }catch(err)
    {
        dispatch(loginFailure())
    }
}
const register = async(dispatch,user)=>{
    dispatch(RegisterStart());
    try{
        const res = await axios.post("http://localhost:8000/api/auth/register",user);
        dispatch(RegisterSuccess(res.data));
    }catch(err)
    {
        dispatch(RegisterFailure())
    }
}

export {login,register};