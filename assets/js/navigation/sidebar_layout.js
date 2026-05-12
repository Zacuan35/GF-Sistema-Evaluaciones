/* =====================
# SIDEBAR LAYOUT
===================== */

if (typeof jQuery === "undefined") {
  throw new Error("AdminLTE requires jQuery");
}

'use strict';

$.AdminLTE = {};

/* --------------------
 * - AdminLTE Options -
 * -------------------- */

$.AdminLTE.options = {

  navbarMenuSlimscroll: true,
  navbarMenuSlimscrollWidth: "3px",
  navbarMenuHeight: "200px",

  sidebarToggleSelector: "[data-toggle='offcanvas']",

  sidebarPushMenu: true,

  sidebarSlimScroll: true
};

/* ------------------
 * - Init -
 * ------------------ */

$(function () {

  var o = $.AdminLTE.options;

  $.AdminLTE.layout.activate();

  $.AdminLTE.tree('.sidebar');

  if (o.navbarMenuSlimscroll && typeof $.fn.slimscroll !== 'undefined') {

    $(".navbar .menu")
      .slimscroll({
        height: o.navbarMenuHeight,
        alwaysVisible: false,
        size: o.navbarMenuSlimscrollWidth
      })
      .css("width", "100%");
  }

  if (o.sidebarPushMenu) {
    $.AdminLTE.pushMenu(o.sidebarToggleSelector);
  }

  $('.btn-group[data-toggle="btn-toggle"]').each(function () {

    var group = $(this);

    group.find(".btn").on("click", function (e) {

      e.preventDefault();

      group.find(".btn.active").removeClass("active");

      $(this).addClass("active");
    });
  });
});

/* ----------------------
 * - Layout -
 * ---------------------- */

$.AdminLTE.layout = {

  activate: function () {

    var _this = this;

    _this.fix();
    _this.fixSidebar();

    $(window).on("resize", function () {
      _this.fix();
      _this.fixSidebar();
    });
  },

  fix: function () {

    var header = $('.main-header').outerHeight() || 0;
    var footer = $('.main-footer').outerHeight() || 0;

    var neg = header + footer;

    var windowHeight = $(window).height();
    var sidebarHeight = $(".sidebar").height();

    if ($("body").hasClass("fixed")) {

      $(".content-wrapper, .right-side").css(
        "min-height",
        windowHeight - footer
      );

    } else {

      if (windowHeight >= sidebarHeight) {

        $(".content-wrapper, .right-side").css(
          "min-height",
          windowHeight - neg
        );

      } else {

        $(".content-wrapper, .right-side").css(
          "min-height",
          sidebarHeight
        );
      }
    }
  },

  fixSidebar: function () {

    if (!$("body").hasClass("fixed")) {

      if (typeof $.fn.slimScroll !== 'undefined') {
        $(".sidebar").slimScroll({ destroy: true }).height("auto");
      }

      return;
    }

    if (typeof $.fn.slimScroll === 'undefined') {
      if (window.console) {
        console.error("SlimScroll is required for fixed layout");
      }
      return;
    }

    if ($.AdminLTE.options.sidebarSlimScroll) {

      $(".sidebar")
        .slimScroll({ destroy: true })
        .height("auto");

      $(".sidebar").slimscroll({
        height: ($(window).height() - $(".main-header").height()) + "px",
        color: "rgba(0,0,0,0.2)",
        size: "3px"
      });
    }
  }
};

/* ----------------------
 * - Push Menu -
 * ---------------------- */

$.AdminLTE.pushMenu = function (toggleBtn) {

  $(toggleBtn).on("click", function (e) {

    e.preventDefault();

    $("body").toggleClass("sidebar-collapse");
    $("body").toggleClass("sidebar-open");
  });

  $(".content-wrapper").on("click", function () {

    if (
      $(window).width() <= 767 &&
      $("body").hasClass("sidebar-open")
    ) {
      $("body").removeClass("sidebar-open");
    }
  });
};

/* ----------------------
 * - Tree Menu -
 * ---------------------- */

$.AdminLTE.tree = function (menu) {

  $("li a", $(menu)).on("click", function (e) {

    var $this = $(this);
    var next = $this.next();

    if (next.is(".treeview-menu")) {

      e.preventDefault();

      if (next.is(":visible")) {

        next.slideUp("normal", function () {
          next.removeClass("menu-open");
        });

        next.parent("li").removeClass("active");

      } else {

        var parent = $this.parents("ul").first();

        parent.find("ul:visible").slideUp("normal").removeClass("menu-open");

        var parentLi = $this.parent("li");

        next.slideDown("normal", function () {

          next.addClass("menu-open");

          parent.find("li.active").removeClass("active");

          parentLi.addClass("active");
        });
      }
    }
  });
};