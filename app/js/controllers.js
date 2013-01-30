'use strict';

/* Controllers */


function HomeCtrl($scope) {
    $scope.token = Math.random().toString(36).substring(7);

}
//HomeCtrl.$inject = [];


function SessionCtrl($scope, $routeParams) {
    $scope.participants = 0;                                  
    $scope.ws_open = 0;
    $scope.token = $routeParams.token;
    $scope.session_type = $routeParams.sessType;
 
    var describeMediaStreams(session_type) {
        if (session_type === "voice") {
            return {video: false, audio: true}
        } else if(mediaType === "video") {
            return {video: true, audio: true}
        } else {
            console.log("Unknown session type ", session_type);
            return false; 
        }
    };

    var describeMediaConstraints(session_type) {
        if (session_type === "voice") {
            return {
                'mandatory': {
                    'OfferToReceiveAudio':true,
                    'OfferToReceiveVideo':false}};
        } else if(session_type === "video") {
            return {
                'mandatory': {
                    'OfferToReceiveAudio':true,
                    'OfferToReceiveVideo':true}};
        } else {
            console.log("Unknown session type ", session_type);
            return false; 
        }
    };

    var wsSend = function (command, destination, extras) {
        /*   Sends a message to the sins-mq backend. The messages are json 
         * objects with the following mandatory name/value pairs: 
         * - command: SEND, SUBSCRIBE, UNSUBSCRIBE, DISCONNECT.
         * - destination: The destination topic, queue or pair.
         *   Plus any other amount of valid json data which will 
         *   also be passed along.
         */

        var data = {command: command, destination: destination};
        if (typeof extras !== 'undefined') {
            data = $.extend(data, extras);
        }

        if (ws_open === 1) {
            ws.send(JSON.stringify(data));
        } else {
            console.log("ERROR: Websocket not open.");
        }
    };

    var wsOnMessage = function(msg) {
        
    };

    var wsOnOpen = function(msg) {
        /*  After the websocket opens, we'll send a message to the /topic/TOKEN a
         * 
         */
        $scope.ws_open = 1;
        wsSend("SUBSCRIBE", "/topic/"+$scope.token);
        wsSend("SEND", "/topic/"+$scope.token, {action: "userCount"});

    };

    $scope.ws = new WebSocket("ws://" + document.domain + ":5000/sins");
    $scope.ws.onmessage = wsOnMessage;
    $scope.ws.onopen = function(msg) {  };
    $scope.ws.onclose = function(evt) { $scope.ws_open = 0; };
    $scope.ws.onerror = function(evt) { $scope.ws_open = 0; };

}
//SessionCtrl.$inject = [];
