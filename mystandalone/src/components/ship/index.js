import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';

import {
    fetchShipById,
    createShip,
    updateShip,
    deleteShip,
} from '../../actions/shipActions';

const classifications =  ['Starfighter', 'Freighter', 'Capital'];

function Ship({shipId}) {
    console.log('Ship() Call');
    const selectedShip = useSelector(reduxState => reduxState.selectedShip);
    const {isLoading, error} = selectedShip;
    const shipData = selectedShip.data;
    const dispatch = useDispatch();

    // Local state
    const [name, setName] = useState('');
    const [classification, setClassification] = useState('');
    const [positions, setPositions] = useState([]);

    // Go out and fetch the ship data if the shipId is set
    // Only repeat if a new shipId is passed in
    useEffect(() => {
        console.log('useEffect() - fetch', shipId);
        if (shipId && shipId !== '') {
            console.log('useEffect() - fetch - running');
            dispatch(fetchShipById(shipId));
        }
    }, [shipId])

    // Map the loaded ship into the local state when it is 
    // finally updated in redux
    useEffect(() => {
        console.log('useEffect() - mapping to local', `isLoading: ${isLoading}`);
        if (!isLoading) {
            console.log('useEffect() - mapping to local - running');
            setName(shipData.name);
            setClassification(shipData.classification);
            setPositions(shipData.positions);
        }
    }, [shipData, isLoading])

    const handleSave = () => {
        console.log('handleSave');

        const newShip = {
            ...shipData,
            name,
            classification,
            positions,
        }
        console.log('handleSave', newShip);

        if (shipId) {
            dispatch(updateShip(newShip));
        } else {
            dispatch(createShip(newShip));
        }
    }

    const handleDelete = () => {
        console.log('handleDelete');
        dispatch(deleteShip(shipData._id));
    }

    return (
        <div>
            {
                !_.isEmpty(error) && <span>
                    <h3>Error</h3>
                    {`${error.name} - ${error.message || error.errmsg}`}
                </span>
            }
            <h3>{shipId}</h3>
            <div>
                <label>Name:</label>
                <input type="text" id="name" value={name} onChange={e => setName(e.target.value)}/>
            </div>
            <div>
                <label>Classification:</label>
                <select value={classification} onChange={e => setClassification(e.target.value)}>
                    {classifications.map((entry) => (<option value={entry} key={entry}>{entry}</option>))}
                </select>
            </div>
            <div>
                <div>Positions:</div>
                <div>
                    {JSON.stringify(positions, null, 4)}
                </div>
            </div>
            <button onClick={handleSave}>Save</button>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
}

export default Ship;
