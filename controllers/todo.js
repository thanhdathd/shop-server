const Todo = require('../models').Todo;

const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? (page-1) * limit : 0;
  
    return { limit, offset };
};

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: todoItems } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
  
    return { totalItems, todoItems, totalPages, currentPage };
}



module.exports = {
    create(req, res) {
        return Todo
        .create({
            title: req.body.title,
        })
        .then(todo => res.status(201).send(todo))
        .catch(error => res.status(400).send(error));
    },

    list(req, res) {
        const { page, size } = req.query;
        const { limit, offset } = getPagination(page, size);

        console.log("req.params: "+req.query.page)
        return Todo
            .findAndCountAll({limit, offset})
            //.then(todos => res.status(200).send(todos))
            .then(data => {
                const response = getPagingData(data, page, limit)
                res.status(200).send(response);
            })
            .catch(error => res.status(400).send(error));
    },
};