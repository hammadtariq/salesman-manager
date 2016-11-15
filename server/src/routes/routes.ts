 /// <reference path='../../../typings/tsd.d.ts' />
/*import {signUp} from "../db/db";
 import {company} from "../db/db";*/
var path = require('path');
//var Q = require("q");
module.exports = function (app, fb, Q) {
    app.get('/', function(req, res){
        console.log('__dirname', __dirname)
        res.render('index.html');
    })
    //------------  Authentication start -----------//
    //----------  get ---------//
    //app.get('/resetPassword',(req, res) => {
    //res.render('../client/templates/resetPassword/resetPassword.html');
    //});

    //----------  post ---------//
    app.post('/api/signup', app.api.signup);
    app.post('/api/login', app.api.login);
    // app.post('/api/forgotPass', app.api.forgotPass);
    // app.post('/api/resetPass', app.api.resetPass);
    app.post('/api/logout', app.api.logout);


    //------------  Authentication end -----------//

};
