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
    
        items.forEach(order => {
            try{
                order.listProduct = JSON.parse(order.listProduct);
            }catch(err){
                console.log('parse err:'+err)
            }
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
        .then(od => {
            res.status(200).send({
                message: 'Successfully create Order',
                order: od
            })
        })
        .catch(err => res.status(400).send({
            message: 'Failed',
            err: err
        }));
    },

    list(req, res) {
        const { page, size, filter, order } = req.query;
        const { limit, offset } = getPagination(page, size);
        let orderBy = 'DESC'
        if(typeof(order) !== 'undefined') orderBy = order
        if(typeof(filter) == 'undefined' || filter == 'all'){
            return Order
            .findAndCountAll({order: [['id', orderBy]], limit, offset})
            .then(data => {
                const response = getPagingData(data, page, limit)
                res.status(200).send(response);
            })
            .catch(error => res.status(400).send(error));
        }else{
            return Order
            .findAndCountAll({where: {status: filter}, order: [['id', orderBy]], limit, offset})
            .then(data => {
                const response = getPagingData(data, page, limit)
                res.status(200).send(response);
            })
            .catch(error => res.status(400).send(error));
        }
    },


    update(req, res){
        const {name, listProduct, note, status, id} = req.body;
        Order.update({
            name: name,
            listProduct: listProduct,
            note: note,
            status: status,
        }, {
            where: {id: id}
        }).then(count => {
            Order.findByPk(id)
            .then( od => {
                od.listProduct = JSON.parse(od.listProduct);
                res.status(200).send({
                    message: 'Update success',
                    affectedRows: count,
                    order: od,
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
    },

    detail(req, res){
        const id = req.params.id;
        Order.findByPk(id)
            .then( p => {
                p.listProduct = JSON.parse(p.listProduct);
                res.status(200).send(p);
            })
            .catch(err => res.status(400).send({
                message: 'Failed',
                err: err,
            }))
    }
}