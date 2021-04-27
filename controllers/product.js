const Product = require('../models').Product;
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
    var okdata = new Array();
    items.forEach(d => {
        // var dd = Object.assign({}, d, {options: JSON.parse(d.options)});
        // okdata.push(dd);
        d.options = JSON.parse(d.options);
    });
    return { totalItems, items: items, totalPages, currentPage };
}





module.exports = {
    create(req, res) {
        console.log('req.files.filename.name:'+req.files.filename.name);
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.');
        }
        var imageLink = null
        const randName = Utils.randString(15);
        const ext = Utils.getExtension(req.files.filename.name)
        sampleFile = req.files.filename;
        uploadPath = __basedir + `/public/images/product/` + randName+ext;
        sampleFile.mv(uploadPath, function(err) {
            if (err)
            return res.status(500).send(err);
            imageLink = `/api/images/product/`+randName+ext

            Product
                .create({
                    categoryId: req.body.categoryId,
                    name: req.body.name,
                    image: imageLink,
                    options: req.body.options,
                })
                .then(product => {
                    product.options = JSON.parse(product.options)
                    res.status(200).send({
                        message: 'Creat product successfull',
                        product: product,
                    })
                }).catch(err => {
                    res.status(400).send({err});
                });
        });
    },

    list(req, res) {
        const { page, size } = req.query;
        const { limit, offset } = getPagination(page, size);

        console.log("req.params: "+req.query.page)
        return Product
            .findAndCountAll({limit, offset})
            .then(data => {
                const response = getPagingData(data, page, limit)
                res.status(200).send(response);
            })
            .catch(error => res.status(400).send(error));
    },
};