import * as ApiSessionUtil from "../utils/api_session_util.js";

export const RECEIVE_USER = "RECEIVE_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const RECEIVE_ERRORS = "RECEIVE_ERRORS";
export const REMOVE_ERRORS = "REMOVE_ERRORS";

const receieveUser = (user) => ({
  type: RECEIVE_USER,
  user: user
})

const logoutUser = () => ({
  type: LOGOUT_USER
})

const receiveErrors = (errors) => ({
  type: RECEIVE_ERRORS,
  errors: errors
})

const removeErrors = () => ({
  type: REMOVE_ERRORS
})

export const signup = (user) => dispatch => {
  return ApiSessionUtil.signup(user)
    .then(user => dispatch(receieveUser(user)))
    .fail(errors => dispatch(receiveErrors(errors)))
}

export const login = (user) => dispatch => {
  return ApiSessionUtil.login(user)
    .then(user => dispatch(receieveUser(user)))
    .fail(errors => dispatch(receiveErrors(errors)))
}

export const logout = () => dispatch => {
  return ApiSessionUtil.logout()
    .then(() => dispatch(logoutUser()))
}

export const clearErrors = () => dispatch => {
  return dispatch(removeErrors());
}
