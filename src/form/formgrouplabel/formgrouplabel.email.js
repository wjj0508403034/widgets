'use strict';

angular.module('huoyun.widget').directive('widgetsFormGroupLabelEmail', [
  function() {
    return {
      restrict: 'A',
      scope: {
        options: "=",
        value: "=ngModel"
      },
      templateUrl: 'form/formgrouplabel/formgrouplabel.email.html',
      link: function($scope, ele, attrs) {

        $scope.emailLink = function(value) {
          return `mailto:${value}`;
        }

      }
    }
  }
]);

angular.module('huoyun.widget').filter("EmailLink", function() {

  return function(input) {
    return input && `mailto:${input}`
  };
});