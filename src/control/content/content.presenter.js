'use strict';

angular.module('huoyun.widget').directive('widgetsContentPresenter', ["$compile",
  function($compile) {
    return {
      restrict: 'A',
      terminal: true,
      compile: function(elem, attrs, control, $transclude) {
        var fallbackLinkFn = $compile(elem.contents());
        elem.empty();

        return function($scope, elem, attrs, control, $transclude) {
          if (!$transclude) {
            console.log("widgets no set transclude value");
            return;
          }
          var slotName = attrs.slot;
          var slotFilled = $transclude.isSlotFilled(slotName);
          if (slotFilled) {
            $transclude($scope, function(transcludeElem) {
              elem.append(transcludeElem);
            }, null, slotName);
          } else {
            fallbackLinkFn($scope, function(clone) {
              elem.append(clone);
            });
          }
        };
      }
    }
  }
]);