'use strict';

angular.module('huoyun.widget').directive('widgetsFormGroupDataList', ["Dialog",
  function(Dialog) {
    return {
      restrict: 'A',
      scope: {
        options: "="
      },
      templateUrl: 'form/formgroup/formgroup.datalist.html',
      link: function($scope, ele, attrs) {

        $scope.onButtonClicked = function() {
          var options = {
            title: `选择${$scope.options.label}`,
            templateUrl: "form/formgroup/formgroup.datalist.dialog.html",
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