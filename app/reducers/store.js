import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import test from './test.reducer';

const reducers = combineReducers({
	test
});

const store = createStore(
    reducers,
    applyMiddleware(thunk)
);

export default store;