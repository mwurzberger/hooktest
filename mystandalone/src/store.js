import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

const enhancers = [];
const {__REDUX_DEVTOOLS_EXTENSION__} = window;
enhancers.push(__REDUX_DEVTOOLS_EXTENSION__());

export default function configureStore() {
    return createStore(
        rootReducer,
        compose(applyMiddleware(thunk), ...enhancers)
    );
}