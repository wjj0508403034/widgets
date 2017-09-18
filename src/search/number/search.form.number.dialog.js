'use strict';

angular.module('huoyun.widget').controller('SearchFormNumberDialog', ["$scope", "SearchConditions", "SearchConditionValue",
  function($scope, SearchConditions, SearchConditionValue) {
    $scope.conditions = SearchConditions;

    $scope.condition = angular.copy($scope.ngDialogData.params.options.value || new SearchConditionValue({
      op: "eq"
    }));

    $scope.ngDialogData.onConfirmButtonClicked = function() {
      $scope.closeThisDialog(['OK', $scope.condition]);
    };
  }
]);