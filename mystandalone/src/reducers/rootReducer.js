import { combineReducers } from 'redux';
import shipListReducer from './shipListReducer';
import shipReducer from './shipReducer';

export default combineReducers({
    ships: shipListReducer,
    selectedShip: shipReducer
});