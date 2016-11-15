/// <reference path='../../../typings/tsd.d.ts' />
//var mongoose = require("mongoose");
//var Q = require("q");
/*import {signUpSchema} from './schema'
 import {CompanySchema} from './schema'*/
module.exports = function (app, mongoose, Q) {
    app.db.funct = {};
    app.db.funct.signUp = function (userObj, authData, Q) {
        var deferred = Q.defer();
        userObj.token = authData.uid;
        console.log("userObj", userObj);
        console.log("authData", authData);
        // console.log("userObj", userObj);
        var user = new app.db.models.User(userObj);
        //Lets save it
        user.save((err, user)=> {
            if (err) {
                console.log('db err:', err);
                deferred.reject(err);
            } else {
                deferred.resolve(user);
                console.log('db saved successfully:', user._id);
            }
        });
        return deferred.promise;
    };
    app.db.funct.company = function (name, id, Q) {
        var deferred = Q.defer();
        var obj = {
            ownerId: id,
            name: name,
        };
        //Lets create a new company
        var company = new app.db.models.Company(obj);
        //Lets save it
        company.save((error, company)=> {
            if (error) {
                deferred.reject(error);
                // console.log("company error", error)
            }
            else {
                deferred.resolve(company);
                // console.log("company", company)
            }
        });
        return deferred.promise;
    };
    app.db.funct.getCompany = function (userId, Q) {
        console.log("userId", userId);
        var deferred = Q.defer();
        app.db.models.Company.findById(userId, (error, company)=> {
            if (error) {
                deferred.reject(error);
                // console.log("company error", error)
            }
            else {
                console.log("company", company)
                deferred.resolve(company);
            }
        });
        return deferred.promise;
    }
};

/*
 export {signUp}
 export {company}
 */

