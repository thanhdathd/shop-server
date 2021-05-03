const Receipt = require('../models').Receipt;
const Order = require('../models').Order;
const ReceiptOrder = require('../models').ReceiptOrder;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const fs = require('fs');
const Utils = require('./Utils.js');
const { INTEGER } = require('sequelize');



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
    async create(req, res) {
        try{
            const {staffName, staffPhone, listProduct: _listP,
                additionalFee, discount,cash, change,
               orderIds} = req.body;
           var listProduct = new Array();
           if(typeof(_listP) != 'undefined' && orderIds.length == 1){ // tach bill
               listProduct = _listP;
           }
           console.log('oke here')
           const orders =  await Order.findAll({where: {id: JSON.parse(orderIds)}});
           console.log('oke orders:'+orders.length);
           for(let i = 0; i < orders.length; i++){
               var order = orders[i];
               order.listProduct = JSON.parse(order.listProduct);
               order.listProduct.forEach(product => {
                   if(typeof(_listP) == 'undefined') listProduct.push(product);
               });
           }
           var totalAmount = 0;
           listProduct.forEach(product => {
               totalAmount += product.price*product.quantity
           })
           var total = totalAmount - parseInt(discount) + parseInt(additionalFee);
           console.log('total: '+total);
           Receipt
           .create({
               staffName: staffName,
               staffPhone: staffPhone,
               listProduct: JSON.stringify(listProduct),
               additionalFee: additionalFee,
               discount: discount,
               totalAmount: totalAmount,
               total: total,
               cash: cash,
               change: change,
           })
           .then(rec => {
               orders.forEach(o => {

                const rpod = {
                    orderId: o.id,
                    receiptId: rec.id,
                    name: `OrderID-${o.id}`,
                  }
                 ReceiptOrder.create(rpod, { w: 1 }, { returning: true })

               })
               res.status(200).send({
                   message: 'Successfully create Receipt',
                   receipt: rec
               })
           })
           .catch(err => res.status(400).send({
               message: 'Failed',
               err: err
           }));
        }catch(err){
            res.status(400).send({
                message: 'Failed',
                err: err
            })
        }
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
        try{
            const {listProduct, additionalFee, discount, cash, change, id} = req.body;

            var totalAmount = 0;
            var _listP = JSON.parse(listProduct);
            _listP.forEach(p => {
                totalAmount += p.price*p.quantity;
            })
            var total = totalAmount - parseInt(discount) + parseInt(additionalFee);
            Receipt.update({
                listProduct: listProduct,
                totalAmount: totalAmount,
                total: total,
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
            }).catch(err => res.status(400).send(err))
        }catch(err){
            res.status(400).send(err)
        }
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