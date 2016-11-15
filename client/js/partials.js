(function () {
    angular.module('myApp')
        .controller('mainController', function ($scope, $http, $q, $state, authService, $rootScope, $timeout, $interval) {
            $scope.showView = false;
            $scope.gotoCompany = function () {
                $state.go("dashboard.company");
                $scope.showView = true;
            };
            $scope.viewProducts = function () {
                $state.go("dashboard.products");
                $scope.showView = true;
            };
            $scope.viewSalesmen = function () {
                $state.go("dashboard.salesman");
                $scope.showView = true;
            };
            $scope.viewOrders = function () {
                $state.go("dashboard.order");
                $scope.showView = true;
            }
        })
        .controller('productsController', function ($scope, $http, $q, $state, authService, $rootScope, $mdDialog, $firebaseArray, $firebaseObject, miscService) {
            miscService.productArr.$loaded().then(function () {
                console.log("miscservice working in partial js", miscService.productArr);
                $scope.products = miscService.productArr;
            });
            $scope.showAddProduct = function (ev) {
                $mdDialog.show({
                    controller: DialogController,
                    templateUrl: 'templates/addProduct.html',
                    targetEvent: ev
                })
                    .then(function (answer) {
                        $scope.alert = 'You said the information was "' + answer + '".';
                    }, function () {
                        $scope.alert = 'You cancelled the dialog.';
                    });

                function DialogController($scope, $mdDialog) {
                    console.log(authService.getCompanyKey());
                    $scope.product = {
                        name: '',
                        category: '',
                        quantity: '',
                        price: ''
                    };
                    $scope.hide = function () {
                        $mdDialog.hide();
                    };
                    $scope.cancel = function () {
                        $mdDialog.cancel();
                    };
                    $scope.send = function () {
                        var pushID = miscService.productsRef.push();
                        pushID = pushID.toString().split("/").pop();
                        miscService.productsRef.child(pushID).set($scope.product, function () {
                            miscService.companyRef.child(pushID).set($scope.product, function () {
                                $mdDialog.hide();
                            });
                        });
                    };
                }
            };
            $scope.showEditProduct = function (ev, product) {
                $mdDialog.show({
                    controller: DialogController,
                    templateUrl: 'templates/editProduct.html',
                    targetEvent: ev
                })
                    .then(function (answer) {
                        $scope.alert = 'You said the information was "' + answer + '".';
                    }, function () {
                        $scope.alert = 'You cancelled the dialog.';
                    });
                function DialogController($scope, $mdDialog) {
                    console.log(product);
                    var temp = product.$id;
                    $scope.product = {
                        name: product.name,
                        category: product.category,
                        price: product.price,
                        quantity: product.quantity
                    };
                    $scope.hide = function () {
                        $mdDialog.hide();
                    };
                    $scope.cancel = function () {
                        $mdDialog.cancel();
                    };
                    $scope.send = function () {
                        miscService.productsRef.child(temp).update($scope.product);
                        miscService.companyRef.child(temp).update($scope.product);
                        $mdDialog.hide();
                    };
                }
            }
        })
        .controller('ordersController', function ($scope, $http, $q, $state, authService, $rootScope, $firebaseArray, $firebaseObject, miscService, $mdSidenav, $filter) {
            miscService.orderArr.$loaded().then(function () {
                console.log("miscservice working in partial js", miscService.orderArr);
                $scope.orders = miscService.orderArr;

                angular.forEach(miscService.orderArr, function (order, index) {
                    // console.log(order.salesman)
                    miscService.salesmenArr.$loaded().then(function () {
                        var salesman = miscService.salesmenArr.$getRecord(order.salesman);
                        $scope.orders[index].salesmanName = salesman.name;
                        $scope.orders[index].retailerName = salesman.retailers[order.$id].name;
                        console.log($scope.orders[index]);
                    })
                });
            });
            $scope.action = function (order) {
                $scope.order = order;
                $mdSidenav('action-right').toggle();
            };
            $scope.update = function (order) {
                miscService.salesmenArr.$loaded().then(function () {
                    miscService.salesmenRef.child($scope.order.salesman).child('orders').child($scope.order.$id).update({
                        delivered: order.delivered
                    });
                    miscService.ordersRef.child($scope.order.$id).update({delivered: order.delivered});
                    $mdSidenav('action-right').close();
                });
            };
            $scope.close = function () {
                $mdSidenav('action-right').close();
            };
        })
        .controller('salesmenController', function ($scope, $http, $q, $state, authService, $rootScope, $mdDialog, $firebaseArray, $firebaseObject, miscService, $timeout, $mdToast) {

            miscService.salesmenArr.$loaded().then(function () {
                $scope.salesmen = miscService.salesmenArr;
                if ($scope.salesmen.length) {
                    angular.forEach($scope.salesmen[0].orders, function (order) {
                        $scope.pendingOrders++;
                    });
                }
            });

            $scope.pendingOrders = 0;
            $scope.addSalesman = function (ev) {
                $mdDialog.show({
                    controller: DialogController,
                    templateUrl: 'templates/addSalesman.html',
                    targetEvent: ev
                })
                    .then(miscService.toastMSG, miscService.toastMSG);

                function DialogController($scope, $mdDialog) {
                    console.log(authService.getCompanyKey());
                    $scope.salesman = {
                        name: '',
                        email: '',
                        username: 'username',
                        password: '123456',
                        isAdmin: false,
                        companyId: authService.getCompanyKey(),
                        ownerId: authService.getUID()
                    };
                    $scope.hide = function () {
                        $mdDialog.hide();
                    };
                    $scope.cancel = function () {
                        $mdDialog.cancel();
                    };
                    $scope.create = function () {
                        console.log($scope.salesman);
                        $scope.salesman.companyId = authService.getCompanyKey();
                        $scope.salesman.ownerId = authService.getUID();
                        authService.signUp($scope.salesman)
                            .then(function (responseData) {
                                    $mdToast.show(
                                        $mdToast.simple()
                                            .textContent("Created salesman!!")
                                            .hideDelay(3000)
                                    );
                                    // $state.reload();
                                    console.log('create Salesman', responseData);
                                    miscService.getSalesmen();
                                    $mdDialog.hide();
                                },
                                function (responseError) {
                                    $mdToast.show(
                                        $mdToast.simple()
                                            .textContent("Error!!", responseError)
                                            .hideDelay(3000)
                                    );
                                    console.log('Error Salesman', responseError);
                                    $mdDialog.hide();
                                });
                        /*            var pushID = productsRef.push()
                         console.log(pushID.toString())
                         pushID = pushID.toString().split("/").pop()
                         console.log(pushID)
                         productsRef.child(pushID).set($scope.product)
                         productsRef2.child(pushID).set($scope.product)*/

                    };
                }
            };
            $scope.salesmanProfile = function (salesman, index) {
                console.log(salesman);
                miscService.setSalesman(salesman);
                $state.go("dashboard.profile", {"salesmanId": salesman.$id});
            };
        })
        .controller('profileController', function ($scope, $http, $q, $state, authService, $rootScope, $stateParams, miscService, $timeout, $firebaseArray) {
            $scope.pendingOrders = 0;
            $scope.salesmanRetailers = [];
            miscService.salesmenArr.$loaded().then(function () {
                $scope.salesman = miscService.salesmenArr.$getRecord($stateParams.salesmanId);
                for (var key in $scope.salesman.retailers) {
                    $scope.salesmanRetailers.push($scope.salesman.retailers[key]);
                }
                for (var key in $scope.salesman.orders) {
                    $scope.pendingOrders++;
                }
            })
        });
})();