'use strict';

angular.module('huoyun.widget').directive('widgetsTimePicker', ["DatePickerControl",
  function(DatePickerControl) {
    return {
      restrict: 'A',
      scope: {
        options: "="
      },
      templateUrl: 'timepicker/time.picker.html',
      link: function($scope, elem, attrs) {

        var control = $scope.options;
        control
          .on("__scrollingStart", function() {
            elem.find(".list-hours").off("scroll", ScrollEventHandler);
          }).on("__scrollingEnd", function() {
            elem.find(".list-hours").on("scroll", ScrollEventHandler);
          });


        function ScrollEventHandler(event) {
          event.preventDefault();
          event.stopPropagation();
          control.__scroll(this.scrollTop);
        }
      }
    }
  }
]);