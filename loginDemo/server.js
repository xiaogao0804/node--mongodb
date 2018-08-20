var express = require('express')
var bodyParser = require('body-parser')
var app = express()

//在地址栏输入http://localhost:3003时， 返回index.html文件
app.get('/', function(req, res){
    res.sendfile("index.html")
})

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//在登陆页面index.html, 点击‘登陆’按钮，发出post请求，把用户名和密码发送给后台，后台会给出响应，把请求的参数通过log打印出来
//处理post请求
app.post('/login', function(req, res){
    var user_name = req.body.user;
    var password = req.body.password;
    console.log('user name = ' + user_name, password )
    var obj={
        code:'200',
        message:'success'
    }
    var strObj=JSON.stringify(obj)
    res.end(strObj)                      //没有数据返回给客户端用res.end(),里面必须是字符串的形式,有数据返回给客户端用res.send()
})

app.listen(3003, function(){
    console.log('start on port 3003')
})