(function () {
    angular.module('myApp')
        .controller('headerController', function ($scope, $http, $q, $state, $timeout, authService, $mdSidenav, $log) {
            $scope.token;
            $scope.profile = {
                name: '',
                select: '',
                options: ['Profile', 'Setting']
            }

            $timeout(function () {
                $scope.token = authService.getIsToken();
            }, 0);
            $scope.toggleLeft = function () {
                $mdSidenav('left').toggle()
                    .then(function () {
                        $log.debug("toggle left is done");
                    });
            };
            $scope.logout = function () {
                console.log("logout");
                var obj = {name: 'pari'};
                authService.logOut(obj, $q)
                    .then(function (res) {
                        console.log("in success")
                        $state.go("login");
                        $scope.token = false;
                    }, function (error) {
                        console.log("in error")

                    })
            }
            $scope.gotoCompany = function () {
                $state.go("dashboard.company")
                $scope.showView = true;
            }
            $scope.viewProducts = function () {
                $state.go("dashboard.products")
                $scope.showView = true;
            }
            $scope.viewSalesmen = function () {
                $state.go("dashboard.salesman")
                $scope.showView = true;
            }
            $scope.viewOrders = function () {
                $state.go("dashboard.order");
                $scope.showView = true;
            }
        })
})()