(function () {
    angular.module('myApp')
        .service('authService', function ($http, $q, $state, appConfig) {
            var ref = firebase.database().ref();
            // var isToken;
            var self = this;
            var companyKey, companyName;
            self.getUID = function () {
                return localStorage.getItem("uid");
            };
            self.getToken = function () {
                return localStorage.getItem("token");
            };
            self.setToken = function (token, uid) {
                localStorage.setItem("token", token);
                localStorage.setItem("uid", uid);
                // isToken = true;
            };
            self.getIsToken = function () {
                return localStorage.getItem("token") ? true : false;
            };
            self.setIsToken = function (value) {
                localStorage.removeItem("token");
                // isToken = false;
            };
            self.getCompany = function () {
                return companyName;
            };
            /*      this.getCompanyKey = function () {
             if(companyKey == undefined){
             var uid = localStorage.getItem('uid');
             console.log(uid);
             console.log((ref.child("users").child(uid)).toString());
             var Ref = new Firebase('https://salewhat.firebaseio.com/users/'+uid);
             Ref.once("value", function(snapShot){
             //self.setCompany(snap.val().company);
             console.log(snapShot.val());
             companyName =  snapShot.val().company;
             companyKey  =  snapShot.val().companyId;
             localStorage.setItem("companyKey",snapShot.val().companyId)
             },function (err) {
             console.log("error", err)
             });
             return companyKey;
             }
             return companyKey;
             };*/
            self.getCompanyKey = function () {
                if (companyKey) {
                    return companyKey
                } else if (!localStorage.getItem("companyKey")) {
                    // companyKey = localStorage.getItem("companyKey")
                    var uid = localStorage.getItem("uid");
                    ref.child("users").child(uid).on("value", function (snap) {
                        // console.log(snap.val())
                        companyName = snap.val().company;
                        companyKey = snap.val().companyId;
                        localStorage.setItem("companyKey", companyKey)
                    });
                    console.log("company key not found in localStorage");
                    return companyKey;
                }
                return localStorage.getItem("companyKey");
            };
            self.setCompany = function (company) {
                // company.key ? companyKey = company.key : company.key
                // companyKey = company.companyId;
                // companyName = company.company;
                // localStorage.setItem("companyKey", companyKey)
                localStorage.setItem("companyKey", company)
            };
            this.signUp = function (obj) {
                var deferred = $q.defer();
                firebase.auth().createUserWithEmailAndPassword(obj.email, obj.password).then(function (success) {
                    console.log("success", success);
                    obj.response = success;
                    $http.post(appConfig.apiBaseUrl + 'signup', obj)
                        .success(function (data) {
                            deferred.resolve(data);
                            console.log('signup data: ' + JSON.stringify(data));
                        })
                        .error(function (data) {
                            deferred.reject(data);
                            console.log('signup Error: ' + JSON.stringify(data));
                        });
                }, function (error) {
                    console.log("error", error);
                    deferred.reject(error)
                });
                return deferred.promise;
            };
            this.logIn = function (obj, $q) {
                var deferred = $q.defer();
                firebase.auth().signInWithEmailAndPassword(obj.email, obj.password)
                    .then(function (responseData) {
                        $http.post(appConfig.apiBaseUrl + 'login', {authData: responseData})
                            .success(function (data) {
                                console.log('login data: ');
                                console.log(data);
                                // self.setCompany(data.obj.user);
                                deferred.resolve(data);

                                //$state.go('resetPassword');

                                //            console.log('login data: ' + JSON.stringify(data));
                            })
                            .error(function (data) {
                                deferred.reject(data);
                                //console.log('login Error: ' + JSON.stringify(data));
                            });

                    }, function (responseError) {
                        console.log("responseError", responseError);
                    });
                return deferred.promise;
            };
            this.forgotPassword = function (emailObj) {
                var deferred = $q.defer();
                $http.post(appConfig.apiBaseUrl + 'forgotPass', emailObj)
                    .success(function (data) {
                        deferred.resolve(data);
                        console.log(' data: ' + JSON.stringify(data));
                    })
                    .error(function (data) {
                        deferred.reject(data);
                        console.log(' Error: ' + JSON.stringify(data));
                    });
                return deferred.promise;
            };
            this.logOut = function (obj, $q) {
                var deferred = $q.defer();
                obj.uid = localStorage.getItem("uid");
                $http.post(appConfig.apiBaseUrl + 'logout', obj)
                    .success(function (responseData) {
                        console.log("responseData", responseData);
                        localStorage.clear();
                        localStorage.removeItem("uid");
                        // isToken = false;

                        deferred.resolve(responseData);
                    })
                    .error(function (responseErr) {

                        console.log("in error", responseErr);
                        deferred.reject(responseErr);

                    });
                return deferred.promise;
            }
        })
})()