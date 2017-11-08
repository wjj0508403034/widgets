'use strict';

angular.module('huoyun.widget').controller('DataListController', ["$scope", "CheckBoxControl", "$log", "ListDataSource",
  function($scope, CheckBoxControl, $log, ListDataSource) {

    $scope.vm = {
      getSelectionModeClass: function() {
        return $scope.vm.getDataListControl().getSelection().getValue();
      },
      getDataListControl: function() {
        return $scope.ngDialogData.params.options;
      },
      searchText: null,
      loadCount: 0,
      getDataSource: function() {
        if (!$scope.vm.dataSource) {
          $scope.vm.dataSource = new ListDataSource($scope.vm.getDataListControl().getSelection())
          $scope.vm.dataSource.setLabelField($scope.vm.getDataListControl().getLabelField());
        }

        return $scope.vm.dataSource;
      },
      onItemClicked: function(item) {
        if ($scope.control.getSelection().isSingle()) {
          $scope.closeThisDialog(['OK', item]);
        } else {
          $log.warn("Current selection mode isn't single.");
        }
      },
      onSearchTextChanged: function() {
        $scope.control.onSearch($scope.searchText)
          .then(function(result) {
            $scope.vm.loadCount = 0;
            $scope.vm.appendData(result);
          });
      },
      onSearchTextCleared: function() {
        $scope.searchText = null;
        $scope.onSearchTextChanged();
      },
      loadMore: function() {
        $scope.vm.getDataListControl().loadMoreData($scope.vm.loadCount, $scope.vm.searchText)
          .then(function(result) {
            $scope.vm.loadCount = $scope.vm.loadCount + 1;
            $scope.vm.appendData(result);
          });
      },
      appendData: function(data) {
        $scope.vm.getDataSource().append(data);
      },
      selectedAll: new CheckBoxControl({
        value: false,
        text: "全选",
        checked: function() {
          $scope.vm.dataSource.selectedAll();
        },
        unchecked: function() {
          $scope.vm.dataSource.unselectedAll();
        }
      }),
      getSelectedData: function() {
        return $scope.vm.getDataSource().getSelectedData();
      }
    };

    $scope.vm.loadMore();

    $scope.ngDialogData.onConfirmButtonClicked = function() {
      $scope.closeThisDialog(['OK', $scope.vm.getSelectedData()]);
    };
  }
]);