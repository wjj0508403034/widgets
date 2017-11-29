'use strict';

angular.module('huoyun.widget').directive('widgetsListViewItem', ["$templateCache", "$compile",
  function($templateCache, $compile) {
    const TemplateUrl = "list.view/directives/list.view.item.html";

    return {
      require: "^widgetsListView",
      restrict: 'A',
      link: function($scope, elem, attrs, control, $transclude) {
        var slotFilled = $transclude.isSlotFilled(control.slotName);
        if (slotFilled) {
          $transclude($scope, function(transcludeElem) {
            elem.append(transcludeElem);
          }, null, control.slotName);
        } else {
          var fallbackLinkFn = $compile($templateCache.get(TemplateUrl));
          fallbackLinkFn($scope, function(clone) {
            elem.append(clone);
          });
        }
      }
    }
  }
]);