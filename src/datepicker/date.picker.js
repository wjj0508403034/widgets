'use strict';

angular.module('huoyun.widget').directive('widgetsDatePicker', [
  function() {
    return {
      restrict: 'A',
      scope: {
        options: "="
      },
      templateUrl: 'datepicker/date.picker.html',
      link: function($scope, ele, attrs) {}
    }
  }
]);