'use strict';

angular.module('huoyun.widget').directive('widgetsPagination', function() {
  return {
    restrict: 'A',
    scope: {
      options: "="
    },
    templateUrl: 'pagination/pagination.html',
    link: function($scope, elem, attrs) {}
  }
});