(function () {
    angular.module('myApp')
        .controller('dashboardController', function ($scope, $http, $q, $state, authService, $rootScope, $mdSidenav, $log, $timeout) {
            $scope.token = authService.getIsToken();
            $state.go('dashboard.main')
            $scope.profile = {
                name: '',
                select: '',
                options: ['Profile', 'Setting']
            }

            $scope.toggleLeft = function () {
                $mdSidenav('left').toggle()
                    .then(function () {
                        $log.debug("toggle left is done");
                    });
            };
            $scope.logout = function () {
                var obj ={}
                authService.logOut(obj, $q)
                    .then(function (res) {
                        $state.go("login");
                        $scope.token = false;
                    }, function (error) {
                        console.log("in error")

                    });
            };
            $scope.gotoCompany = function () {
                $state.go("dashboard.company");
                $scope.toggleLeft();
                $scope.showView = true;
            };
            $scope.viewProducts = function () {
                $state.go("dashboard.products");
                $scope.toggleLeft();
                $scope.showView = true;
            };
            $scope.viewSalesmen = function () {
                $state.go("dashboard.salesman");
                $scope.toggleLeft();
                $scope.showView = true;
            };
            $scope.viewOrders = function () {
                $state.go("dashboard.order");
                $scope.toggleLeft();
                $scope.showView = true;
            }
        })
})();