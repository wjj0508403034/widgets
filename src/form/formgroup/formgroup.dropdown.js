'use strict';

angular.module('huoyun.widget').directive('widgetsFormGroupDropDown', [
  function() {
    return {
      restrict: 'A',
      scope: {
        options: "=",
        value: "=ngModel"
      },
      templateUrl: 'form/formgroup/formgroup.dropdown.html',
      link: function($scope, ele, attrs) {


      }
    }
  }
]);