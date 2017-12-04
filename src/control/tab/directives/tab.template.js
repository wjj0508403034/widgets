'use strict';

angular.module('huoyun.widget').directive('widgetsTabTemplate', ["$compile",
  function($compile) {
    return {
      require: "widgetsTab",
      restrict: 'A',
      priority: 100,
      compile: function(elem, attrs, control, $transclude) {
        var elements = elem.contents();

        return function($scope, elem, attrs, control, $transclude) {

          for (var index = 0; index < elements.length; index++) {
            var element = elements[index];
            var nodeName = element.nodeName;
            if (nodeName === "TAB-ITEM-TEMPLATE") {
              var tabItemIndex = parseInt(element.getAttribute("tab-item-index"));
              control.tab.setTabItemTemplate(tabItemIndex, element);
              continue;
            }

            if (nodeName === "TAB-ITEM-HEADER-TEMPLATE") {
              var tabItemIndex = parseInt(element.getAttribute("tab-item-index"));
              control.tab.setTabItemHeaderTemplate(tabItemIndex, element);
              continue;
            }
          }
        };
      }
    }
  }
]);