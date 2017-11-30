'use strict';

angular.module('huoyun.widget').factory("TabItemControl", ["HuoYunWidgetCore", "TabItemHeaderControl",
  function(HuoYunWidgetCore, TabItemHeaderControl) {

    function TabItemControl(options) {
      HuoYunWidgetCore.Control.apply(this, arguments);
    }

    HuoYunWidgetCore.ClassExtend(TabItemControl, HuoYunWidgetCore.Control);


    TabItemControl.prototype.setTab = function(tab) {
      this.$$tab = tab;
      return this;
    };

    TabItemControl.prototype.getTab = function() {
      return this.$$tab;
    };

    TabItemControl.prototype.getHeader = function() {
      if (!this.$$header) {
        this.$$header = new TabItemHeaderControl(this.getOptions().header).setTabItem(this);
      }
      return this.$$header;
    };

    TabItemControl.prototype.getContent = function() {
      return this.getOptions().content;
    };

    TabItemControl.prototype.isSelected = function() {
      return this.$$selected;
    };

    TabItemControl.prototype.selected = function() {
      this.$$selected = true;
      var that = this;
      this.getTab().getTabItems().forEach(function(tabItem) {
        if (that !== tabItem) {
          tabItem.unselected();
        }
      });
    };

    TabItemControl.prototype.unselected = function() {
      this.$$selected = false;
    };

    TabItemControl.prototype.onClick = function() {
      if (!this.isSelected()) {
        var oldSelectedItem = this.getTab().getSelectedTabItem();
        this.selected();
        this.getTab().raiseEvent("selectedChanged", [this, oldSelectedItem, this.getTab()]);
      }
    };

    TabItemControl.prototype.setTemplate = function(template) {
      this.$$template = template;
      return this;
    };

    TabItemControl.prototype.getTemplate = function() {
      return this.$$template;
    };


    return TabItemControl;
  }
]);