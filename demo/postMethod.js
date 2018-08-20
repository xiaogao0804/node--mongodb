var express = require('express')
var bodyParser = require('body-parser')
var app = express()

app.use(bodyParser.urlencoded({extended: false}))  //处理utf-8编码的数据
app.use(bodyParser.json())      //处理json数据

//通过post路由来处理post请求
app.post('handle', function(req, res){
    var var1 = req.body.var1
    var var2 = req.body.var2
})