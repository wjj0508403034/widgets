'use strict';

angular.module('huoyun.widget').directive('widgetsBreadCrumb', [
  function() {
    return {
      restrict: 'A',
      scope: {
        options: "="
      },
      templateUrl: 'breadcrumb/breadcrumb.html',
      link: function($scope, elem, attrs) {}
    }
  }
]);