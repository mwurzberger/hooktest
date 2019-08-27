import React, { useState, useEffect } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';

import {fetchShipById} from '../../actions/shipActions';

const classifications =  ['Starfighter', 'Freighter', 'Capital'];

function Ship(props) {
    console.log('Ship() Entry');

    const id = props.shipId || '';
    const shipId = props.shipId;
    const fetchShipById = props.fetchShipById;

    // Local state
    const [error, setError] = useState({});
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
        const {data: ship, isLoading} = props.selectedShip;
        console.log('useEffect() - mapping to local', isLoading);

        if (props.shipId === ship.id && props.selectedShip.isLoading === false) {
            console.log('useEffect() - mapping to local - running');
            setName(ship.name);
            setClassification(ship.classification);
            setPositions(ship.positions);
        }
    }, [props.selectedShip])

    const handleSave = (event, getShips) => {
        event.preventDefault();
        console.log('handleSave');

        const ship = {
            id,
            name,
            classification,
            positions,
        }
    }

    console.log('Ship() return/render');
    return (
        <div>
            {
                !_.isEmpty(error) && <span>
                    <h3>Error</h3>
                    {`${error.name} - ${error.message || error.errmsg}`}
                </span>
            }
            <h3>{id}</h3>
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
            <button onClick={e => handleSave}>Save</button>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        selectedShip: state.selectedShip,
    }
}

export default connect(mapStateToProps, {fetchShipById})(Ship);
