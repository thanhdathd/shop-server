const Receipt = require('../models').Receipt;
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
        const {staffName, staffPhone, listProduct,
             additionalFee, discount, totalAmount,cash, change,
            orderId} = req.body;
        Receipt
        .create({
            orderId: orderId,
            staffName: staffName,
            staffPhone: staffPhone,
            listProduct: listProduct,
            additionalFee: additionalFee,
            discount: discount,
            totalAmount: totalAmount,
            cash: cash,
            change: change,
        })
        .then(rec => {
            res.status(200).send({
                message: 'Successfully create Order',
                receipt: rec
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
        return Receipt
            .findAndCountAll({limit, offset})
            .then(data => {
                const response = getPagingData(data, page, limit)
                res.status(200).send(response);
            })
            .catch(error => res.status(400).send(error));
    },


    update(req, res){
        const {listProduct, totalAmount, additionalFee, discount, cash, change, id} = req.body;
        Receipt.update({
            listProduct: listProduct,
            totalAmount: totalAmount,
            additionalFee: additionalFee,
            discount: discount,
            cash: cash,
            change: change,
        }, {
            where: {id: id}
        }).then(count => {
            Receipt.findByPk(id)
            .then( r => {
                r.listProduct = JSON.parse(r.listProduct);
                res.status(200).send({
                    message: 'Update success',
                    affectedRows: count,
                    receipt: r,
                });
            })
        })
        .catch(err => res.status(400).send(err))
    },

    delete(req, res){
        Receipt.destroy({
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