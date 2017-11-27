'use strict';

angular.module('huoyun.widget').factory("SlideSelectorControl", ["HuoYunWidgetCore", "$timeout",
  function(HuoYunWidgetCore, $timeout) {

    const ItemHeight = 30;
    const OffsetItemCount = 2;

    function SlideSelectorControl(options) {
      HuoYunWidgetCore.Control.apply(this, arguments);
    }

    HuoYunWidgetCore.ClassExtend(SlideSelectorControl, HuoYunWidgetCore.Control);

    SlideSelectorControl.prototype.getItems = function() {
      if (!this.$$items) {
        var items = this.__getItems();
        if (Array.isArray(items)) {
          this.$$items = [].concat(items).concat(items).concat(items);
        }
      }

      return this.$$items;
    };

    SlideSelectorControl.prototype.__getItems = function() {
      return this.getOptions().items || [];
    };

    SlideSelectorControl.prototype.getItemId = function(index) {
      return `item_${this.getId()}_${index}`;
    };

    SlideSelectorControl.prototype.getItemDisplayText = function(item) {
      var displayPath = this.getOptions().displayPath;
      if (displayPath) {
        return item[displayPath];
      }

      return item;
    };

    SlideSelectorControl.prototype.getItemValue = function(item) {
      var valuePath = this.getOptions().valuePath;
      if (valuePath) {
        return item[valuePath];
      }

      return item;
    };

    SlideSelectorControl.prototype.onRepeatRendered = function() {
      var that = this;
      if (that.__$$calcScrollTop) {
        this.getElement().scrollTop(that.__$$calcScrollTop);
        return;
      }

      var timer = null;
      this.getElement().off("scroll").on("scroll", function(event) {
        var elem = this;
        var index = Math.round(elem.scrollTop / ItemHeight);
        if (timer) {
          clearTimeout(timer);
        }

        if (that.getItems().length - index < that.__getItems().length) {
          that.__$$calcScrollTop = index * ItemHeight;
          that.$$items = that.$$items.concat(that.__getItems());
        } else {
          timer = setTimeout(function() {
            var calcScrollTop = index * ItemHeight;
            if (elem.scrollTop !== calcScrollTop) {
              elem.scrollTop = calcScrollTop;
            } else {
              $timeout(function() {
                that.setScrollTop(calcScrollTop)
                  .setSelectedValue(that.getItems()[index + that.getOffsetItemCount()]);
              });
            }
          }, 150);

          $timeout(function() {
            that.setScrollTop(elem.scrollTop);
          });
        }

      });
    };

    SlideSelectorControl.prototype.getSelectedValue = function() {
      return this.$$value;
    };

    SlideSelectorControl.prototype.setSelectedValue = function(value) {
      var oldValue = this.getSelectedValue();
      this.$$value = value;
      this.raiseEvent("selectedChanged", [value, oldValue, this]);
      return this;
    };

    SlideSelectorControl.prototype.setScrollTop = function(scrollTop) {
      this.$$scrollTop = scrollTop;
      return this;
    };

    SlideSelectorControl.prototype.getScrollTop = function() {
      return this.$$scrollTop || 0;
    };

    SlideSelectorControl.prototype.getSelectorBoxStyle = function() {
      return {
        top: `${this.getScrollTop() + this.getOffsetItemCount() * ItemHeight}px`
      };
    };

    SlideSelectorControl.prototype.scrollToNextElement = function() {
      this.getElement().scrollTop(this.getScrollTop() + ItemHeight);
    };

    SlideSelectorControl.prototype.scrollToPerviousElement = function() {
      this.getElement().scrollTop(this.getScrollTop() - ItemHeight);
    };

    SlideSelectorControl.prototype.getOffsetItemCount = function() {
      return this.getOptions().offsetItemCount || OffsetItemCount;
    };

    return SlideSelectorControl;
  }
]);