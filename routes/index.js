var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('users', {
        title: 'Express',
        username: 'zhangsan',
        age: 20,
        sex: 'nan',
        obj: {
            student: 'lisi',
            age: 22
        },
        arr: ['苹果', '香蕉', '橘子', '西瓜']
    });
});

module.exports = router;