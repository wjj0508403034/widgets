'use strict';

angular.module('huoyun.widget').controller('DataListController', ["$scope", "$q", "CheckBoxControl", "ListViewControl", "ListDataSource", "HuoYunWidgetCore", "CheckBoxListViewItemControl",
  function($scope, $q, CheckBoxControl, ListViewControl, ListDataSource, HuoYunWidgetCore, CheckBoxListViewItemControl) {

    $scope.vm = {
      pageCount: 0,
      searchText: null,
      getDataListControl: function() {
        return $scope.ngDialogData.params.options;
      },
      getDataListOptions: function() {
        return $scope.vm.getDataListControl().getOptions();
      },
      listView: null,
      loadPageDataSource: function() {
        var dataSource = $scope.vm.getDataListOptions().loadMore($scope.vm.pageCount, $scope.vm.searchText);
        return HuoYunWidgetCore.Promise.resolve(dataSource)
          .then(function(result) {
            $scope.vm.pageCount = $scope.vm.pageCount + 1;
            return $q.resolve(result);
          });
      }
    };

    var options = $scope.vm.getDataListOptions();
    $scope.vm.listView = new ListViewControl()
      .setValuePath(options.valueField)
      .setDisplayPath(options.labelField)
      .setSelectionMode(options.selection)
      .setDataSource($scope.vm.loadPageDataSource)
      .setItemTemplate(CheckBoxListViewItemControl)
      .setItemTemplateUrl("listview/checkbox.listviewitem.html")
      .on("dataSourceChanged", function() {
        console.log(arguments)
      });

    // $scope.vm = {
    //   listView: new ListViewControl({

    //   }),
    //   getSelectionModeClass: function() {
    //     return $scope.vm.getDataListControl().getSelection().getValue();
    //   },
    //   getDataListControl: function() {
    //     return $scope.ngDialogData.params.options;
    //   },
    //   searchText: null,
    //   loadCount: 0,
    //   getDataSource: function() {
    //     if (!$scope.vm.dataSource) {
    //       $scope.vm.dataSource = new ListDataSource($scope.vm.getDataListControl().getSelection())
    //       $scope.vm.dataSource.setLabelField($scope.vm.getDataListControl().getLabelField());
    //     }

    //     return $scope.vm.dataSource;
    //   },
    //   onItemClicked: function(item) {
    //     if ($scope.control.getSelection().isSingle()) {
    //       $scope.closeThisDialog(['OK', item]);
    //     } else {
    //       $log.warn("Current selection mode isn't single.");
    //     }
    //   },
    //   onSearchTextChanged: function() {
    //     $scope.control.onSearch($scope.searchText)
    //       .then(function(result) {
    //         $scope.vm.loadCount = 0;
    //         $scope.vm.appendData(result);
    //       });
    //   },
    //   onSearchTextCleared: function() {
    //     $scope.searchText = null;
    //     $scope.onSearchTextChanged();
    //   },
    //   loadMore: function() {
    //     $scope.vm.getDataListControl().loadMoreData($scope.vm.loadCount, $scope.vm.searchText)
    //       .then(function(result) {
    //         $scope.vm.loadCount = $scope.vm.loadCount + 1;
    //         $scope.vm.appendData(result);
    //       });
    //   },
    //   appendData: function(data) {
    //     $scope.vm.getDataSource().append(data);
    //   },
    //   selectedAll: new CheckBoxControl({
    //     value: false,
    //     text: "全选",
    //     checked: function() {
    //       $scope.vm.dataSource.selectedAll();
    //     },
    //     unchecked: function() {
    //       $scope.vm.dataSource.unselectedAll();
    //     }
    //   }),
    //   getSelectedData: function() {
    //     return $scope.vm.getDataSource().getSelectedData();
    //   }
    // };

    // $scope.vm.loadMore();

    // $scope.ngDialogData.onConfirmButtonClicked = function() {
    //   $scope.closeThisDialog(['OK', $scope.vm.getSelectedData()]);
    // };
  }
]);