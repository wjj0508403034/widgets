angular.module('BoListDemo', ['huoyun.widget']);

angular.module('BoListDemo').config(["displayProvider", function(displayProvider) {
  displayProvider.config({
    date: "yyyy/MM/dd",
    datetime: "yyyy/MM/dd HH:mm"
  });
}]);

// angular.module('Demo').config(["SearchExprProvider", function(SearchExprProvider) {
//   SearchExprProvider.config({
//     "String": function(prop) {
//       return "hell"
//     }
//   });
// }]);


angular.module('BoListDemo').controller("BoListController", ["$scope", "HuoYunWidgets",
  function($scope, HuoYunWidgets) {

    var boMeta =


      $scope.searchFormOption = new HuoYunWidgets.SearchFormOption({
        title: "搜索",
        props: [{
          name: "cust",
          label: "First Name",
          type: "string"
        }, {
          name: "lastName",
          label: "Last Name",
          type: "string"
        }, {
          name: "age",
          label: "Age",
          type: "Integer"
        }, {
          name: "Test1",
          label: "Test1",
          type: "DataList",
          datalist: {
            valueField: "value",
            labelField: "name",
            getDataSource: function() {
              return [{
                name: "11",
                value: "xxx"
              }, {
                name: "222",
                value: "xxx1"
              }];
            },
            search: function(val) {
              return [{
                name: "11",
                value: "xxx"
              }, {
                name: "222",
                value: "xxx1"
              }, {
                name: "333",
                value: "xxx2"
              }];
            }
          }

        }],
        onSearch: function(expr) {
          console.log(expr);
        }
      });
  }


]);