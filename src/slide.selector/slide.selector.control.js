'use strict';

angular.module('huoyun.widget').factory("SlideSelectorControl", ["HuoYunWidgetCore", "$timeout",
  function(HuoYunWidgetCore, $timeout) {

    const ItemHeight = 30;
    const OffsetItemCount = 2;
    const RepeatCount = 3;

    function SlideSelectorControl(options) {
      HuoYunWidgetCore.Control.apply(this, arguments);

      this.$$value = this.getOptions().selectedValue;
    }

    HuoYunWidgetCore.ClassExtend(SlideSelectorControl, HuoYunWidgetCore.Control);

    SlideSelectorControl.prototype.getItems = function() {
      if (!this.$$items) {
        var items = this.__getItems();
        if (Array.isArray(items)) {
          this.$$items = [];
          for (var index = 0; index < this.getRepeatCount(); index++) {
            this.$$items = this.$$items.concat(items);
          }
        }
      }

      return this.$$items;
    };

    SlideSelectorControl.prototype.getRepeatCount = function() {
      return this.getOptions().repeatCount || RepeatCount;
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
      var valuePath = this.getValuePath();
      if (valuePath) {
        return item[valuePath];
      }

      return item;
    };

    SlideSelectorControl.prototype.getValuePath = function() {
      return this.getOptions().valuePath;
    };

    SlideSelectorControl.prototype.indexOf = function(value) {
      if (value) {
        for (var index = 0; index < this.__getItems().length; index++) {
          if (value === this.getItemValue(this.__getItems()[index])) {
            return index;
          }
        }
      }

      return -1;
    };

    SlideSelectorControl.prototype.scrollToInit = function() {
      var index = this.indexOf(this.getSelectedValue());
      if (index === -1) {
        index = this.__getItems().length;
      } else {
        index += this.__getItems().length;
      }

      this.scrollByItemIndex(index);
    };

    SlideSelectorControl.prototype.getItemPanelElement = function() {
      if (!this.$$itemsPanelElem) {
        this.$$itemsPanelElem = this.getElement().find(".items-pannel");
      }

      return this.$$itemsPanelElem;
    };

    SlideSelectorControl.prototype.onRepeatRendered = function() {
      var that = this;
      if (that.__$$calcScrollTop) {
        this.getItemPanelElement().scrollTop(that.__$$calcScrollTop);
        return;
      }

      this.scrollToInit();

      var timer = null;
      this.getItemPanelElement().off("scroll").on("scroll", function(event) {
        var elem = this;
        var index = Math.ceil(elem.scrollTop / ItemHeight);
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
      if (oldValue !== value) {
        this.raiseEvent("selectedChanged", [value, oldValue, this]);
      }
      return this;
    };

    SlideSelectorControl.prototype.isItemSelected = function(item, index) {
      var scrollTop = this.getScrollTop();
      return Math.ceil(scrollTop / ItemHeight) + this.getOffsetItemCount() === index;
    };

    SlideSelectorControl.prototype.setScrollTop = function(scrollTop) {
      this.$$scrollTop = scrollTop;
      return this;
    };

    SlideSelectorControl.prototype.getScrollTop = function() {
      return this.$$scrollTop || 0;
    };

    SlideSelectorControl.prototype.scrollToNextElement = function() {
      this.getItemPanelElement().scrollTop(this.getScrollTop() + ItemHeight);
    };

    SlideSelectorControl.prototype.scrollToPerviousElement = function() {
      this.getItemPanelElement().scrollTop(this.getScrollTop() - ItemHeight);
    };

    SlideSelectorControl.prototype.getOffsetItemCount = function() {
      return this.getOptions().offsetItemCount || OffsetItemCount;
    };

    SlideSelectorControl.prototype.isActive = function() {
      return this.$$active === true;
    };

    SlideSelectorControl.prototype.setActive = function(val) {
      if (this.$$active !== val) {
        var oldValue = this.$$active;
        this.$$active = val;
        var that = this;
        if (val) {
          $(document).on("click", that.onClick.bind(this));
        } else {
          $(document).off("click", that.onClick.bind(this));
        }
        this.raiseEvent("activeChanged", [val, oldValue, this]);
      }
      return this;
    };

    SlideSelectorControl.prototype.onClick = function(event) {
      if ($(event.target).closest(`#${this.getId()}`).length === 0) {
        var that = this;
        $timeout(function() {
          that.setActive(false);
        });
      }
    };

    SlideSelectorControl.prototype.scrollByItemIndex = function(index) {
      var position = ItemHeight * (index - this.getOffsetItemCount());
      this.getItemPanelElement().scrollTop(position);
    };

    SlideSelectorControl.prototype.onItemClicked = function(item, index) {
      if (this.isActive()) {
        this.scrollByItemIndex(index);
        return;
      }

      if (!this.isActive() && this.isItemSelected(item, index)) {
        this.setActive(true);
      }
    };

    return SlideSelectorControl;
  }
]);