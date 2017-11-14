'use strict';

angular.module('huoyun.widget').directive('widgetsListView', [function() {
  return {
    restrict: 'A',
    scope: {
      options: "="
    },
    templateUrl: 'listview/listview.html',
    link: function($scope, elem, attrs) {}
  }
}]);