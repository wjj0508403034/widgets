'use strict';

angular.module('huoyun.widget').directive('widgetsEmailBox', [function() {
  return {
    restrict: 'A',
    scope: {
      options: "=",
      value: "=ngModel"
    },
    templateUrl: 'input/email/email.html',
    link: function($scope, ele, attrs) {}
  }
}]);