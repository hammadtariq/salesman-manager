angular.module('myApp')
    .config(function ($stateProvider, $urlRouterProvider, $httpProvider, appConfig) {
            $httpProvider.interceptors.push('httpInterceptor');
            if (document.URL != 'https://salewhat.herokuapp.com/resetPassword') {
                $urlRouterProvider.otherwise("/login");
            }
            $stateProvider
            // .state('main', {
            //   url: "/main",
            //   views: {
            //     "header": { templateUrl: "./templates/header/header.html",
            //                  controller: 'headerController' },
            //     ""      : { templateUrl: "./templates/main/main.html",
            //                 controller: 'mainController' }
            //   }
            // })
                .state('login', {
                    url: "/login",
                    templateUrl: "./templates/login/login.html",
                    controller: 'loginController'
                })
                .state('signup', {
                    url: "/signup",
                    templateUrl: "./templates/signup/signup.html",
                    controller: "signupController"
                })
                .state('forgot', {
                    url: "/forgot",
                    templateUrl: "./templates/forgotPassword/forgotPassword.html",
                    controller: "forgotPasswordController"
                })
                .state('resetPassword', {
                    url: "/resetPassword",
                    templateUrl: "./templates/resetPassword/resetPassword.html",
                    controller: "resetPasswordController"
                })
                .state('dashboard', {
                    url: "/dashboard",
                    loginCompulsory: true,
                    views: {
                        "": {
                            templateUrl: "./templates/dashboard/dashboard.html",
                            controller: 'dashboardController'
                        }
                    }

                })
                .state('dashboard.main', {
                    url: "/main",
                    loginCompulsory: true,
                    templateUrl: "./templates/partials/main/main.html",
                    controller: "mainController"
                })
                .state('dashboard.products', {
                    url: "/products",
                    loginCompulsory: true,
                    templateUrl: "./templates/partials/products/products.html",
                    controller: "productsController"
                })
                .state('dashboard.order', {
                    url: "/order",
                    loginCompulsory: true,
                    templateUrl: "./templates/partials/order/order.html",
                    controller: "ordersController"
                })
                .state('dashboard.salesman', {
                    url: "/salesman",
                    loginCompulsory: true,
                    templateUrl: "./templates/partials/salesman/salesman.html",
                    controller: "salesmenController"
                })
                .state('dashboard.company', {
                    url: "/company",
                    loginCompulsory: true,
                    templateUrl: "./templates/partials/company/company.html",
                    controller: "companyController"
                })
                .state('dashboard.profile', {
                    url: "/:salesmanId",
                    loginCompulsory: true,
                    templateUrl: "./templates/partials/profile/profile.html",
                    controller: "profileController"
                })
                .state('profile', {
                    url: "/profile",
                    loginCompulsory: true,
                    views: {
                        "header": {
                            templateUrl: "./templates/header/header.html",
                            controller: 'headerController'
                        },
                        "": {
                            templateUrl: "./templates/partials/profile/profile.html",
                            controller: "ownerProfileController"
                        }
                    }
                })
        })