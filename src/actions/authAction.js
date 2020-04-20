import * as Types from "./types";
import * as utils from "../utils";
import { ADMIN_ID, TOKEN, JOBS_API } from "../constants";
import authService from "../services/authService";
import {notification} from 'antd';

function setCurrentUser(admin) {
  return {
    type: Types.SET_CURRENT_USER,
    payload: admin
  };
}

function authError(error) {
  utils.removeStorage(ADMIN_ID);
  utils.removeStorage(TOKEN);
  return {
    type: Types.AUTH_ERROR,
    payload: error
  };
}

function signout() {
  return dispatch => {
    utils.removeStorage(TOKEN);
    dispatch(setCurrentUser({}));
  };
}

function fetchToken() {
  return {
    type: Types.FETCH_TOKEN
  };
}

function addSearchParam(values) {
  return {
    type: Types.SEARCH_PARAM,
    payload: values
  };
}
function setLoading(value) {
  return {
    type: Types.SETLOADING,
    payload: value
  };
}
function setJobList(values) {
  return {
    type: Types.SET_JOB_LIST,
    payload: values
  }
}
function setJobDetail(values) {
  return {
    type: Types.SET_JOB_DETAIL,
    payload: values
  }
}
function getJobDetail(jobId) {
  return async dispatch => {
    dispatch(setLoading(true));
    // https://jobs.github.com/positions/%7bID%7d.json
    let url = `/positions/${jobId}.json`;
    const res = await authService.get(url)
    if (res && res.status == 200) {
      let resData = res.data;
      dispatch(setLoading(false));
      return dispatch(
        setJobDetail(resData)
      )
    } else {
      notification['error']({
        message: res.status,
        description:
          res.statusText
      });
    }
  };
}
function searchJobsAll() {
  return async dispatch => {
    dispatch(setLoading(true));
    const res = await authService.get('/positions.json')
    if (res && res.status == 200) {
      let resData = res.data;
      dispatch(setLoading(false));
      return dispatch(
        setJobList(resData)
      )
    }
  };
  // return dispatch => {
  //   setJobList([])
  // }
}
function searchJobsWithPagingParam(queryParam) {
  return async dispatch => {
    dispatch(setLoading(true));
    let url = `/positions.json?${queryParam}`;
    const res = await authService.get(url)
    if (res && res.status == 200) {
      let resData = res.data;
      dispatch(setLoading(false));
      return dispatch(
        setJobList(resData)
      )
    }
  };
}

function signin(username, password, props) {
  return async dispatch => {
    try {
      return dispatch(
            setCurrentUser({
              username,
              token: password
            })
        );
    } catch (err) {
      if (err.response === undefined) {
        const errorMessage = "Server error, please try again later";
        return dispatch(authError(errorMessage));
      }
      if (err.response.status === 404 && err.response.data.code === -1001) {
        const errorMessage = err.response.data.message;
        return dispatch(authError(errorMessage));
      }
    }
  };
}
export { setCurrentUser, authError, signout, signin, addSearchParam, searchJobsAll, searchJobsWithPagingParam, setJobList, setLoading, getJobDetail, setJobDetail };
