import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import './App.css';
import Ship from './components/ship';
import {fetchShips} from './actions/shipListActions';
import {clearShipSelection} from './actions/shipActions';

class App extends Component {
	state = {
		selected: null
	}

	setSelected = value => {
		this.setState({selected: value});
	}

	setupNewShip = () => {
		this.setState({selected: ''}, this.props.clearShipSelection);
	}

	render() {
		const ships = _.get(this.props, 'ships.data', []);

		console.log('App render()');
		return (
			<div className="App">
				<pre>{JSON.stringify(this.props)}</pre>
				<pre>{JSON.stringify(this.state)}</pre>
				<hr />

				<button onClick={this.props.fetchShips}>Fetch Ships</button>
				 <h2>
	                List of Ships
	            </h2>
	            <ul>
	                {ships && ships.map(ship => (
	                	<li
	                		key={ship._id}
	                		onClick={() => this.setSelected(ship._id)}>
	                			{JSON.stringify(ship, null, 2)}
	                	</li>
	                ))}
	            </ul>
	            <button onClick={this.setupNewShip}>New Ship</button>

	            <hr />
	            <Ship shipId={this.state.selected} />
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		ships: state.ships,
	}
}

const mapDispatchToProps = dispatch => ({
	fetchShips: () => dispatch(fetchShips()),
	clearShipSelection: () => dispatch(clearShipSelection())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);