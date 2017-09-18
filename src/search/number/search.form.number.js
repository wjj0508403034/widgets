'use strict';

angular.module('huoyun.widget').directive('widgetsSearchFormNumber', ["Dialog",
  function(Dialog) {
    return {
      restrict: 'A',
      scope: {
        options: "="
      },
      templateUrl: 'search/number/search.form.number.html',
      link: function($scope, elem, attrs) {

        $scope.onButtonClicked = function() {
          var options = {
            title: `设置搜索条件`,
            templateUrl: "search/number/search.form.number.dialog.html",
            params: {
              options: $scope.options
            },
            closeCallback: function(key, data) {
              if (key === "OK") {
                $scope.options.setValue(data);
                $scope.options.$$onChanged(data);
              }
            }
          };
          var dialog = Dialog.showConfirm(options);
        };
      }
    }
  }
]);