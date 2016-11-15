angular.module("myApp")
    // used self calling function to assign value in appConfig
    .constant("appConfig",(function (){

        var environment = "production";
        //var environment = "development";

        var config = {
            production : {
                'apiBaseUrl': 'https://salewhat.herokuapp.com/api/',
                'baseUrl' : 'https://salewhat.herokuapp.com/'
            },
            development : {
                'apiBaseUrl': 'http://localhost:3000/api/',
                'baseUrl' : 'http://localhost:3000/'
            }
        };
        return config[environment];
    })());



