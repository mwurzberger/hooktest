const assert = require('assert');
const mongoose =require('mongoose');
const Ship = require('../schemas/Ship');
const Position = require('../schemas/Position');
const CrewMember = require('../schemas/CrewMember');

describe('Ships', function() {
    before('before', function () {
        console.log('before');
        mongoose.connect('mongodb://queryUser:moody123@utility:27017/poc',  { useNewUrlParser: true });
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', function() {
            console.log('We are connected to test database!');
        });
    });

    after('after', async function () {
        console.log('after');
        await Ship.collection.drop();
        mongoose.disconnect();
    })

    it('creates a basic ship', async function () {
        const xwing = new Ship({
            name: 'X-Wing',
            classification: 'Starfighter',
        })
        try {
            const myShip = await xwing.save();
            console.log(myShip);
            assert.ok(myShip._id);
        } catch (e) {
            console.log(e);
        }
    })

    it('update a basic ship', async function () {
        const xwing = new Ship({
            name: 'X-Wing',
            classification: 'Starfighter',
        })
        try {
            const myShip = await xwing.save();
            myShip.name = 'Goober';
            const newShip = await myShip.save();
            assert.equal(myShip._id, newShip._id);
            assert.equal(newShip.name, 'Goober');
        } catch (e) {
            console.log(e);
        }
    })

    it('update a basic ship2', async function () {
        const xwing = new Ship({
            name: 'X-Wing',
            classification: 'Starfighter',
        })
        try {
            const myShip = await xwing.save();
            const myModel = Ship.findById(myShip._id);
            myModel.name = 'Goober';
            const newShip = await myModel.save();
            assert.equal(myShip._id, newShip._id);
            assert.equal(newShip.name, 'Goober');
        } catch (e) {
            console.log(e);
        }
    })
})