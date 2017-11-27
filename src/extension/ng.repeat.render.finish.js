'use strict';

angular.module('huoyun.widget').directive('onFinishRender', function($timeout) {
  return {
    restrict: 'A',
    //require: "ngRepeat",
    link: function(scope, element, attr) {
      if (scope.$last === true) {
        scope.$evalAsync(attr.onFinishRender);
      }
    }
  }
});