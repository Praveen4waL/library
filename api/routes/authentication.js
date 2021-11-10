'use strict';

var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
const librarian = require('../../model/librarian');
var user = mongoose.model('user');

module.exports = function (router) {
    router.post('/createAdmin', function (req, res) {
        var newLibrarian = new librarian(req.body);
        newLibrarian.password = bcrypt.hashSync(req.body.password, 10);
        newLibrarian.save(function (err, librarian) {
            if (err) {
                return res.send({ message: err });
            } else {
                librarian.password = undefined;
                return res.json(librarian);
            }
        });
    });
    router.post('/login', function (req, res) {
        librarian.findOne({ email: req.body.email }, function (err, resp) {
            if (err) throw err;
            if (!resp || !resp.comparePassword(req.body.password)) {
                return res.json({ message: 'Authentication failed. Invalid user or password.' });
            }
            return res.json({ token: jwt.sign({ email: resp.email, name: resp.name, _id: resp._id }, 'RESTFULAPIs') });
        });
    });
}