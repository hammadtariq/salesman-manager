/// <reference path='../../../typings/tsd.d.ts' />
// var Firebase = require("firebase");
module.exports = function (app, fb, Q) {
    // var ref = new fb("https://salewhat.firebaseio.com");
    // var companyRef = new fb("https://salewhat.firebaseio.com/company");
    fb.initializeApp({
        serviceAccount: "./salewhat-bc6e11cf7788.json",
        databaseURL: "https://salewhat-55e66.firebaseio.com/"
    });
    var Ref = fb.database().ref();
    var usersRef = fb.database().ref("user");
    var companyRef = fb.database().ref("company");
    app.api.signup = function (req, res) {
        if (!req.body.isAdmin && req.body.isAdmin !== false) {
            req.body.isAdmin = true;
            console.log("req.body.isAdmin in if:", req.body.isAdmin);
            delete req.body.re_pass;
            savingData(req.body, null);
        } else {
            console.log(req.body.ownerId);
            usersRef.child(req.body.ownerId).once("value", function (snapshot) {
                console.log(snapshot.key);
                app.db.funct.getCompany(snapshot.val().userId, Q)
                    .then((company) => {
                        req.body.companyKey = req.body.companyId;
                        req.body.companyId = company._id;
                        savingData(req.body, company)
                            .then((data)=> {
                                res.send(data);
                            }, (error)=> {
                                res.send(error);
                            })
                    }, (companyErr) => {
                        console.log(companyErr);
                    })

            });
        }


    };
    function savingData(body, user) {
        var deferred = Q.defer();
        var userRef = usersRef.child(body.response.uid.toString());
        userRef.set({
            name: body.name,
            email: body.email,
            username: body.username,
            isAdmin: body.isAdmin,
            createdAt: fb.database.ServerValue.TIMESTAMP,
            updatedAt: fb.database.ServerValue.TIMESTAMP
        }, (err, data)=> {
            if (err) {
                console.log("err", err);
            } else {
                console.log("req.body.response", body.response.uid);
                app.db.funct.signUp(body, body.response, Q)
                    .then(function (data) {
                        // console.log("Successfully created user account in mongodb:", data);
                        if (body.isAdmin == true) {
                            var companyKey = companyRef.push();
                            companyKey = companyKey.toString().split('/').pop();
                            console.log("req.body", body);
                            console.log("new companyKey", companyKey);
                            console.log("req.body.company", body.company);
                            companyRef.child(companyKey).child(body.company).set({
                                name: body.company,
                                ownerId: body.response.uid,
                                createdAt: fb.database.ServerValue.TIMESTAMP,
                                updatedAt: fb.database.ServerValue.TIMESTAMP
                            }, function (error) {
                                if (error) {
                                    console.log("firebase error in creatig company: 70", error);
                                    deferred.reject({status: false, message: 'Error creating company', error: error});
                                } else {
                                    console.log("==========================");
                                    userRef.update({
                                        company: body.company,
                                        companyId: companyKey,
                                        userId: data._id
                                    });
                                    app.db.funct.company(data.name, data._id, Q)
                                        .then((obj)=> {
                                            console.log("Successfully created Company in mongodb:81", obj);
                                            deferred.resolve({status: true, message: 'successfully signup', data: obj});
                                        }, (err)=> {
                                            console.log("company can not created : 84", err);
                                            deferred.reject({
                                                status: false,
                                                message: 'Error creating company',
                                                error: err
                                            });
                                        })
                                }
                            });

                        } else {
                            console.log("req.body", body);
                            console.log("req.body.response.uid.toString()", body.response.uid.toString());
                            userRef.update({
                                companyId: body.companyId,
                                ownerId: body.ownerId
                            }, (err, user)=> {
                                console.log("Err", err);
                                console.log("user", user);
                                // console.log("=========", companyRef.child(body.companyId).child("salesmen").child(body.response.uid.toString()).toString());
                                companyRef.child(body.companyKey).child("salesmen").child(body.response.uid).update({
                                    name: body.name,
                                    email: body.email,
                                    username: body.username,
                                    isAdmin: body.isAdmin,
                                    createdAt: fb.database.ServerValue.TIMESTAMP,
                                    updatedAt: fb.database.ServerValue.TIMESTAMP
                                }, (error, company) => {
                                    console.log("error", error);
                                    console.log("company", company);
                                    deferred.resolve({status: true, message: 'successfully signup', data: data});

                                });
                            });

                        }
                        // res.send({status: true, message: 'successfully signup', data : data});
                        // ref.child("users").child(userData.uid).child(companyKey).set({company:data.company})
                    }, (err)=> {
                        console.log("authentication unsuccessful", err);
                        deferred.reject({status: false, message: 'authentication unsuccessful', error: err});
                    });
            }
        });
        return deferred.promise;
    }

    app.api.login = function (req, res) {
        console.log(req.body.email);
        if (req.body.authData.password && req.body.authData.password.isTemporaryPassword === true) {
            res.send({
                status: true, message: 'Temporary Password', data: {
                    uid: req.body.authData.auth.uid,
                    email: req.body.email,
                    tempPass: req.body.password,
                    tempPassTrue: req.body.authData.password.isTemporaryPassword,
                    path: '/resetPassword'
                }
            })
        }
        else {
            var obj = {
                user: undefined,
                authData: undefined
            };
            // if(req.body.isAdmin === false){

            usersRef.child(req.body.authData.uid).update({
                login: true,
                updatedAt: fb.database.ServerValue.TIMESTAMP
            }, function(err, data){
                usersRef.child(req.body.authData.uid).once('value', function (snap) {
                    obj.user = snap.val();
                    delete obj.user['isAdmin'];
                }).then(function () {
                    console.log("Authenticated successfully with payload:", req.body.authData);
                    res.send({status: true, message: 'Login successfull!!', obj: obj, authData: req.body.authData})
                });

            });

        }
    };
    /*     app.api.forgotPass = function(req, res){
     console.log(req.body);
     ref.resetPassword({
     email: req.body.email
     }, (error) => {
     if (error === null) {
     console.log("Password reset email sent successfully");
     res.send({status: false, message: 'Password reset email sent successfully'})
     } else {
     console.log("Error sending password reset email:", error);
     res.send({status: false, message: 'Error sending password reset email', error : error});

     }
     });

     }
     app.api.resetPass = function(req, res){
     console.log(req.body);
     ref.changePassword({
     email: req.body.email,
     oldPassword: req.body.oldPass,
     newPassword: req.body.password
     }, function (error) {
     if (error === null) {
     console.log("Password changed successfully");
     res.send({status: true, message: 'Password changed successfully', path: "/dashboard"});
     // res.json({path: "/dashboard"});
     } else {
     console.log("Error changing password:", error);
     // res.json({Error: error});
     res.send({status: false, message: 'Password change unsuccessfully', Error: error});
     }
     });

     }*/
    app.api.logout = function (req, res) {
        usersRef.child(req.body.uid).update({
            login: false
        }, (error, authData)=> {
            if (error) {
                res.send({status: false, message: 'logout unsuccessful', error: error});
                // res.json({'error': error})
            }
            else {
                // res.json(authData)
                res.send({status: true, message: 'logout successfully'});
            }
        });
    }
};