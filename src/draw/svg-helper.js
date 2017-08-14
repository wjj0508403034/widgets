'use strict';

angular.module('huoyun.widget').factory("svgHelper", ["draw", function(drawProvider) {
  return {
    generateSVG: function(elem) {
      var svgId = `svg${(new Date()).getTime()}`;
      var storyBoardContainer = angular.element("<div class='svg-story-board-container'></div>").attr("id", svgId);
      storyBoardContainer.css("height", "100%").css("width", "100%");
      elem.append(storyBoardContainer);
      var svg = SVG(svgId);
      svg.size("100%", "100%");
      return svg;
    },

    drawLine: function(svg, line) {
      svg.line(line.value()).stroke(drawProvider.line.stroke);
    },

    updateLine: function(line, point1, point2) {
      return line.plot([point1.value(), point2.value()]);
    },

    drawLineByPoints: function(svg, point1, point2) {
      return svg.line([point1.value(), point2.value()]).stroke(drawProvider.line.stroke);
    }
  };
}]);