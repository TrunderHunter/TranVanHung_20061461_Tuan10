// src/redux/actions/userActions.js

export const ADD_USER = 'ADD_USER';
export const DELETE_USER = 'DELETE_USER';
export const EDIT_USER = 'EDIT_USER';
export const FETCH_USERS = 'FETCH_USERS';
export const SET_USERS = 'SET_USERS';

export const addUser = (user) => ({ type: ADD_USER, payload: user });
export const deleteUser = (id) => ({ type: DELETE_USER, payload: id });
export const editUser = (user) => ({ type: EDIT_USER, payload: user });
export const fetchUsers = () => ({ type: FETCH_USERS });
export const setUsers = (users) => ({ type: SET_USERS, payload: users });