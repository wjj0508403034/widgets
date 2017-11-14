'use strict';

angular.module('huoyun.widget').directive('widgetsDraggable', ["DataStore",
  function(DataStore) {
    return {
      restrict: 'A',
      scope: {
        dragData: "="
      },
      link: function($scope, elem, attrs, controller) {
        elem.attr("draggable", true);
        elem.bind("dragstart", function($event) {
          var token = (new Date()).getTime();
          DataStore.setItem(token, $scope.dragData);
          $event.originalEvent.dataTransfer.setData("token", token);
        });
      }
    }
  }
]);


angular.module('huoyun.widget').directive('dragSuccess', ["$parse", "DataStore",
  function($parse, DataStore) {
    return {
      restrict: 'A',
      link: function($scope, elem, attrs) {
        if (attrs.dragSuccess) {
          var onDropSuccessFn = $parse(attrs.dragSuccess);
        }

        elem.on("dragover", function(event) {
          event.preventDefault();
          event.stopPropagation();
          return false;
        });

        elem.on("dragleave", function(event) {
          event.preventDefault();
          event.stopPropagation();
        });

        elem.bind("drop", function($event) {
          var token = $event.originalEvent.dataTransfer.getData("token");
          var data = DataStore.getItemAndRemove(token);
          $event.preventDefault();
          $event.stopPropagation();
          if (onDropSuccessFn) {
            $scope.$evalAsync(function() {
              onDropSuccessFn($scope, { $event: $event });
            });
          }
        });
      }
    }
  }
]);