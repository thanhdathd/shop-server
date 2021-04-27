const Order = require('../models').Order;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const fs = require('fs');
const Utils = require('./Utils.js');


const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? (page-1) * limit : 0;
  
    return { limit, offset };
};

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: items } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
    items.forEach(d => {
        d.listProduct = JSON.parse(d.listProduct);
    });
    return { totalItems, items: items, totalPages, currentPage };
}




module.exports = {
    create(req, res) {
        const {name, staffName, staffPhone, listProduct, note} = req.body;
        Order
        .create({
            name: name,
            staffName: staffName,
            staffPhone: staffPhone,
            listProduct: listProduct,
            note: note,
        })
        .then(cat => {
            res.status(200).send({
                message: 'Successfully create Order',
                category: cat
            })
        })
        .catch(err => res.status(400).send({
            message: 'Failed',
            err: err
        }));
    },

    list(req, res) {
        const { page, size } = req.query;
        const { limit, offset } = getPagination(page, size);
        return Order
            .findAndCountAll({limit, offset})
            .then(data => {
                const response = getPagingData(data, page, limit)
                res.status(200).send(response);
            })
            .catch(error => res.status(400).send(error));
    },


    update(req, res){
        const {name, listProduct, note, id} = req.body;
        Order.update({
            name: name,
            listProduct: listProduct,
            note: note,
        }, {
            where: {id: id}
        }).then(count => {
            Order.findByPk(id)
            .then( od => {
                od.listProduct = JSON.parse(od.listProduct);
                res.status(200).send({
                    message: 'Update success',
                    affectedRows: count,
                    product: od,
                });
            })
        })
        .catch(err => res.status(400).send(err))
    },

    delete(req, res){
        Order.destroy({
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