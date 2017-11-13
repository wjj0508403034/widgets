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
            closeCallback: function(key, value, text) {
              if (key === "OK") {
                var oldVal = $scope.options.getValue();
                $scope.options.setValue(value)
                  .setInputText(text)
                  .raiseEvent("valueChanged", [value, oldVal]);
              }
            }
          };
          var dialog = Dialog.showConfirm(options);
        };
      }
    }
  }
]);