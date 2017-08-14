'use strict';

angular.module('huoyun.widget').directive("widgetsStoryBoard", ["$log", "svgHelper", "Draw",
  function($log, svgHelper, Draw) {
    return {
      restrict: "A",
      scope: {
        svgOptions: "="
      },
      link: function($scope, elem, attrs) {
        var svg = svgHelper.generateSVG(elem);
        $scope.svgOptions.line.setSvg(svg).draw().text("水平消失线");
        svg.rect(177, 177, 8, 8).fill("#4F80FF").stroke({
          color: "rgba(0,0,0,0)"
        }).style({
          cursor: "nw-resize"
        }).attr({
          "pointer-events": "all"
        })
        var cube = new Draw.Cube();
        cube.setHorizontalLine($scope.svgOptions.line).setSvg(svg).enableDrawing();


      }
    }
  }
]);