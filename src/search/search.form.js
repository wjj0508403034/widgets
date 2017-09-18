'use strict';

angular.module('huoyun.widget').directive('widgetsSearchForm', [
  function() {
    return {
      restrict: 'A',
      scope: {
        options: "="
      },
      templateUrl: 'search/search.form.html',
      link: function($scope, elem, attrs) {}
    }
  }
]);