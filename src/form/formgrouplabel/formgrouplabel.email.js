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

        $scope.getEmailLink = function(value) {
          return value && `mailto:${value}`;
        }

      }
    }
  }
]);