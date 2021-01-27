import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILED,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILED,
  USER_LOGOUT,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAILED,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAILED,
  USER_UPDATE_RESET,
  USER_DETAILS_RESET,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAILED,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAILED,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
  UPDATE_USER_RESET,
} from '../actionTypes';

const initialState = {
  loading: false,
  userInfo: null,
  error: null,
};

export const userLogin = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
      };
    case USER_LOGIN_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case USER_LOGOUT:
      return {
        ...state,
        userInfo: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

const registerState = {
  loading: false,
  userInfo: null,
  error: null,
};

export const userRegister = (state = registerState, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
      };
    case USER_REGISTER_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case USER_LOGOUT:
      return {
        ...state,
        loading: false,
        error: null,
        userInfo: null,
      };

    default:
      return state;
  }
};

const detailsState = {
  user: {},
  loading: false,
  error: null,
};

export const userDetails = (state = detailsState, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case USER_DETAILS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case USER_LOGOUT:
      return {
        ...state,
        loading: false,
        error: null,
        user: {},
      };
    case USER_DETAILS_RESET:
      return {
        ...state,
        loading: false,
        error: null,
        user: {},
      };
    default:
      return state;
  }
};

const userUpdate = {
  loading: false,
  success: false,
  userInfo: null,
  error: null,
};

export const userUpdateProfile = (state = userUpdate, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_UPDATE_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        userInfo: action.payload,
      };
    case USER_UPDATE_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case USER_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const userList = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return {
        loading: true,
      };
    case USER_LIST_SUCCESS:
      return {
        loading: false,
        users: action.payload,
      };
    case USER_LIST_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    case USER_LIST_RESET:
      return { users: [] };
    default:
      return state;
  }
};

export const userDelete = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return {
        loading: true,
      };
    case USER_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case USER_DELETE_FAILED:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const userUpdateReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case UPDATE_USER_REQUEST:
      return {
        loading: true,
      };
    case UPDATE_USER_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case UPDATE_USER_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    case UPDATE_USER_RESET:
      return {
        user: {},
      };
    default:
      return state;
  }
};
