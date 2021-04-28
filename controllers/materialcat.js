const MaterialCat = require('../models').MaterialCat;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const fs = require('fs');
const Utils = require('./Utils.js');

module.exports = {
    create(req, res){
        MaterialCat
        .create({
            name: req.body.name,
        })
        .then(cat => {
            res.status(200).send({
                message: 'Successfully create category',
                materialCat: cat
            })
        })
        .catch(err => res.status(400).send({
            message: 'Failed',
            err: err
        }));
    },

    list(req, res) {
        MaterialCat
        .findAll()
        .then(data => {
            res.status(200).send({
                message: 'Successfully',
                materialCat: data
            });
        })
        .catch(err => {
            res.status(400).send({
                message: 'Failed',
                err: err
            });
        });
    },

    update(req, res){
        const {name, id} = req.body;
        MaterialCat
        .update({
            name: name
            },
            { where: {id: id}}
        )
        .then( count => {
            MaterialCat.findByPk(id)
            .then( row => {
                res.status(200).send({
                    message: 'Update success',
                    affectedRows: count,
                    product: row,
                });
            })
        })
        .catch(error => {
            res.status(400).send({
                message: 'Failed',
                err: error,
            })
        })
    },

    delete(req, res){
        MaterialCat.destroy({
            where: {
                id: req.body.id
            }
        })
        .then(af => {
            res.status(200).send({
                message: 'Successfully',
                affectedRows: af,
            })
        })
        .catch(err => res.status(400).send({
            message: 'Failed',
            err: err,
        }))
    }
}