const Material = require('../models').Material;
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
    return { totalItems, items: items, totalPages, currentPage };
}




module.exports = {
    create(req, res) {
        Material
            .create({
                catId: req.body.catId,
                name: req.body.name,
                unit: req.body.unit,
                quantity: req.body.quantity,
            })
            .then(mater => {
                res.status(200).send({
                    message: 'Creat Material successfull',
                    material: mater,
                })
            }).catch(err => {
                res.status(400).send({err});
            });
    },

    list(req, res) {
        const { page, size } = req.query;
        const { limit, offset } = getPagination(page, size);

        console.log("req.params: "+req.query.page)
        return Material
            .findAndCountAll({limit, offset})
            .then(data => {
                const response = getPagingData(data, page, limit)
                res.status(200).send(response);
            })
            .catch(error => res.status(400).send(error));
    },

    update(req, res) {
        const {name, catId, unit, quantity, id} = req.body;
        Material.update({
            name: name,
            catId: catId,
            unit: unit,
            quantity: quantity,
        }, {
            where: {id: id}
        }).then(count => {
            Material.findByPk(id)
            .then( m => {
                res.status(200).send({
                    message: 'Update success',
                    affectedRows: count,
                    material: m,
                });
            })
        })
        .catch(err => res.status(400).send(err))
    },

    delete(req, res){
        Material.destroy({
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

}