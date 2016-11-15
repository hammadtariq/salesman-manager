/// <reference path='../../../typings/tsd.d.ts' />
module.exports = function (app, mongoose) {
    var config = {
        production: {
            'mongodbURL': "mongodb://admin:admin@ds153845.mlab.com:53845/salewhat",
            'apiBaseUrl': 'https://salewhat.herokuapp.com/api/',
            'baseUrl': 'https://salewhat.herokuapp.com/',
            'apiKey': "AIzaSyALrk_AvUosPOYvJVe817cgrG-DGXJ4OXg",
            'authDomain': "salewhat-55e66.firebaseapp.com",
            'databaseURL': "https://salewhat-55e66.firebaseio.com",
            'storageBucket': "salewhat-55e66.appspot.com",
            'messagingSenderId': "867265181900"


        },
        development: {
            'mongodbURL': "mongodb://admin:admin@ds153845.mlab.com:53845/salewhat",
            'apiBaseUrl': 'http://localhost:3000/api/',
            'baseUrl': 'http://localhost:3000/',
            'apiKey': "AIzaSyALrk_AvUosPOYvJVe817cgrG-DGXJ4OXg",
            'authDomain': "salewhat-55e66.firebaseapp.com",
            'databaseURL': "https://salewhat-55e66.firebaseio.com",
            'storageBucket': "salewhat-55e66.appspot.com",
            'messagingSenderId': "867265181900"

        }
    };

    process.env.NODE_ENV = process.env.NODE_ENV || "production";
    //process.env.NODE_ENV = process.env.NODE_ENV || "development";
    console.log("Node Environment = " + process.env.NODE_ENV);

    app.config = config[process.env.NODE_ENV];

    require('./mongoose')(app, mongoose);

};