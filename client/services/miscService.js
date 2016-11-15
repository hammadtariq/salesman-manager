(function () {
    angular.module('myApp')
        .service('miscService', function ($http, $q, $state, $stateParams, $firebaseArray, authService, $mdToast, appConfig) {
            var self = this;
            // self.companyRef = new Firebase('https://salewhat.firebaseio.com/products/' + authService.getCompanyKey());
            self.companyRef = firebase.database().ref('products/' + authService.getCompanyKey());
            // self.companyRef = firebase.database().ref('products/' + authService.getCompanyKey());
            // self.productsRef = new Firebase('https://salewhat.firebaseio.com/company/' + authService.getCompanyKey() + '/products');
            self.productsRef = firebase.database().ref('company/' + authService.getCompanyKey() + '/products');
            // self.ordersRef = new Firebase('https://salewhat.firebaseio.com/company/' + authService.getCompanyKey() + '/orders');
            self.ordersRef = firebase.database().ref('company/' + authService.getCompanyKey() + '/orders');
            // var salesmanRef = new Firebase('https://salewhat.firebaseio.com/company/' + authService.getCompanyKey() + '/salesmen');
            var salesmanRef = firebase.database().ref('company/' + authService.getCompanyKey() + '/salesmen');
            // self.salesmenRef = new Firebase('https://salewhat.firebaseio.com/company/' + authService.getCompanyKey() + '/salesmen');
            self.salesmenRef = firebase.database().ref('company/' + authService.getCompanyKey() + '/salesmen');


            self.companyArr = $firebaseArray(self.companyRef);
            self.productArr = $firebaseArray(self.productsRef);
            self.orderArr = $firebaseArray(self.ordersRef);
            self.salesmenArr = $firebaseArray(self.salesmenRef);

            self.getSalesmen = function () {
                if (self.salesmenArr) {
                    return self.salesmenArr;
                } else {
                    return self.salesmenArr.$loaded();
                }
            };
            self.getProductArr = function ($q) {
                var deferred = $q.defer();
                self.productArr.$loaded().then(function () {
                    deferred.resolve(self.productArr);
                    console.log("miscservice working", self.productArr);

                });
                return deferred.promise;
            };
            var syncArr = $firebaseArray(self.salesmenRef);

            var salesman = '';
            this.partials = [];
            self.setSalesman = function (saleman) {
                salesman = saleman;
            };
            self.getSalesman = function () {
                if (!salesman) {
                    syncArr.$loaded().then(function () {
                        console.log('salesman not found');
                        salesman = syncArr.$getRecord($stateParams.salesmanId);
                    });
                    return salesman;
                }
                console.log($stateParams.salesmanId);
                return salesman;
            };
            self.toast = function (error) {
                if (error) {
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent("Failed!!", error)
                            .position('right')
                            .hideDelay(3000)
                    );
                }
                else {
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent("Success!!")
                            .position('right')
                            .hideDelay(3000)
                    );
                }
            };
            self.toastMSG = function (msg) {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent(msg)
                        .position('right')
                        .hideDelay(3000)
                );
            };
        })
})();