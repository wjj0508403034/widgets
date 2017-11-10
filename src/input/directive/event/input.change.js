'use strict';

angular.module('huoyun.widget').directive('widgetsEventsInputChanged', ["InputControl",
  function(InputControl) {
    return {
      restrict: 'A',
      require: "ngModel",
      link: function($scope, ele, attrs, ngModelController) {
        if ($scope.options instanceof InputControl) {
          var inputControl = $scope.options;
          var oldVal = inputControl.getValue();
          var newVal = oldVal;

          ngModelController.$viewChangeListeners.push(function() {
            newVal = inputControl.getValue();
            inputControl.raiseEvent("valueChanged", [newVal, oldVal]);
            oldVal = newVal;
          });
        }

      }
    }
  }
]);