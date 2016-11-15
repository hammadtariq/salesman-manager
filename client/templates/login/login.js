(function () {
    angular.module('myApp')
        .controller('loginController', LoginController);
    function LoginController($scope, $http, $q, $state, authService, $mdToast) {
        $scope.loging = false;
        var token = localStorage.getItem('token');
        if (token) {
            console.log("already signedin");
            $state.go('dashboard');
        }
        $scope.userLogin = {
            email: null,
            password: null
        };
        $scope.login = function () {
            if ($scope.userLogin == undefined) {
                console.log("$scope.userLogin == undefined")
            }
            else if (isEmpty($scope.userLogin) == false) {
                console.log("empty object")
            } else {
                $scope.loging = true;
                authService.logIn($scope.userLogin, $q)
                    .then(function (responseData) {
                            if (responseData.status) {
                                authService.setToken(responseData.authData.stsTokenManager.accessToken, responseData.authData.uid);
                                authService.setCompany(responseData.obj.user.companyId);
                                $mdToast.show(
                                    $mdToast.simple()
                                        .textContent(responseData.message)
                                        .position('top')
                                        .hideDelay(3000)
                                );
                                $state.go('dashboard');
                            } else if (responseData.data.path) {
                                // authService.setCompany();
                                var collection = responseData.data;
                                for (var key in collection) {
                                    sessionStorage.setItem(key, collection[key]);
                                }
                                $state.go('resetPassword');
                                // window.location = ('/resetPassword');
                            }
                            else if (responseData.code === "INVALID_PASSWORD") {
                                alert("invalid username or password")

                            } else {
                                console.log('status false', responseData)
                            }
                        },
                        function (responseError) {
                            console.log('responseError', responseError)
                        });
            }
        };
        function isEmpty(object) {
            for (var key in object) {
                if (object.hasOwnProperty(key) && object[key] == null) {
                    return false;
                }
            }
            return true;
        }
    }
})()