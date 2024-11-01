// src/redux/store/store.js
import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import userReducer from '../reducers/userReducer';
import userSaga from '../sagas/userSaga';
import { all } from 'redux-saga/effects';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
    user: userReducer
});

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

function* rootSaga() {
    yield all([userSaga()]);
}

sagaMiddleware.run(rootSaga);

export default store;