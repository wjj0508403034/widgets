'use strict';

angular.module('huoyun.widget').directive('widgetsSearchFormString', [
  function() {
    return {
      restrict: 'A',
      scope: {
        options: "="
      },
      templateUrl: 'search/string/search.form.string.html',
      link: function($scope, elem, attrs) {}
    }
  }
]);