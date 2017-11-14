'use strict';

angular.module('huoyun.widget').directive('widgetsFormGroupEmail', [
  function() {
    return {
      restrict: 'A',
      scope: {
        options: "=",
        value: "=ngModel"
      },
      templateUrl: 'form/formgroup/formgroup.email.html',
      link: function($scope, elem, attrs) {}
    }
  }
]);