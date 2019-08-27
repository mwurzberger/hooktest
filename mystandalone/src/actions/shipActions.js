import axios from 'axios';
import {fetchShips} from './shipListActions';

export const CLEAR_SHIP_SELECTION = 'CLEAR_SHIP_SELECTION';
export const clearShipSelection = () => async dispatch => {
    console.log('clearShipSelection');
    dispatch({type: CLEAR_SHIP_SELECTION});
}

export const SHIP_FETCH_PENDING = 'SHIP_FETCH_PENDING';
export const SHIP_FETCH_ERROR = 'SHIP_FETCH_ERROR';
export const SHIP_FETCH_SUCCESS = 'SHIP_FETCH_SUCCESS';

export const fetchShipById = id => async dispatch => {
    console.log('fetchShipById', id);
    dispatch({type: SHIP_FETCH_PENDING});
    try {
        const response = await axios({
            method: 'get',
            url: `http://localhost:3001/api/ships/${id}`,
        });
        dispatch({type: SHIP_FETCH_SUCCESS, data: response.data});
    } catch (error) {
        dispatch({type: SHIP_FETCH_ERROR, error});
    }
}

export const SHIP_CREATE_PENDING = 'SHIP_CREATE_PENDING';
export const SHIP_CREATE_ERROR = 'SHIP_CREATE_ERROR';
export const SHIP_CREATE_SUCCESS = 'SHIP_CREATE_SUCCESS';

export const createShip = newShip => async dispatch => {
    console.log('createShip', newShip);
    dispatch({type: SHIP_CREATE_PENDING});
    try {
        const response = await axios({
            method: 'post',
            url: `http://localhost:3001/api/ships/`,
            data: newShip
        });
        console.log('createShip response', response);
        dispatch({type: SHIP_CREATE_SUCCESS, data: response.data});
        dispatch(fetchShips());
    } catch (error) {
        dispatch({type: SHIP_CREATE_ERROR, error});
    }
}

export const SHIP_UPDATE_PENDING = 'SHIP_UPDATE_PENDING';
export const SHIP_UPDATE_ERROR = 'SHIP_UPDATE_ERROR';
export const SHIP_UPDATE_SUCCESS = 'SHIP_UPDATE_SUCCESS';

export const updateShip = newShip => async dispatch => {
    console.log('updateShip', newShip);
    dispatch({type: SHIP_UPDATE_PENDING});
    try {
        const response = await axios({
            method: 'put',
            url: `http://localhost:3001/api/ships/${newShip._id}`,
            data: newShip
        });
        console.log('updateShip response', response);
        dispatch({type: SHIP_UPDATE_SUCCESS, data: response.data});
        dispatch(fetchShips());
    } catch (error) {
        dispatch({type: SHIP_UPDATE_ERROR, error});
    }
}

export const SHIP_DELETE_PENDING = 'SHIP_DELETE_PENDING';
export const SHIP_DELETE_ERROR = 'SHIP_DELETE_ERROR';
export const SHIP_DELETE_SUCCESS = 'SHIP_DELETE_SUCCESS';

export const deleteShip = shipId => async dispatch => {
    console.log('deleteShip', shipId);
    dispatch({type: SHIP_DELETE_PENDING});
    try {
        const response = await axios({
            method: 'delete',
            url: `http://localhost:3001/api/ships/${shipId}`
        });
        console.log('deleteShip response', response);
        dispatch({type: SHIP_DELETE_SUCCESS});
        dispatch(fetchShips());
    } catch (error) {
        dispatch({type: SHIP_DELETE_ERROR, error});
    }
}
