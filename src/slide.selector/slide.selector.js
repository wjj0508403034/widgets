'use strict';

angular.module('huoyun.widget').directive('widgetsSlideSelector', [
  function() {
    return {
      restrict: 'A',
      scope: {
        options: "="
      },
      replace: true,
      templateUrl: 'slide.selector/slide.selector.html',
      link: function($scope, elem, attrs) {
        $scope.options && $scope.options.setElement(elem);
      }
    }
  }
]);