/// <reference path='../../../typings/tsd.d.ts' />

exports = module.exports = function (app, mongoose) {
    app.db = {};
    mongoose.connect(app.config.mongodbURL);
    app.db = mongoose.connection;
    app.db.on('error', console.error.bind(console, 'connection error:'));
    app.db.once('open', function () {
        // Wait for the database connection to establish, then start the app.
        console.log('db connected!!')
    });
};