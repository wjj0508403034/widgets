'use strict';

angular.module('huoyun.widget').directive('widgetsDataList', ["Dialog",
  function(Dialog) {
    return {
      restrict: 'A',
      scope: {
        options: "="
      },
      templateUrl: 'input/datalist/datalist.html',
      link: function($scope, ele, attrs) {

        $scope.onButtonClicked = function() {
          var options = {
            title: `选择${$scope.options.label}`,
            templateUrl: "input/datalist/datalist.dialog.html",
            params: {
              options: $scope.options
            },
            closeCallback: function(key, data) {
              if (key === "OK") {
                $scope.options.setValue(data);
              }
            }
          };
          var dialog = Dialog.showConfirm(options);
        };
      }
    }
  }
]);