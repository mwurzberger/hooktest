const axios = require('axios');

export const SHIPS_FETCH_PENDING = 'SHIPS_FETCH_PENDING';
export const SHIPS_FETCH_ERROR = 'SHIPS_FETCH_ERROR';
export const SHIPS_FETCH_SUCCESS = 'SHIPS_FETCH_SUCCESS';

export const fetchShips = () => async dispatch => {
    dispatch({type: SHIPS_FETCH_PENDING});
    try {
        const response = await axios.get('http://localhost:3001/api/ships');
        dispatch({type: SHIPS_FETCH_SUCCESS, data: response.data});
    } catch (error) {
        dispatch({type: SHIPS_FETCH_ERROR, error});
    }
}
