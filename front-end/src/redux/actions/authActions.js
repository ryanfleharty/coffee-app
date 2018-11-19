import { LOGOUT, REGISTER, REGISTER_FAILURE, LOGIN, LOGIN_FAILURE } from './actionTypes';

export const register = async (dispatch, formData, history) => {
    const response = await fetch(`${process.env.REACT_APP_API_HOST}/api/v1/auth/register`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(formData),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const parsedResponse = await response.json();
    if(parsedResponse.status === 200){
        dispatch({
            type: REGISTER,
            payload: parsedResponse.data.user
        })
        history.push("/");
    }else{
        let message = ""
        if(parsedResponse.data.errmsg.includes("username")){
            message = "That username is taken. Try another!"
        }else if(parsedResponse.data.errmsg.includes("email")){
            message = "That email is already registered."
        }else{
            //SENDING RAW ERROR IS BAD, LETS DO BETTER
            message = parsedResponse.data.errmsg;
        }
        dispatch({
            type: REGISTER_FAILURE,
            payload: message
        })
    }

}

export const login = async (dispatch, formData, history) => {
    const validLogin = await fetch(`${process.env.REACT_APP_API_HOST}/api/v1/auth/login`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(formData),
        headers:{
          'Content-Type': 'application/json'
        }
    })
    const parsedResponse = await validLogin.json()
    if(parsedResponse.status === 200){
        dispatch({
            type: LOGIN,
            payload: parsedResponse.data.user
        })
        history.push("/")
    } else {
        dispatch({
            type: LOGIN_FAILURE
        })
    }
}
export const googleLogin = async(dispatch, data) => {
    console.log("GOOGLE LOGIN COMING IN")
}
export const logout = async (dispatch, history) => {
    await fetch(`${process.env.REACT_APP_API_HOST}/api/v1/auth/logout`, {
      method: "POST",
      credentials: "include"
    })
    dispatch({
        type: LOGOUT
    })
    history.push("/login")
}