const Product = require('../models').Product;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const fs = require('fs');
const Utils = require('./Utils.js');

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
                    name: req.body.name,
                    image: imageLink,
                    options: req.body.options,
                })
                .then(product => {
                    res.status(200).send({
                        message: 'Creat product successfull',
                        product: product,
                    })
                }).catch(err => {
                    res.status(400).send({err});
                });
        });
    },
};