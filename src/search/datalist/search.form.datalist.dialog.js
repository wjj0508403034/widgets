'use strict';

angular.module('huoyun.widget').controller('SearchFormDataListController', ["$scope", "CheckBoxOption",
  function($scope, CheckBoxOption) {

    var propOption = $scope.ngDialogData.params.options;
    var loadCount = 0;

    $scope.searchText = null;
    $scope.dataSource = [];

    $scope.searchVisibility = function() {
      return propOption.datalist.$$searchVisibility();
    };

    $scope.loadVisibility = function() {
      return propOption.datalist.$$loadVisibility();
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
          var selectedItems = getSelectedItems();
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
      var selectedItems = getSelectedItems();
      $scope.dataSource = [];
      addDataSource(selectedItems, result);
    }

    function addDataSource(selectedItems, result) {
      if (Array.isArray(result)) {
        result.forEach(function($dataItem) {
          $scope.dataSource.push({
            checkboxOption: getCheckBoxOption(selectedItems, $dataItem),
            data: $dataItem
          });
        });
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