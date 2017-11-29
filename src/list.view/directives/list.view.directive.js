'use strict';

angular.module('huoyun.widget').directive('widgetsListView', [function() {
  return {
    replace: true,
    restrict: 'A',
    scope: {
      options: "="
    },
    transclude: {
      "item": "?itemTemplate"
    },
    templateUrl: 'list.view/directives/list.view.html',
    controller: function($scope) {
      return {
        listView: $scope.options,
        slotName: "item"
      };
    }
  }
}]);