'use strict';

angular.module('huoyun.widget').directive('widgetsLoading', [
  function() {
    return {
      priority: 100,
      restrict: 'A',
      scope: {
        options: "="
      },
      templateUrl: 'loading/loading.html',
      link: function($scope, elem, attrs) {}
    }
  }
]);