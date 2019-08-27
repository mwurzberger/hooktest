import axios from 'axios';

export const POSITION_FETCH = 'POSITION_FETCH';
export const fetchPosition = id => async dispatch => {
    console.log('fetchPosition', id);
    dispatch({type: POSITION_FETCH, status: 'pending'});
    try {
        const response = await axios({
            method: 'get',
            url: `http://localhost:3001/api/ships/${id}`,
        });
        dispatch({type: POSITION_FETCH, status: 'success', data: response.data});
    } catch (error) {
        dispatch({type: POSITION_FETCH, status: 'failure', error});
    }
}

export const POSITION_CREATE = 'POSITION_CREATE';
export const createPosition = position => async dispatch => {
    console.log('createPosition', position);
    dispatch({type: POSITION_CREATE, status: 'pending'});
    try {
        const response = await axios({
            method: 'post',
            url: `http://localhost:3001/api/ships/`,
            data: newShip
        });
        console.log('createPosition response', response);
        dispatch({type: POSITION_CREATE, status: 'success', data: response.data});
    } catch (error) {
        dispatch({type: POSITION_CREATE, status: 'failure', error});
    }
}

export const POSITION_UPDATE = 'POSITION_UPDATE';
export const updatePosition = position => async dispatch => {
    console.log('updatePosition', position);
    dispatch({type: POSITION_UPDATE, status: 'pending'});
    try {
        const response = await axios({
            method: 'put',
            url: `http://localhost:3001/api/ships/${newShip._id}`,
            data: newShip
        });
        console.log('updatePosition response', response);
        dispatch({type: POSITION_UPDATE, status: 'success', data: response.data});
    } catch (error) {
        dispatch({type: POSITION_UPDATE, status: 'failure', error});
    }
}

export const POSITION_DELETE = 'POSITION_DELETE';
export const deletePosition = id => async dispatch => {
    console.log('deletePosition', id);
    dispatch({type: POSITION_DELETE, status: 'pending'});
    try {
        const response = await axios({
            method: 'delete',
            url: `http://localhost:3001/api/ships/${id}`
        });
        console.log('deletePosition response', response);
        dispatch({type: POSITION_DELETE}, status: 'success');
    } catch (error) {
        dispatch({type: POSITION_DELETE, status: 'failure', error});
    }
}