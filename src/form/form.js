'use strict';

angular.module('huoyun.widget').directive('widgetsForm', ["$log",
  function($log) {
    return {
      restrict: 'A',
      scope: {
        options: "=",
        data: "="
      },
      templateUrl: 'form/form.html',
      link: function($scope, ele, attrs) {


      }
    }
  }
]);