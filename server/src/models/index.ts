/// <reference path='../../../typings/tsd.d.ts' />
module.exports = function (app, mongoose) {
    require('./userSchema')(app, mongoose);
    require('./companySchema')(app, mongoose);
};