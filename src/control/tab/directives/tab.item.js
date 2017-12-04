'use strict';

angular.module('huoyun.widget').directive('widgetsTabItem', ["$templateCache", "$compile",
  function($templateCache, $compile) {
    return {
      require: "^widgetsTab",
      restrict: 'A',
      templateUrl: 'control/tab/directives/tab.item.html',
      link: function($scope, elem, attrs, control) {

        $scope.onTabItemRender = function() {
          $scope.$tabItem.getTemplate(function(template) {
            var linkFn = $compile(template);
            linkFn($scope, function(clone, scope) {
              elem.find(".content-presenter").append(clone);
            });
          });
        };
      }
    }
  }
]);