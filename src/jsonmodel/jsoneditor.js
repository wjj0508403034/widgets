'use strict';

angular.module('huoyun.widget').directive('widgetsJsonEditor', [
  function() {
    return {
      restrict: 'A',
      scope: {
        options: "=",
        value: "=ngModel"
      },
      templateUrl: 'jsonmodel/jsoneditor.html',
      link: function($scope, elem, attrs) {

      }
    }
  }
]);

angular.module('huoyun.widget').directive('widgetsJsonPretty', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, ngModel) {

      if (ngModel) {
        //view --> model (change date to string)
        ngModel.$parsers.push(function(viewValue) {
          try {
            return JSON.parse(viewValue);
          } catch (ex) {
            return viewValue;
          }
        });

        // model --> view (change string to date)
        ngModel.$formatters.push(function(modelValue) {
          if (typeof modelValue === "object") {
            return JSON.stringify(modelValue, null, 2);
          }

          return modelValue;
        });
      }
    }
  };
});