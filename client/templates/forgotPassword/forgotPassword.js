(function () {
    angular.module('myApp')
        .controller('forgotPasswordController', ForgotPasswordController);
    function ForgotPasswordController($scope, $http, $q, authService, $state, $mdToast) {
        $scope.forgotPass = {
            email: ''
        };
        $scope.sendEmail = function () {
            authService.forgotPassword($scope.forgotPass)
                .then(function (responseData) {
                        console.log('responseData', responseData)
                        $mdToast.show(
                            $mdToast.simple()
                                .textContent(responseData.message)
                                .position('top')
                                .hideDelay(3000)
                        );
                        $state.go('login');
                    },
                    function (responseError) {
                        console.log('responseError', responseError)
                    })
        }
    }
})()