/// <reference path='../../../typings/tsd.d.ts' />
module.exports = function (app, fb, Q) {
    app.api = {};

    require('./authController')(app, fb, Q)
};