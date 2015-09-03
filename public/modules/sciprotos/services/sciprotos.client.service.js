'use strict';

//Sciprotos service used to communicate Sciprotos REST endpoints
angular.module('sciprotos').factory('Sciprotos', ['$resource',
    function ($resource) {
        //var resource = $resource();
        return $resource('sciprotos/:sciprotoId',
            {sciprotoId: '@_id'},
            {update: {method: 'PUT'}}
        );
    }
]);