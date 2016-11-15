/// <reference path='../../../typings/tsd.d.ts' />
module.exports = function (app, fb, Q) {
    require('./routes')(app, fb, Q);
};
