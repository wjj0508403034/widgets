angular.module('Demo', ['huoyun.widget']);

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
  }
]);