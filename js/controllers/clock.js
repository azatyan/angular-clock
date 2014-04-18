'use strict'

var app = angular.module('app', [])

app.controller('ClockController', function ($scope, $interval) {

    // Function for updating the clock
    $scope.updateClock = function () {
        $scope.time = new Date()
        $scope.updateSecondsArrow()
        $scope.updateMinuteArrow()
        $scope.updateHourArrow()
    }
    // Set Clock Update Interval
    $interval($scope.updateClock, 1000)

})