var Sequelize = require('sequelize');//引入sequelize模块
var sequelize = new Sequelize('ghost', 'postgres', null, {
	dialect: 'postgres'
})

var User = sequelize.define('user', {
	id: {
        type: Sequelize.STRING(50),
        primaryKey: true//主键
    },
    username: Sequelize.STRING,
    password: Sequelize.STRING,
    mail:Sequelize.STRING
});
sequelize.sync().then(function() {
    //创建表并创建我们第一个用户
    return User.create({
        name:'wt',
        password:'456789',
        mail:'wt@qq.com'
    });
}).then(function(data){
    console.log('hello');

}).catch(function(err){
    console.log('inserted fail');
    console.log(err.message);
});

// 增
User.create({username, password, role})//username role password对应相应的字段名
.then(ok => res.json({status: 'ok'}))
.catch(e => res.json({status: 'error', message: e}));//异常捕获

// 删
User.destroy({where: {username}})//where是指定查询条件
.then(ok =>console.log('ok'))//删除成功的回调
.catch(e => res.json({status: 'error', message: e}));

// 改
User.update({
    password: newpassword//修改的字段对应的内容
  },{
      where: {
        username: username//查询条件
    }
})
.then(ok => console.log('ok'))
.catch(e => res.json({status: 'error', message: e}));

// 查
User.findOne({//还有find、findAll等方法 
	where: { 
		username: username//查询条件 
	} 
}).then(result=>{ 
	console.log(result)//空时为null 
}) 





