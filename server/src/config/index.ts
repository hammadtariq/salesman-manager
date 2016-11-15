/// <reference path='../../../typings/tsd.d.ts' />
module.exports = function (app, mongoose, firebase) {
    require('./config')(app, mongoose);
    require('./firebase')(app, firebase);
};