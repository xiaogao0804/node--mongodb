var express = require('express')
var app = express()
app.get('/user/:id', function(req, res){
    res.send('user is' + req.params.id)
});
//启动服务
app.listen(3000, function(){
    console.log('server is listening')
})