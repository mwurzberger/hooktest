import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import {
    fetchShipById,
    createShip,
    updateShip,
    deleteShip,
} from '../../actions/shipActions';

const classifications =  ['Starfighter', 'Freighter', 'Capital'];

function Ship({
    shipId,
    fetchShipById, 
    createShip,
    updateShip,
    deleteShip,
    selectedShip: { data: shipData, isLoading, error } 
}) {
    console.log('Ship() Call');

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
            fetchShipById(shipId);
        }
    }, [shipId, fetchShipById])

    // Map the loaded ship into the local state when it is 
    // finally updated in redux
    useEffect(() => {
        console.log('useEffect() - mapping to local', shipData);
        console.log(`shipId === shipData._id ${shipId === shipData.id} isLoading === false ${isLoading === false}`)
        if (shipId === shipData._id && isLoading === false) {
            console.log('useEffect() - mapping to local - running');
            setName(shipData.name);
            setClassification(shipData.classification);
            setPositions(shipData.positions);
        }
    }, [shipId, shipData, isLoading])

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
            updateShip(newShip);
        } else {
            createShip(newShip);
        }
    }

    const handleDelete = () => {
        console.log('handleDelete');
        deleteShip(shipData._id);
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
                <select value={classification} onChange={e => setName(e.target.value)}>
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

const mapStateToProps = state => {
    return {
        selectedShip: state.selectedShip,
    }
}

const mapDispatchToProps = {
    fetchShipById,
    createShip,
    updateShip,
    deleteShip
}

export default connect(mapStateToProps, mapDispatchToProps)(Ship);
