// var express = require('express');
// var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// module.exports = router;

const todosController = require('../controllers').todos;
const usersController = require('../controllers').users;
const productController = require('../controllers').products;
const categoryController = require('../controllers').categories;
const materialCatController = require('../controllers').materialcats;
const materialController = require('../controllers').materials;
const orderController = require('../controllers').orders;
const receiptController = require('../controllers').receipts;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'API is working!!!',
  }));

  app.post('/api/todos', todosController.create);
  app.get('/api/todos', todosController.list);
  app.post('/api/signup', usersController.create);
  app.post('/api/login', usersController.login);
  app.post('/api/upload/:category', usersController.upload);
  app.get('/api/images/:category/:file', usersController.showImage);
  app.post('/api/users/update', usersController.updateInfo);
  app.get('/api/users/list', usersController.list);

  // Product
  app.post('/api/product/create', productController.create);
  app.get('/api/product/list', productController.list);
  app.post('/api/product/update', productController.update);
  app.post('/api/product/delete', productController.delete);
  app.post('/api/product/:id', productController.detail);

  // Product category
  app.post('/api/category/create', categoryController.create);
  app.get('/api/category/list', categoryController.list);
  app.post('/api/category/delete', categoryController.delete);

  // materialcat
  app.post('/api/materialcat/create', materialCatController.create);
  app.get('/api/materialcat/list', materialCatController.list);
  app.post('/api/materialcat/update', materialCatController.update);
  app.post('/api/materialcat/delete', materialCatController.delete);

  // Material
  app.post('/api/material/create', materialController.create);
  app.get('/api/material/list', materialController.list);
  app.post('/api/material/update', materialController.update);
  app.post('/api/material/delete', materialController.delete);

  // Order
  app.post('/api/order/create', orderController.create);
  app.get('/api/order/list', orderController.list);
  app.post('/api/order/update', orderController.update);
  app.post('/api/order/delete', orderController.delete);
  app.post('/api/order/:id', orderController.detail);

  // Receipt receiptController
  app.post('/api/receipt/create', receiptController.create);
  app.get('/api/receipt/list', receiptController.list);
  app.post('/api/receipt/update', receiptController.update);
  app.post('/api/receipt/delete', receiptController.delete);
  app.post('/api/receipt/:id', receiptController.detail);
}