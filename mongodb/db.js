/**
 *  利用mongoose连接 指定数据库
 */

var mongoose = require('mongoose');
var DB_URL = 'mongodb://localhost:27017/mymongoosedb';     //mymongoosedb数据库的名称
 
mongoose.connect(DB_URL);       //连接数据库

//数据库连接成功
mongoose.connection.on('connected', function(){
    console.log('Monngoose 连接成功：' + DB_URL)

    //表
    var schema = new mongoose.Schema({
        username: { type: String },
        userpwd: { type: String },
        userage: { type: Number },
        job: { type: String },
        logindate: { type: Date }
    });

    //模型
    var Model = mongoose.model('Model', schema);

    //实例化模型
    var doc1 = new Model({ 
        username: 'lili',
        userpwd: '888',
        userage: '22',
        job: 'developmentEngineer',
        logindate: new Date()
    });
    //插入
    doc1.save();  //这一步骤是必须的！save函数中可以使用cb

    //查找
    Model.find(function(err, user){           //model可以操作数据库，所以是Model
        console.log(user)
    })
    
    //更新
    var wherestr = {username: 'lili'};       //指定是更新哪条数据
    var updatestr = {userpwd: '666'};        //更新的数据
    Model.update(wherestr, updatestr, function(err, res){
        if(err){
            console.log(err)
        }else{
            console.log('res:' + res)
        }
    })

})

//数据库连接异常
mongoose.connection.on('error', function(err){
    console.log('连接失败：' + err)
})

//断开连接
mongoose.connection.on('disconnected', function(){
    console.log('断开连接！')
})

module.exports = mongoose;







