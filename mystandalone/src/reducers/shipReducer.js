import {
	SHIP_FETCH_PENDING,
	SHIP_FETCH_SUCCESS,
	SHIP_FETCH_ERROR,
	SHIP_CREATE_PENDING,
	SHIP_CREATE_ERROR,
	SHIP_CREATE_SUCCESS,
	SHIP_UPDATE_PENDING,
	SHIP_UPDATE_ERROR,
	SHIP_UPDATE_SUCCESS,
	SHIP_DELETE_PENDING,
	SHIP_DELETE_ERROR,
	SHIP_DELETE_SUCCESS,
	CLEAR_SHIP_SELECTION,
} from '../actions/shipActions';

function getInitialState() {
	console.log('running getInitialState');
	return {
		data: {
	        id: '',
	        name: '',
	        classification: 'Starfighter',
	    },
	    error: null,
	    isLoading: false
	}
}

export default (state = getInitialState(), action) => {
	console.log('action', action);
    switch (action.type) {
    	case CLEAR_SHIP_SELECTION:
    		return getInitialState();
        case SHIP_FETCH_PENDING:
            return {
               	...state,
               	error: null,
              	isLoading: true
            }
        case SHIP_FETCH_SUCCESS:
            return {
               	data: action.data,
               	error: null,
               	isLoading: false
            }
        case SHIP_FETCH_ERROR: 
            return {
               	...state,
               	error: action.error,
               	isLoading: false
            }

        case SHIP_CREATE_PENDING:
            return {
               	...state,
               	error: null,
               	isLoading: true
            }
        case SHIP_CREATE_SUCCESS:
            return {
            	data: action.data,           
               	error: null,
               	isLoading: false
            }
        case SHIP_CREATE_ERROR: 
            return {
               	...state,
               	error: action.error,
               	isLoading: false
            }

        case SHIP_UPDATE_PENDING:
            return {
               	...state,
               	error: null,
               	isLoading: true
            }
        case SHIP_UPDATE_SUCCESS:
            return {
            	data: action.data,
               	error: null,
               	isLoading: false
            }
        case SHIP_UPDATE_ERROR: 
            return {
               	...state,
               	error: action.error,
               	isLoading: false
            }

        case SHIP_DELETE_PENDING:
            return {
               	...state,
               	error: null,
               	isLoading: true
            }
        case SHIP_DELETE_SUCCESS:
            return {
            	data: getInitialState().data,
               	error: null,
               	isLoading: false
            }
        case SHIP_DELETE_ERROR: 
            return {
               	...state,
               	error: action.error,
               	isLoading: false
            }
        default:
            return state
    }
}