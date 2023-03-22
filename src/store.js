import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducers'
import { configureStore } from '@reduxjs/toolkit';

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));

const store = configureStore(rootReducer, composedEnhancer);

export default store;