// var express = require('express');
// var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// module.exports = router;

const todosController = require('../controllers').todos;
const usersController = require('../controllers').users;

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
}