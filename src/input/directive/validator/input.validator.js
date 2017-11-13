'use strict';

angular.module('huoyun.widget').directive('widgetsInputValidator', ["InputControl",
  function(InputControl) {
    return {
      restrict: 'A',
      require: "ngModel",
      link: function($scope, ele, attrs, ngModelController) {
        if ($scope.options instanceof InputControl) {
          var inputControl = $scope.options;
          ngModelController.$viewChangeListeners.push(function() {
            inputControl.validator();
          });
        }
      }
    }
  }
]);