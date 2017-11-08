'use strict';

angular.module('huoyun.widget').directive('widgetsEventsInputChanged', ["InputControl",
  function(InputControl) {
    return {
      restrict: 'A',
      require: "ngModel",
      link: function($scope, ele, attrs, ctrl) {
        var oldVal = $scope.value;
        var newVal = oldVal;
        ctrl.$viewChangeListeners.push(function() {
          newVal = $scope.value;
          if ($scope.options instanceof InputControl) {
            $scope.options.onValueChanged(newVal, oldVal);
          }

          oldVal = newVal;
        });
      }
    }
  }
]);