'use strict';

angular.module('huoyun.widget').directive('widgetsSearchFormNumber', [
  function() {
    return {
      restrict: 'A',
      scope: {
        options: "="
      },
      templateUrl: 'search/number/search.form.number.html',
      link: function($scope, elem, attrs) {}
    }
  }
]);