'use strict';

angular.module('huoyun.widget').factory("Draw", ["Point", "Line", "Cube", "Quadrilateral",
  function(Point, Line, Cube, Quadrilateral) {

    return {
      Point: Point,
      Line: Line,
      Cube: Cube,
      Quadrilateral: Quadrilateral
    };
  }
]);