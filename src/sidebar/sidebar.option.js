'use strict';

angular.module('huoyun.widget').factory("SidebarOption", ["SidebarGroupOption",
  function(SidebarGroupOption) {

    function SidebarOption(options) {
      this.groups = [];
      if (Array.isArray(options.groups)) {
        var that = this;
        options.groups.forEach(function(group) {
          that.groups.push(new SidebarGroupOption(group));
        });
      }
    }

    SidebarOption.prototype.setGroupItemSelected = function(groupName, groupItemName) {
      var that = this;
      this.groups.forEach(function(group) {
        if (group.name === groupName) {
          group.setGroupItemSelected(groupItemName);
        } else {
          group.unselectedAll();
        }
      });
    };

    return SidebarOption;
  }
]);

angular.module('huoyun.widget').factory("SidebarGroupOption", ["SidebarGroupItemOption",
  function(SidebarGroupItemOption) {

    const props = ["name", "label", "icon"];

    function SidebarGroupOption(options) {
      var that = this;
      props.forEach(function(prop) {
        that[prop] = options[prop];
      });

      this.items = [];
      if (Array.isArray(options.items)) {
        options.items.forEach(function(item) {
          that.items.push(new SidebarGroupItemOption(item));
        });
      }
    }

    SidebarGroupOption.prototype.unselectedAll = function() {
      this.items.forEach(function(groupItem) {
        groupItem.setUnselected();
      });
    };

    SidebarGroupOption.prototype.setGroupItemSelected = function(groupItemName) {
      this.items.forEach(function($groupItem) {
        if ($groupItem.name === groupItemName) {
          $groupItem.setSelected();
        } else {
          $groupItem.setUnselected();
        }
      });
    };

    return SidebarGroupOption;
  }
]);

angular.module('huoyun.widget').factory("SidebarGroupItemOption", [function() {

  const props = ["name", "label", "onClick", "selected"];

  function SidebarGroupItemOption(options) {
    var that = this;
    props.forEach(function(prop) {
      that[prop] = options[prop];
    });
  }

  SidebarGroupItemOption.prototype.setSelected = function() {
    this.selected = true;
  };

  SidebarGroupItemOption.prototype.setUnselected = function() {
    this.selected = false;
  };


  return SidebarGroupItemOption;
}]);