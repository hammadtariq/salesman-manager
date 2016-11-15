(function () {
    angular.module('myApp')
        .controller('signupController', SignupController);
    function SignupController($scope, $http, $q, $state, authService, $mdToast) {
        $scope.signingup = false;
        $scope.userSignup = {
            name: null,
            email: null,
            username: null,
            company: null,
            password: null,
            re_pass: null
        };
        $scope.signup = function () {
            if($scope.userSignup == undefined){
                console.log("$scope.userSignup == undefined")
            }
            else if (isEmpty($scope.userSignup) == false) {
                console.log("empty object")
            } else {
                $scope.signingup = true;
                authService.signUp($scope.userSignup)
                    .then(function (responseData) {
                        if(responseData.status){
                            console.log('responseData', responseData);
                            $mdToast.show(
                                $mdToast.simple()
                                    .textContent(responseData.message)
                                    .position('right')
                                    .hideDelay(3000)
                            );
                            $state.go('login');
                        } else {
                            console.log('responseData', responseData);
                             $mdToast.show(
                                $mdToast.simple()
                                    .textContent(responseData.error.code)
                                    .position('top')
                                    .hideDelay(3000)
                                );
                             $scope.signingup = false;
                            }
                        },
                        function (responseError) {
                            console.log('responseError', responseError);
                            $mdToast.show(
                                $mdToast.simple()
                                    .textContent(responseError.message)
                                    .position('top')
                                    .hideDelay(3000)
                                );
                             $scope.signingup = false;

                        });
            }
        }
        $scope.gotoLogin = function () {
            $state.go('login');
        }
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