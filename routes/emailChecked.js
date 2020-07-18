const querystring = require('querystring');
const http = require('http');
const nodemailer = require('nodemailer');
const express = require('express');
const router = express.Router();
const { WriteFile, ReadFile } = require('../public/javascripts/file');

//向邮箱发送验证码所需参数
let user = {
    name: '3012598780@qq.com',
    pass: 'huorvpsryofgdfhc'
};

// 使用默认的SMTP传输方式 创建可以复用的传输对象
let transporter = nodemailer.createTransport({
    host: "smtp.qq.com", // 主机名
    port: 465, // 端口号
    secure: true, // true for 465, false for other ports
    auth: {
        user: user.name, // 用户名
        pass: user.pass, // 密码
    },
});



let emailObj = {
    from: '"繁瑙"<3012598780@qq.com>', // 发件人
    to: "3012598780@qq.com", // 收件人
    subject: "验证码", // 主题
    // text: "Hello world?", // 文本内容
    html: "<b>Hello world?</b>", // html内容
};

//向邮箱发送验证码
router.post('/checked', (req, res, next) => {
    console.log(req.body);
    let code = getCode();
    emailObj.to = req.body.email;
    emailObj.html = `<h1>您的注册验证码是：${code}</h1>`;
    let info = transporter.sendMail(emailObj, (err, obj) => {
        if (err) console.log(err);

        WriteFile(code, 'temp', req.body.email).then(data => {
            console.log(data);
        }).catch(err => {
            console.log(err);
        })
        res.send('验证码已发送');
    })

});

//fclvnhzsdvnydeii

//用于生成验证码

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function getCode() {
    var code = '';
    for (var i = 0; i < 6; i++) {
        var type = random(1, 3);
        switch (type) {
            case 1:
                code += String.fromCharCode(random(48, 57)); //数字
                break;
            case 2:
                code += String.fromCharCode(random(65, 90)); //大写字母
                break;
            case 3:
                code += String.fromCharCode(random(97, 122)); //小写字母
                break;
        }
    }
    return code;
}

module.exports = router;