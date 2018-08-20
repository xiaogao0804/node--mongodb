var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http){

    //查询数据
    $http.get('/contactList').success(function(res){
        console.log('获取到数据：' + res)
        $scope.contactList = res.contactList
    });

    //增加一条记录
    $scope.addContact = function(){
        console.log('点击！')
        console.log($scope.contact)
        $http.post('/contactList', $scope.contact).success(function(res){
            console.log(res)
            alert('插入成功！')
            $http.get('/contactList').success(function(res){
                console.log('获取到数据：' + res)
                $scope.contactList = res.contactList
                $scope.contact = ""
            });
        })
    }

    //删除一条记录
    $scope.remove = function(id){
        console.log(id)
        $http.delete('/contactList/' + id).success(function(res){
            console.log('删除成功')
            window.location.reload();
        })
    }

    //更改数据
    $scope.edit = function(id){
        console.log(id)
        $http.get('/contactList/' + id).success(function(res){
            $scope.contact = res
        })
    }

    //更新数据
    $scope.update = function(){
        console.log('更新id', $scope.contact.contactList[0]._id)
        $http.put('/contactList/' + $scope.contact.contactList[0]._id, $scope.contact).success(function(res){
            window.location.reload()
        })
    }
}])