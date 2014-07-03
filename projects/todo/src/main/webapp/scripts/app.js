var app = angular.module('todo', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute'
]);
 
app.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'views/list.html',
        controller: 'ListCtrl'
    }).when('/create', {
        templateUrl: 'views/create.html',
        controller: 'CreateCtrl'
    }).otherwise({
        redirectTo: '/'
    })
});
 
app.controller('ListCtrl', function ($scope, $http) {
    $http.get('/todo/rest/tasks').success(function (data) {
        $scope.todos = data;
    }).error(function (data, status) {
        console.log('Error ' + data)
    })
 
    $scope.todoStatusChanged = function (todo) {
        console.log(todo);
        if(todo.done)
        	todo.completedOn = new Date();
        else
        	todo.completedOn = null;
        $http.put('/todo/rest/tasks/' + todo.id, todo).success(function (data) {
            console.log('status changed');
        }).error(function (data, status) {
            console.log('Error ' + data);
        });
    }
});
 
app.controller('CreateCtrl', function ($scope, $http, $location) {
    $scope.todo = {
        done: false
    };
 
    $scope.createTodo = function () {
        console.log($scope.todo);
        $http.post('/todo/rest/tasks', $scope.todo).success(function (data) {
            $location.path('/');
        }).error(function (data, status) {
            console.log('Error ' + data)
        })
    }
});