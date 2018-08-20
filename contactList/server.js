var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var DB_URL = "mongodb://localhost:27017/contactList"
var app = express();

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

mongoose.connect(DB_URL);       //连接数据库

app.use(express.static(__dirname + "/public/"));

 //连接数据库并插入数据
 mongoose.connection.on('connected', function(){
    console.log('数据库连接成功！');
    //表
    var schema = new mongoose.Schema({
        name: String,
        email: String,
        number: String
    })
    //模型
    var Model = mongoose.model('Model', schema)

    //实例化模型
    var person1 = new Model({ 
        name: 'one',
        email: 'one@email.com',
        number: '000'
    });
    var person2 = new Model({ 
        name: 'two',
        email: 'two@email.com',
        number: '111'
    });
    var person3 = new Model({ 
        name: 'three',
        email: 'three@email.com',
        number: '222'
    });

     //插入
    person1.save();
    person2.save();
    person3.save();




//路由设置并从数据库查找数据
app.get('/contactList', function(req, res){
   // console.log('我接受到了get请求');
    //查找
    Model.find(function(err, contactList){           //model可以操作数据库，所以是Model  contactList是返回的所有文档
        //console.log("数据库",contactList)
        var contactList = contactList
        var obj = {
            code: "200",
            contactList: contactList,
            message: "获取数据成功！"
        }
        res.json(obj)
    })


//插入一条数据
app.post('/contactList', function(req, res){
        //console.log(req.body)
        var personItem = new Model(req.body)            //先将数据表实例化为数据模型
        personItem.save();          //插入到数据库
        var obj = {
            code: "200",
            data: personItem,
            message: '插入成功！'
        }
        res.json(obj)
   })
})


//删除一条数据
app.delete('/contactList/:id', function(req, res){
    var objId={_id: req.params.id}
    var id = new Model(objId)            //new Model里面的数据得是对象形式，不能是单独的字符串 id
    id.remove(id, function(error){
        if(error){
            console.log('错误', error)
        }else{
             console.log('删除成功')
            var obj = {
                code: '200',
                message: '删除成功！'
            }
            res.json(obj)
        }
    })

})


//更改数据
app.get('/contactList/:id', function(req, res){
    var obj_id={_id: req.params.id}
    var o_id = new Model(obj_id)  
    console.log('idobj', o_id)
    Model.findOne(o_id, function(err, contactList){               //find findOne必须用 var Model=mongoose.model('Model', schema)  doc是返回的单个指定的文档
    console.log(contactList)
        res.json({
            code:'200',
            contactList:[contactList],
            message: '编辑成功！'
        })
    })
})

//更新数据
app.put('/contactList/:id', function(req, res){
    var u_id = req.params.id;
    var u_idObj = new Model(u_idObj)
    Model.findByIdAndUpdate(
        {_id: mongoose.mongo.ObjectId(u_id)},
        {$set: {
            name: req.body.name,
            email: req.body.email,
            number: req.body.number
        }},
        function(err, doc){
           res.json(doc)
        }
    )
  })
})



app.listen(3000);
console.log('server running on port 3000');