'use strict';

angular.module('huoyun.widget').factory("TimePickerControl", ["HuoYunWidgetCore", "$timeout",
  function(HuoYunWidgetCore, $timeout) {

    const _12Hours = [{
      name: "1"
    }, {
      name: "2"
    }, {
      name: "3"
    }, {
      name: "4"
    }, {
      name: "5"
    }, {
      name: "6"
    }, {
      name: "7"
    }, {
      name: "8"
    }, {
      name: "9"
    }, {
      name: "10"
    }, {
      name: "11"
    }, {
      name: "12"
    }];

    const TimeFormats = [{
      name: "am",
      text: "AM"
    }, {
      name: "pm",
      text: "PM"
    }];

    const ListItemBoxHeight = 35;

    const Direction = {
      UP: "up",
      DOWN: "down"
    };


    function TimePickerControl(options) {
      HuoYunWidgetCore.Control.apply(this, arguments);

      this.setDate(this.getOptions().date || new Date());
    }

    HuoYunWidgetCore.ClassExtend(TimePickerControl, HuoYunWidgetCore.Control);


    TimePickerControl.prototype.getHours = function() {
      if (!this.$$hours) {
        this.$$hours = [].concat(_12Hours);
      }
      return this.$$hours;
    };

    TimePickerControl.prototype.getMinutes = function() {
      if (!this.$$mintues) {
        this.$$mintues = [];
        for (var index = 1; index < 60; index++) {
          this.$$mintues.push(index);
        }
      }

      return this.$$mintues;
    };

    TimePickerControl.prototype.getFormats = function() {
      return TimeFormats;
    };

    TimePickerControl.prototype.getFormatText = function(format) {
      return format.text;
    };

    TimePickerControl.prototype.getDate = function() {
      return this.$$date;
    };

    TimePickerControl.prototype.setDate = function(date) {
      this.$$date = date;
    };

    TimePickerControl.prototype.getHourListBoxElement = function() {
      return $(`#${this.getId()} .list-hours`);
    };

    TimePickerControl.prototype.addMoreItemsIfScrollEnd = function(newPosition) {
      var itemCount = parseInt(newPosition / ListItemBoxHeight);
      if (itemCount % 8 === 0) {
        this.$$hours = this.getHours().concat(_12Hours);
      }
    };

    TimePickerControl.prototype.getListItemId = function(listBoxName, index) {
      return `${this.getId()}_${listBoxName}_${index}`;
    };

    TimePickerControl.prototype.setHour = function(hour, direction) {
      var oldHour = this.getHour();
      this.getDate().setHours(hour);
      this.scrollHourToPosition(oldHour, hour, direction);
      return this;
    };

    TimePickerControl.prototype.getHour = function() {
      var hour = this.getDate().getHours();
      return hour > 12 ? hour - 12 : hour;
    };

    TimePickerControl.prototype.Test = function() {

    };

    TimePickerControl.prototype.onHourArrowUpButtonClicked = function() {
      var hour = this.getHour();
      this.setHour(hour === 1 ? 12 : hour - 1, Direction.UP);
    };

    TimePickerControl.prototype.onHourArrowDownButtonClicked = function() {
      var hour = this.getHour();
      this.setHour(hour % 12 + 1, Direction.DOWN);
    };

    TimePickerControl.prototype.__scroll = function(position) {
      var oldPosition = this.getOldScrollPosition();
      var direction = oldPosition < position ? Direction.DOWN : Direction.UP;
      var deltaDistance = position - oldPosition;
      var oldHour = this.getHour();
      var hour = this.getHour() + Math.round(deltaDistance / ListItemBoxHeight);
      if (hour < 0) {
        hour = hour % 12 + 12;
      } else if (hour > 12) {
        hour = hour % 12;
      }
      this.setHour(hour, direction);
    };

    TimePickerControl.prototype.__scrollElement = function(elem, position) {
      var that = this;
      this.raiseEvent("__scrollingStart");
      $timeout(function() {
        console.log("scroll to position:" + position)
        elem.off("scroll")
          .scrollTop(position)
          .on("scroll", function(event) {
            event.preventDefault();
            event.stopPropagation();
            that.raiseEvent("__scrollingEnd");
          });
      });
    };

    TimePickerControl.prototype.getOldScrollPosition = function() {
      return this.$$oldScrollPosition || 0;
    };

    TimePickerControl.prototype.setOldScrollPosition = function(position) {
      this.$$oldScrollPosition = position;
      return this;
    };

    TimePickerControl.prototype.scrollHourToPosition = function(oldHour, newHour, direction) {
      if (!direction) {
        direction = Direction.DOWN;
      }

      var hour = this.getHour();
      var elem = this.getHourListBoxElement();
      var oldPosition = elem.scrollTop();
      this.setOldScrollPosition(oldPosition);
      var newPosition = null;


      var isItemsChanged = false;

      newPosition = oldPosition + (newHour - oldHour) * ListItemBoxHeight;
      newPosition = Math.round(newPosition / ListItemBoxHeight) * ListItemBoxHeight;

      // Scroll Top, insert more items to scroll
      if (direction === Direction.UP && newPosition < ListItemBoxHeight * 3) {
        this.$$hours = _12Hours.concat(this.getHours());
        newPosition = newPosition + ListItemBoxHeight * 12;
        isItemsChanged = true;
      }

      // Scroll Bottom, add more items to scroll
      var scrollHeight = this.getScrollHeight();
      if (direction === Direction.DOWN && scrollHeight - newPosition < ListItemBoxHeight * 5) {
        this.$$hours = this.getHours().concat(_12Hours);
        isItemsChanged = true;
      }

      if (isItemsChanged) {
        this.$$_newPosition = newPosition;
      } else {
        this.__scrollElement(elem, newPosition);
      }
    };

    TimePickerControl.prototype.getScrollHeight = function() {
      return this.getHours().length * ListItemBoxHeight;
    };

    TimePickerControl.prototype.onHoursRenderFinished = function() {
      if (this.$$_newPosition) {
        var elem = this.getHourListBoxElement();
        this.__scrollElement(elem, this.$$_newPosition);
      }
    };

    return TimePickerControl;
  }
]);