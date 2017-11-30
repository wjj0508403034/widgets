'use strict';

angular.module('huoyun.widget').directive('widgetsButton', ["ButtonControl", "$compile", "$templateCache",
  function(ButtonControl, $compile, $templateCache) {
    return {
      restrict: 'A',
      scope: {
        options: "=?"
      },
      transclude: {
        "content": "?content"
      },
      controller: function($scope) {
        return {
          button: $scope.options,
          slotName: "content"
        };
      },
      templateUrl: 'button/button.template.html',
      link: function($scope, elem, attrs, control, $transclude) {
        if (!$scope.options) {
          $scope.options = new ButtonControl({});
        }
      }
    }
  }
]);