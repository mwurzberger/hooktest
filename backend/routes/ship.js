const express = require('express');
const router = express.Router(); // eslint-disable-line new-cap
const Ship = require('../schemas/Ship');
const Position = require('../schemas/Position');
const CrewMember = require('../schemas/CrewMember');

// Ships
// get all
router.route('/').get((req, res, next) => {
    console.log('EXPRESS get all ships');
    Ship.find({}, ['name', 'classification'], (err, results) => {
        console.log('EXPRESS ', results);
        //if (err) return res.json({ success: false, error: err });
        if (err) return next(err);
        return res.json(results);
    });
});

// get one
router.route('/:id').get((req, res, next) => {
    const {id} = req.params;
    console.log('EXPRESS /:id get ship', id);
    Ship.findById(id, (err, result) => {
        console.log('EXPRESS /:id results', result);
        if (err) return next(err);
        return res.json(result);
    });
});

// create
router.route('/').post((req, res, next) => {
    console.log('EXPRESS create ship');
    const { name, classification, positions } = req.body;
    
    // Create new model
    let ship = new Ship();
    ship.name = name;
    ship.classification = classification;
    ship.positions = positions || [];
    console.log('EXPRESS create', ship);

    // Add to database
    ship.save((err) => {
        if (err) return next(err);
        return res.json(ship);
    });
});

// update
router.route('/:id').put((req, res, next) => {
    console.log('EXPRESS update ship');
    const { id } = req.params;
    debugger;
    console.log('EXPRESS update ship', id, req.body);
    Ship.findByIdAndUpdate(id, req.body, {new: true},
        (err, result) => {
            if (err) return next(err);
            return res.json(result);
        });
});

// delete
router.route('/:id').delete((req, res, next) => {
    const { id } = req.params;
    console.log('EXPRESS delete ship', id);
    Scenario.findByIdAndRemove(id, (err) => {
        if (err) return next(err);
        res.status(200);
        return res.send({
            message: `Deleted ${id}`,
        });
    });
});

// Positons


// Crew Members

module.exports = router;
