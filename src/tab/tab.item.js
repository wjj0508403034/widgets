'use strict';

angular.module('huoyun.widget').directive('widgetsTabItem', [
  function() {
    return {
      restrict: 'A',
      scope: {
        options: "="
      },
      templateUrl: 'tab/tab.item.html',
      link: function($scope, elem, attrs, tabController) {
        console.log(tabController);
      }
    }
  }
]);