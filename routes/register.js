const express = require('express');
const mysql = require('../dao/mysqlServer');
const router = express.Router();
const { WriteFile, ReadFile } = require('../public/javascripts/file');
const fs = require('fs');
const path = require('path');



//渲染登录页
router.get('/register', (req, res, next) => {
    //渲染注册页面
    res.render('register', { title: '注册页' });
});

//验证码验证
router.post('/check', (req, res, next) => {
    ReadFile('temp', req.body.email).then(data => {
        if (req.body.checkVal == data.toString()) {
            res.send('{"code":"200","msg":"验证码正确"}');
            // 验证码输入正确之后将存有验证码的文件删除
            // fs.unlink(path.join(__dirname, '..', 'public/temp', req.body.email), function(err) {
            //     if (err) console.log(err);
            //     console.log('文件被删除');
            // });
        } else {
            res.send('{"code":"500","msg":"验证码错误，请重新输入"}');
        }
    })
})

//注册功能
router.post('/register', (req, res, next) => {
    console.log(req.body.username);
    mysql.query(`select * from users where userName = '${req.body.username}'`, result => {
        console.log(result);
        if (result == null) {
            mysql.query(`insert into users (userName,password,email) values('${req.body.username}','${req.body.password}','${req.body.email}')`, result => {
                console.log(result);
                res.send('{"code":200,"msg":"注册成功"}');
            });
        } else {
            res.send('{"code":100,"msg":"用户名已存在，请重新输入"}');
        }
    });
});

router.get('/favicon', (req, res, next) => {
    return;
});

module.exports = router;