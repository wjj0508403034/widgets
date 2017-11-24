'use strict';

angular.module('huoyun.widget').directive('widgetsDatePicker', ["DatePickerControl",
  function(DatePickerControl) {
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