/// <reference path='../../../typings/tsd.d.ts' />
//var mongoose = require("mongoose");
/*mongoose.connect('mongodb://user:user@ds047865.mongolab.com:47865/salesmanapp');
 var db = mongoose.connection;
 db.on('error', console.error.bind(console, 'connection error:'));
 db.on('open', function() {
 // we're connected!
 console.log("db connected")
 });*/
module.exports = function (app, mongoose) {

    var Schema = mongoose.Schema;

    //====================
    // signUp Schema
    //====================
    var signUpSchema = new Schema({
        // _id         : {type: Schema.ObjectId, unique : true, required : true},
        name: String,
        email: {type: String, unique: true, required: true},
        username:{type: String, required: true},
        companyId: {type: mongoose.Schema.Types.ObjectId, ref: "Company"},
        password: {type: String, required: true},
        token: {type: String, required: true},
        createdAt: {type: Date, Default: Date.now()}
    });

    //====================
    // login Schema
    //====================
    var loginSchema = new Schema({
        // _id         : {type: Schema.ObjectId, unique : true, required : true},
        // name 	    : String,
        // email 		: {type: String, unique : true, required : true},
        // username    : String,
        // company     : String,
        // password    : String,
        // token       : String,
        // loginAt 	: {type : Date, default : Date.now()}
    });


    // var CompanySchema = new Schema({
    //     salesman: {type: mongoose.Schema.Types.ObjectId, ref: "Users"}, //Reference Population
    //     name: String,
    //     lastUpdateAt: {type: Date, default: Date.now()}
    // });

    app.db.model('User', signUpSchema);
    // app.db.model('Company', CompanySchema);
    //app.db.model('User', userSchema);
};
/*
 export {signUpSchema}
 export {loginSchema}
 export {CompanySchema}*/
