import { getCookies } from "cookies-next"

// login
export const AuthToken=getCookies('AuthToken')
export const loginApi='/users/login'
export const signUpApi='/users/addUser'
export const getUserApi='/users/MyprofileDetail'
export const logOutUserApi='/users/logOut'
