let checkStatus = false;

//输入框是否为空验证
//验证用户名
$('.username').blur(() => {
    check('username', 0, '用户名');
    // console.log(123);
});
//验证密码
$('.password').blur(() => {
    check('password', 1, '密码');
});
//验证邮箱
$('.email').blur(() => {
    check('email', 2, '邮箱');
});

//向邮箱发送验证码
$('.check').click(() => {
    // console.log(123);
    if ($('.email').val() == '') {
        $('span').eq(2).html('邮箱不可为空');
    } else {
        $.ajax({
            type: 'post',
            url: 'http://localhost:3000/checked',
            contentType: 'application/x-www-form-urlencoded',
            data: {
                email: $('.email').val()
            },
            success: (res) => {
                // console.log(res);
                $('span').eq(3).html('验证码已发送，请注意查收');
            }
        });
    }
});

//验证码正确验证
$('.input').blur(() => {
    check('input', 3, '验证码');
    check('email', 2, '邮箱');
    if (check('input', 3, '验证码') && check('email', 2, '邮箱')) {
        $.ajax({
            url: 'http://localhost:3000/check',
            type: 'post',
            data: {
                checkVal: $('.input').val(),
                email: $('.email').val()
            },
            success: (res) => {
                console.log(res);
                res = JSON.parse(res);
                if (res.code == 200) {
                    checkStatus = true; //用于承接验证码验证结果
                } else {
                    $('span').eq(3).html(res.msg);
                }
            }
        });
    }
});


//提交注册信息
$('.btn').click(function() {
    //验证成功之后向数据库中提交信息
    let usernameCheck = check('username', 0, '用户名'),
        passwordCheck = check('password', 1, '密码'),
        emailCheck = check('email', 2, '邮箱');

    if (checkStatus && usernameCheck && passwordCheck && emailCheck) {
        $.ajax({
            type: 'post',
            url: 'http://localhost:3000/register',
            data: {
                username: $('.username').val(),
                password: $('.password').val(),
                email: $('.email').val()
            },
            contentType: 'application/x-www-form-urlencoded',
            success: function(res) {
                res = JSON.parse(res);
                if (res.code == 200) {
                    alert('注册成功');
                }
            }
        });
    }
});

//用于判断输入框是否为空
function check(name, index, msg) {
    // console.log(name, index, msg);
    if ($(`.${name}`).val() == '') {
        $('span').eq(index).html(`${msg}不可为空`);
        // console.log('进入')
        return false;
    } else {
        return true;
    }
}