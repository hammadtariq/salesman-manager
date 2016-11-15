(function () {
    angular.module('myApp')
        .controller('resetPasswordController', ResetPasswordController);
    function ResetPasswordController($scope, $http, $q, authService, $state) {
        $scope.resetPass = {
            password: '',
            cnfrmPass: ''
        }

        $scope.resetPassword = function () {
            var obj = {
                password: $scope.resetPass.password,
                oldPass: sessionStorage.getItem('tempPass'),
                uid: sessionStorage.getItem('uid'),
                email: sessionStorage.getItem('email')
            }
            //authService.forgotPassword($scope.forgotPass)
            $http.post('/resetPass', obj)
                .then(function (responseData) {
                        //$state.go('/login');
                        console.log('responseData', responseData);
                        if (responseData.data.path === '/dashboard') {
                            console.log('responseData', responseData)
                            $state.go('dashboard')
                            // window.location.assign("http://localhost:4000/#/dashboard");
                        }
                        else {
                            console.log("error");
                        }
                    },
                    function (responseError) {
                        console.log('responseError', responseError)
                    })
        }
    }
})()