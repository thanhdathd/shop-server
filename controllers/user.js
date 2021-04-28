const User = require('../models').User;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const fs = require('fs');
const Utils = require('./Utils.js');

function updateAvatar(link, user_id){
    User.update({ avatar: link }, {
        where: {
          id: user_id
        }
    })
    .then(affected => {
        console.log("affected row:"+affected)
    })
}

module.exports = {
    create(req, res) {
        return User
        .create({
            email: req.body.email,
            password: req.body.password,
            name: req.body.name,
            avatar: req.body.avatar,
            phone: req.body.phone,
            role: 2,
            status: 1,
        })
        .then(user => {
            user.password = '******'
            res.status(201).send(user)
        })
        .catch(error => res.status(400).send(error));
    },

    login(req, res) {
        const {email, password} = req.body;
        console.log('email:'+email)
        console.log('password:'+password);
        var condition = {email: email, password: password};

        User.findAll({
            attributes: ['id', 'email', 'name', 'avatar', 'phone', 'role', 'status'],
            where: condition
        }).then(user => {
            if(user.length > 0){
                if(user[0].status == 0){
                    const data = {message: 'Failed: Tai khoan chua duoc kich hoat', user: null}
                    res.status(400).send(data)
                }else{
                    //const data = {message: 'Succsessfull', user: user[0]}
                    res.status(200).send(user[0])
                }
            }else{
                const data = {message: 'Failed: email or password incorrect', user: null}
                res.status(400).send(data)
            }
        }).catch(err => {
            res.status(400).send(err)
        })
    },

    upload(req, res) {
        let sampleFile;
        let uploadPath;
        let category;
        console.log('req.files.filename.name:'+req.files.filename.name);
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.');
        }
        const randName = Utils.randString(15);
        const ext = Utils.getExtension(req.files.filename.name)
        sampleFile = req.files.filename;
        category = req.params.category;
        user_id = req.body.user_id;
        if(typeof(category) == 'undefined'){
            category = 'uncategory'
        }
        uploadPath = __basedir + `/public/images/${category}/` + randName+ext;
        
        console.log('uploadPath:'+uploadPath);
        // Use the mv() method to place the file somewhere on your server
        sampleFile.mv(uploadPath, function(err) {
            if (err)
            return res.status(500).send(err);

            if(category == 'avatar'){
                updateAvatar(`/api/images/${category}/${randName}${ext}`, user_id)
            }
            res.status(200).send({
                message: 'File uploaded!',
                url: `/api/images/${category}/`+randName+ext
            });
        });
    },

    showImage(req, res){
        file = req.params.file;
        category = req.params.category
        var img = fs.readFileSync(__basedir + `/public/images/${category}/` + file);
        res.writeHead(200, {'Content-Type': 'image/jpg' });
        res.end(img, 'binary');
    },

    updateInfo(req, res) {
        const {password, name, avatar, phone, status, role, user_id} = req.body;
        if(password){
            User.update({
                password: password,
                name: name,
                avatar: avatar,
                phone: phone,
                status: status,
                role: role,
            }, {
                where: {id: user_id}
            }).then(count => {
                res.status(200).send({
                    message: 'Update success',
                    affectedRows: count 
                });
            })
            .catch(err => res.status(400).send(err))
        }else{
            User.update({
                name: name,
                avatar: avatar,
                phone: phone,
                status: status,
                role: role,
            }, {
                where: {id: user_id}
            }).then(count => {
                res.status(200).send({
                    message: 'Update success',
                    affectedRows: count 
                });
            })
            .catch(err => res.status(400).send(err))
        }
    }
}