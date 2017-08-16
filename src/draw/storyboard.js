'use strict';

angular.module('huoyun.widget').directive("widgetsStoryBoard", ["$log", "svgHelper", "Draw",
  function($log, svgHelper, Draw) {
    return {
      restrict: "A",
      scope: {
        svgOptions: "=",
        frameIndex: "="
      },
      link: function($scope, elem, attrs) {
        var svg = svgHelper.generateSVG(elem);

        $scope.$watch("frameIndex", function(newVal, oldValue) {
          if (newVal !== undefined && $scope.svgOptions && $scope.svgOptions.objects) {
            $scope.svgOptions.objects.forEach(function(object) {
              if (!object.svg) {
                object.setSvg(svg).setHorizontalLine($scope.svgOptions.line);
              }
              object.setTime(newVal).draw();
            });
          }
        });

        var deregisterWatch = $scope.$watch("svgOptions", function(newVal, oldValue) {
          if (newVal) {
            deregisterWatch();
            if (typeof $scope.svgOptions.afterSvgInit === "function") {
              $scope.svgOptions.afterSvgInit(svg);
            }

            if (typeof $scope.svgOptions.registerObjectCreate === "function") {
              $scope.svgOptions.registerObjectCreate(ObjectCreateHandler);
            }
          }
        });

        function ObjectCreateHandler(object) {
          object.setSvg(svg).setTime($scope.frameIndex).enableDrawing();
        }


        //$scope.svgOptions.line.setSvg(svg).draw().text("水平消失线");
        // svg.rect(177, 177, 8, 8).fill("#4F80FF").stroke({
        //   color: "rgba(0,0,0,0)"
        // }).style({
        //   cursor: "nw-resize"
        // }).attr({
        //   "pointer-events": "all"
        // })
        //var cube = new Draw.Cube();
        //cube.setHorizontalLine($scope.svgOptions.line).setSvg(svg).enableDrawing();


      }
    }
  }
]);