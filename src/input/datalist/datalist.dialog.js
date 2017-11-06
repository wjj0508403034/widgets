'use strict';

angular.module('huoyun.widget').controller('DataListController', ["$scope", "CheckBoxControl", "$log", "ListDataSource",
  function($scope, CheckBoxControl, $log, ListDataSource) {

    $scope.control = $scope.ngDialogData.params.options;

    $scope.vm = {
      searchText: null,
      loadCount: 0,
      dataSource: new ListDataSource($scope.control.getSelection()),
      onItemClicked: function(item) {
        if ($scope.control.getSelection().isSingle()) {
          $scope.closeThisDialog(['OK', item]);
        } else {
          $log.warn("Current selection mode isn't single.");
        }
      },
      onSearchTextChanged: function() {
        loadCount = 0;
        $scope.control.onSearch($scope.searchText)
          .then(function(result) {
            setDataSource(result);
          });
      },
      onSearchTextCleared: function() {
        $scope.searchText = null;
        $scope.onSearchTextChanged();
      },
      loadMore: function() {
        loadCount = loadCount + 1;
        $scope.control.loadMoreData(loadCount, $scope.searchText)
          .then(function(result) {
            var selectedItems = $scope.vm.dataSource.getSelectedData();
            $scope.vm.dataSource.append(result).setSelected(selectedItems);
          });
      },
      selectedAll: new CheckBoxControl({
        value: false,
        label: "全选",
        checked: function() {
          $scope.vm.dataSource.selectedAll();
        },
        unchecked: function() {
          $scope.vm.dataSource.unselectedAll();
        }
      })
    };



    $scope.control.getDataSource()
      .then(function(result) {
        setDataSource(result);
      });


    $scope.ngDialogData.onConfirmButtonClicked = function() {
      $scope.closeThisDialog(['OK', getSelectedItems()]);
    };

    function setDataSource(result) {
      var selectedItems = getSelectedItems();
      $scope.vm.dataSource.setData(result).setSelected(selectedItems);
    }

    function getSelectedItems() {
      return $scope.vm.dataSource.getSelectedData();
    }
  }
]);