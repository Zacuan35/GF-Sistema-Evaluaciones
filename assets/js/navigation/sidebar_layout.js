/* =====================
# SIDEBAR LAYOUT
===================== */

// Make sure jQuery has been loaded before app.js
if (typeof jQuery === "undefined") {
  throw new Error("AdminLTE requires jQuery");
}

'use strict';

$.AdminLTE = {};

/* --------------------
 * - AdminLTE Options -
 * -------------------- */

$.AdminLTE.options = {
  // Add slimscroll to navbar menus
  navbarMenuSlimscroll: true,
  navbarMenuSlimscrollWidth: "3px",
  navbarMenuHeight: "200px",

  // Sidebar push menu toggle button selector
  sidebarToggleSelector: "[data-toggle='offcanvas']",

  // Activate sidebar push menu
  sidebarPushMenu: true,

  // Activate sidebar slimscroll if fixed layout is enabled
  sidebarSlimScroll: true,

  // Global colors
  colors: {
    lightBlue: "#3c8dbc",
    red: "#f56954",
    green: "#00a65a",
    aqua: "#00c0ef",
    yellow: "#f39c12",
    blue: "#0073b7",
    navy: "#001F3F",
    teal: "#39CCCC",
    olive: "#3D9970",
    lime: "#01FF70",
    orange: "#FF851B",
    fuchsia: "#F012BE",
    purple: "#8E24AA",
    maroon: "#D81B60",
    black: "#222222",
    gray: "#d2d6de"
  }
};

/* ------------------
 * - Implementation -
 * ------------------ */

$(function () {

  // Easy access to options
  var o = $.AdminLTE.options;

  // Activate layout
  $.AdminLTE.layout.activate();

  // Enable sidebar tree view
  $.AdminLTE.tree('.sidebar');

  // Navbar slimscroll
  if (o.navbarMenuSlimscroll && typeof $.fn.slimscroll !== 'undefined') {

    $(".navbar .menu")
      .slimscroll({
        height: o.navbarMenuHeight,
        alwaysVisible: false,
        size: o.navbarMenuSlimscrollWidth
      })
      .css("width", "100%");
  }

  // Activate sidebar push menu
  if (o.sidebarPushMenu) {
    $.AdminLTE.pushMenu(o.sidebarToggleSelector);
  }

  /* ------------------------
   * INITIALIZE BUTTON TOGGLE
   * ------------------------ */

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
 * - AdminLTE Functions -
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

    // Get dimensions
    var headerHeight = $('.main-header').outerHeight() || 0;
    var footerHeight = $('.main-footer').outerHeight() || 0;

    var neg = headerHeight + footerHeight;

    var windowHeight = $(window).height();
    var sidebarHeight = $(".sidebar").height();

    // Fixed layout
    if ($("body").hasClass("fixed")) {

      $(".content-wrapper, .right-side").css(
        'min-height',
        windowHeight - footerHeight
      );

    } else {

      if (windowHeight >= sidebarHeight) {

        $(".content-wrapper, .right-side").css(
          'min-height',
          windowHeight - neg
        );

      } else {

        $(".content-wrapper, .right-side").css(
          'min-height',
          sidebarHeight
        );
      }
    }
  },

  fixSidebar: function () {

    // Non fixed layout
    if (!$("body").hasClass("fixed")) {

      if (typeof $.fn.slimScroll !== 'undefined') {
        $(".sidebar").slimScroll({
          destroy: true
        }).height("auto");
      }

      return;
    }

    // Fixed layout requires slimscroll
    if (typeof $.fn.slimScroll === 'undefined') {

      if (window.console) {
        console.error(
          "Error: the fixed layout requires the slimscroll plugin!"
        );
      }

      return;
    }

    // Enable slimscroll
    if ($.AdminLTE.options.sidebarSlimScroll) {

      $(".sidebar")
        .slimScroll({
          destroy: true
        })
        .height("auto");

      $(".sidebar").slimscroll({
        height: (
          $(window).height() - $(".main-header").height()
        ) + "px",

        color: "rgba(0,0,0,0.2)",
        size: "3px"
      });
    }
  }
};

/* =====================
 * PushMenu
 * ===================== */

$.AdminLTE.pushMenu = function (toggleBtn) {

  // Sidebar toggle
  $(toggleBtn).on("click", function (e) {

    e.preventDefault();

    $("body").toggleClass('sidebar-collapse');
    $("body").toggleClass('sidebar-open');
  });

  // Close sidebar on mobile when clicking content
  $(".content-wrapper").on("click", function () {

    if (
      $(window).width() <= 767 &&
      $("body").hasClass("sidebar-open")
    ) {
      $("body").removeClass('sidebar-open');
    }
  });
};

/* =====================
 * Tree Menu
 * ===================== */

$.AdminLTE.tree = function (menu) {

  $("li a", $(menu)).on("click", function (e) {

    var $this = $(this);
    var checkElement = $this.next();

    // Open/close only treeview menus
    if (checkElement.is('.treeview-menu')) {

      e.preventDefault();

      // Menu already open
      if (checkElement.is(':visible')) {

        checkElement.slideUp('normal', function () {
          checkElement.removeClass('menu-open');
        });

        checkElement.parent("li").removeClass("active");

      } else {

        // Parent menu
        var parent = $this.parents('ul').first();

        // Close other opened menus
        var ul = parent.find('ul:visible').slideUp('normal');

        ul.removeClass('menu-open');

        // Current parent li
        var parentLi = $this.parent("li");

        // Open current menu
        checkElement.slideDown('normal', function () {

          checkElement.addClass('menu-open');

          parent.find('li.active').removeClass('active');

          parentLi.addClass('active');
        });
      }
    }
  });
};