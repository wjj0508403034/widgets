'use strict';

angular.module('huoyun.widget').directive('widgetsJsonModel', [
  function() {
    return {
      restrict: 'A',
      scope: {
        options: "="
      },
      templateUrl: 'jsonmodel/jsonmodel.html',
      link: function($scope, ele, attrs) {


      }
    }
  }
]);