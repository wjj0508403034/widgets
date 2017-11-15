'use strict';


angular.module('huoyun.widget').factory("PaginationControl", ["HuoYunWidgetCore",
  function(HuoYunWidgetCore) {

    const Default_Pagination_Count = 5;

    function PaginationControl(options) {
      HuoYunWidgetCore.Control.apply(this, arguments);
    }

    HuoYunWidgetCore.ClassExtend(PaginationControl, HuoYunWidgetCore.Control);

    PaginationControl.prototype.setData = function(data) {
      this.setTotalPages(data.totalPages)
        .setFirst(data.first)
        .setLast(data.last)
        .setCurrentPage(data.currentPage)
        .__reset();
    };

    PaginationControl.prototype.__reset = function() {
      this.$$pages = null;
      return this;
    };

    PaginationControl.prototype.isFirst = function() {
      return this.getOptions().first === true;
    };

    PaginationControl.prototype.setFirst = function(val) {
      this.getOptions().first = val;
      return this;
    };

    PaginationControl.prototype.setLast = function(val) {
      this.getOptions().last = val;
      return this;
    };

    PaginationControl.prototype.isLast = function() {
      return this.getOptions().last === true;
    };

    PaginationControl.prototype.getTotalPages = function() {
      return this.getOptions().totalPages;
    };

    PaginationControl.prototype.setTotalPages = function(val) {
      this.getOptions().totalPages = val;
      return this;
    };

    PaginationControl.prototype.getPages = function() {
      if (!this.$$pages) {
        this.$$pages = [];

        var paginationCount = this.getPaginationCount();
        var totalPages = this.getTotalPages();

        var beginPage = parseInt(this.getCurrentPage() / paginationCount) * paginationCount;
        var endPage = beginPage + paginationCount;
        if (endPage > totalPages) {
          endPage = totalPages;
        }
        for (var index = beginPage; index < endPage; index++) {
          this.$$pages.push(index);
        }
      }

      return this.$$pages;
    };

    PaginationControl.prototype.getCurrentPage = function() {
      return this.getOptions().currentPage;
    };

    PaginationControl.prototype.setCurrentPage = function(val) {
      this.getOptions().currentPage = val;
      return this;
    };

    PaginationControl.prototype.activeClass = function(page) {
      return this.getCurrentPage() === page ? "active" : "";
    };

    PaginationControl.prototype.getPageText = function(page) {
      return page + 1;
    };

    PaginationControl.prototype.onPageClick = function(page) {
      this.raiseEvent("pageChanged", [page, this]);
    };

    PaginationControl.prototype.move = function(page) {
      if (page < 0 || page >= this.getTotalPages()) {
        throw new Error("invalid arguments");
      }

      this.setCurrentPage(page)
        .setFirst(page === 0)
        .setLast(page === this.getTotalPages() - 1)
        .__reset();
    };

    PaginationControl.prototype.getPaginationCount = function() {
      return this.getOptions().paginationCount || Default_Pagination_Count;
    };

    PaginationControl.prototype.onPerviousClick = function() {
      if (!this.isFirst()) {
        this.onPageClick(this.getCurrentPage() - 1);
      }
    };

    PaginationControl.prototype.onNextClick = function() {
      if (!this.isLast()) {
        this.onPageClick(this.getCurrentPage() + 1);
      }
    };

    return PaginationControl;
  }
]);