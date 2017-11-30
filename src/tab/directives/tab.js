'use strict';

angular.module('huoyun.widget').directive('widgetsTab', [
  function() {
    return {
      restrict: 'A',
      replace: true,
      scope: {
        options: "="
      },
      transclude: {
        "tabItem": "?tabItemTemplate"
      },
      terminal: true,
      templateUrl: 'tab/directives/tab.html',
      controller: function($scope) {
        return {
          tab: $scope.options,
          slotName: "tabItem"
        };
      },
      link: function($scope, elem, attrs, control, $transclude) {
        var slotFilled = $transclude.isSlotFilled(control.slotName);
        $transclude($scope, function(transcludeElem) {
          for (var index = 0; index < transcludeElem.length; index++) {
            var tabItemElem = transcludeElem.get(index);
            var tabIndex = parseInt(tabItemElem.getAttribute("tab-item-index"));
            control.tab.setTabItemTemplate(tabIndex, tabItemElem.innerHTML);
          }
        }, null, control.slotName);
      }
    }
  }
]);