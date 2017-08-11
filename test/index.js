angular.module('Demo', ['huoyun.widget']);

angular.module('Demo').config(["displayProvider", function(displayProvider) {
  displayProvider.config({
    date: "yyyy/MM/dd",
    datetime: "yyyy/MM/dd HH:mm"
  });
}]);

angular.module('Demo').controller("DemoController", ["$scope", "Dialog", "Tip",
  function($scope, Dialog, Tip) {

    $scope.showDialog = function() {
      Dialog.showError({})
        .then(function() {
          console.log("OK");
        }).catch(function() {
          console.log("Cancel");
        });
    };

    $scope.showTip = function() {
      Tip.show("xxx");
    };

    $scope.tableOptions = {
      title: "Table",
      selectionMode: "multiple",
      buttons: [{
        name: "add",
        label: "添加",
        appendClass: "btn-primary",
        onClick: function() {
          console.log(this)
        }
      }],
      columns: [{
        name: "id",
        label: "编号",
        type: "string"
      }, {
        name: "firstName",
        label: "名",
        type: "string"
      }, {
        name: "lastName",
        label: "姓",
        type: "string"
      }, {
        name: "age",
        label: "年龄",
        type: "number",
        visibility: function() {
          return true;
        },
        style: { "text-align": "right" }
      }, {
        name: "birthday",
        label: "生日",
        type: "date",
        style: function() {
          return {
            color: "red",
            "text-align": "center"
          };
        }
      }]
    };

    $scope.dataSource = {
      content: [{
        id: "1111",
        firstName: "Jingjing",
        lastName: "Wang",
        age: 30,
        birthday: new Date()
      }],
      first: true,
      last: false,
      number: 0,
      numberOfElements: 20,
      size: 20,
      sort: null,
      totalElements: 26,
      totalPages: 2
    };
  }
]);