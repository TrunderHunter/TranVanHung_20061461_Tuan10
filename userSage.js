// src/redux/sagas/userSaga.js

import { call, put, takeLatest } from 'redux-saga/effects';
import { ADD_USER, DELETE_USER, EDIT_USER, FETCH_USERS, setUsers } from '../action/userActions,js';

// Dummy API calls (có thể thay thế bằng API thực tế)
function* fetchUsers() {
    // Giả sử fetch từ API
    const users = [{ id: 1, fullname: 'John Dev', job: 'Engineer' }];
    yield put(setUsers(users));
}

function* addUser(action) {
    // Giả sử thêm vào API
    yield put({ type: FETCH_USERS });
}

function* deleteUser(action) {
    // Giả sử xóa từ API
    yield put({ type: FETCH_USERS });
}

function* editUser(action) {
    // Giả sử cập nhật API
    yield put({ type: FETCH_USERS });
}

export default function* userSaga() {
    yield takeLatest(FETCH_USERS, fetchUsers);
    yield takeLatest(ADD_USER, addUser);
    yield takeLatest(DELETE_USER, deleteUser);
    yield takeLatest(EDIT_USER, editUser);
}