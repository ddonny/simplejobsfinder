import * as Types from "../actions/types";
import { isEmpty } from "lodash";

const initialState = {
  error: "",
  isFetching: false,
  isAuthenticated: false,
  admin: {},
  searchParam: {
    description: "",
    location: "",
    full_time: false
  },
  jobLists: [],
  isLoading: false,
  jobDetail: {}
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case Types.FETCH_TOKEN:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        admin: {}
      });
    case Types.SET_CURRENT_USER:
      return Object.assign({}, state, {
        error: "",
        isFetching: false,
        isAuthenticated: true,
        admin: action.admin
      });
    case Types.AUTH_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        admin: {},
        error: action.payload
      });
    case Types.SEARCH_PARAM:
      return Object.assign({}, state, {
        searchParam: action.payload
      })
    case Types.SET_JOB_LIST:
      return Object.assign({}, state, {
        jobLists: action.payload
      })
    case Types.SETLOADING:
      return Object.assign({}, state,  {
        isLoading: action.payload
      })
    case Types.SET_JOB_DETAIL:
      return Object.assign({}, state, {
        jobDetail: action.payload
      })
    default:
      return state;
  }
};
