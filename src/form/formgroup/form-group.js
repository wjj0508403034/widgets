'use strict';

angular.module('huoyun.widget').directive('widgetsFormGroup', [
  function() {
    return {
      restrict: 'A',
      scope: {
        options: "="
      },
      templateUrl: 'form/formgroup/form-group.html',
      link: function($scope, elem, attrs) {}
    }
  }
]);