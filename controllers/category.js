const Category = require('../models').Category;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const fs = require('fs');
const Utils = require('./Utils.js');

module.exports = {
    create(req, res) {
        Category
        .create({
            name: req.body.name,
        })
        .then(cat => {
            res.status(200).send({
                message: 'Successfully create category',
                category: cat
            })
        })
        .catch(err => res.status(400).send({
            message: 'Failed',
            err: err
        }));
    },

    list(req, res) {
        Category
        .findAll()
        .then(data => {
            res.status(200).send({
                message: 'Successfully',
                categories: data
            });
        })
        .catch(err => {
            res.status(400).send({
                message: 'Failed',
                err: err
            });
        });
    },
}