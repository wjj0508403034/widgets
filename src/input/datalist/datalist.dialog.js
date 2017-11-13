'use strict';

angular.module('huoyun.widget').controller('DataListController', ["$scope", "CheckBoxControl", "ListViewControl", "HuoYunWidgetCore", "CheckBoxListViewItemControl", "SearchControl",
  function($scope, CheckBoxControl, ListViewControl, HuoYunWidgetCore, CheckBoxListViewItemControl, SearchControl) {

    $scope.vm = {
      search: null,
      pageCount: 0,
      getDataListControl: function() {
        return $scope.ngDialogData.params.options;
      },
      getDataListOptions: function() {
        return $scope.vm.getDataListControl().getOptions();
      },
      listView: null,
      loadPageDataSource: function() {
        var dataSource = $scope.vm.getDataListOptions().loadMore($scope.vm.pageCount, $scope.vm.search.getValue());
        return HuoYunWidgetCore.Promise.resolve(dataSource)
          .then(function(result) {
            $scope.vm.pageCount = $scope.vm.pageCount + 1;
            return HuoYunWidgetCore.Promise.resolve(result);
          });
      }
    };

    $scope.vm.search = new SearchControl({
      placeholder: "Search ..."
    }).on("valueChanged", function() {
      console.log(arguments)
    });

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

    $scope.ngDialogData.onConfirmButtonClicked = function() {
      var value = $scope.vm.listView.getSelectedValue();
      var text = $scope.vm.listView.getSelectedItems().map(function(listviewItem) {
        return listviewItem.getDisplayText();
      }).join(", ");
      $scope.closeThisDialog(['OK', value, text]);
    };

  }
]);