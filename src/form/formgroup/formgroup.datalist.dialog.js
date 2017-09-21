'use strict';

angular.module('huoyun.widget').controller('FormGroupDataListController', ["$scope", "CheckBoxOption", "$log",
  function($scope, CheckBoxOption, $log) {

    var propOption = $scope.ngDialogData.params.options;
    var loadCount = 0;

    $scope.searchText = null;
    $scope.dataSource = [];

    $scope.isSingle = function() {
      return propOption.datalist.selection.isSingle();
    };

    $scope.searchVisibility = function() {
      return propOption.datalist.$$searchVisibility();
    };

    $scope.loadVisibility = function() {
      return propOption.datalist.$$loadVisibility();
    };

    $scope.getValueLabel = function(data) {
      return propOption.datalist.$$getItemValueLabel(data);
    };

    $scope.onItemClicked = function(item) {
      if ($scope.isSingle()) {
        $scope.closeThisDialog(['OK', item]);
      } else {
        $log.warn("Current selection mode isn't single.");
      }
    };

    $scope.onSearchTextChanged = function() {
      loadCount = 0;
      propOption.datalist.$$search($scope.searchText)
        .then(function(result) {
          setDataSource(result);
        });
    };

    $scope.onSearchTextCleared = function() {
      $scope.searchText = null;
      $scope.onSearchTextChanged();
    };

    $scope.loadMore = function() {
      loadCount = loadCount + 1;
      propOption.datalist.$$loadMore(loadCount, $scope.searchText)
        .then(function(result) {
          var selectedItems = null;
          if (!$scope.isSingle()) {
            selectedItems = getSelectedItems();
          }
          addDataSource(selectedItems, result);
        });
    };

    $scope.selectedAllOption = new CheckBoxOption({
      value: false,
      label: "全选",
      onCheckChanged: function(event, oldVal, newVal) {
        if (newVal) {
          selectedAll();
        } else {
          unselectedAll();
        }
      }
    });


    propOption.datalist.$$getDataSource()
      .then(function(result) {
        setDataSource(result);
      });


    $scope.ngDialogData.onConfirmButtonClicked = function() {
      $scope.closeThisDialog(['OK', getSelectedItems()]);
    };

    function setDataSource(result) {
      var selectedItems = null;
      if (!$scope.isSingle()) {
        selectedItems = getSelectedItems();
      }
      $scope.dataSource = [];
      addDataSource(selectedItems, result);
    }

    function addDataSource(selectedItems, result) {
      if (Array.isArray(result)) {
        result.forEach(function($dataItem) {
          if ($scope.isSingle()) {
            $scope.dataSource.push($dataItem);
          } else {
            $scope.dataSource.push({
              checkboxOption: getCheckBoxOption(selectedItems, $dataItem),
              data: $dataItem
            });
          }
        });
      } else {
        $log.warn("Datasource is not array", result);
      }
    }

    function getCheckBoxOption(selectedItems, dataItem) {
      var option = new CheckBoxOption({
        value: false,
        label: dataItem[propOption.datalist.labelField]
      });

      for (var index = 0; index < selectedItems.length; index++) {
        if (selectedItems[index] === dataItem) {
          option.value = true;
          break;
        }
      }

      return option;
    }

    function selectedAll() {
      $scope.dataSource.forEach(function($dataItem) {
        $dataItem.checkboxOption.value = true;
      });
    }

    function unselectedAll() {
      $scope.dataSource.forEach(function($dataItem) {
        $dataItem.checkboxOption.value = false;
      });
    }

    function getSelectedItems() {
      var items = [];
      $scope.dataSource.forEach(function($dataItem) {
        if ($dataItem.checkboxOption.isChecked()) {
          items.push($dataItem.data);
        }
      });
      return items;
    }
  }
]);