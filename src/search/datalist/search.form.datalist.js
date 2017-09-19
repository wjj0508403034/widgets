'use strict';

angular.module('huoyun.widget').directive('widgetsSearchFormDataList', ["Dialog",
  function(Dialog) {
    return {
      restrict: 'A',
      scope: {
        options: "="
      },
      templateUrl: 'search/datalist/search.form.datalist.html',
      link: function($scope, elem, attrs) {

        $scope.onButtonClicked = function() {
          var options = {
            title: `设置搜索条件`,
            templateUrl: "search/datalist/search.form.datalist.dialog.html",
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