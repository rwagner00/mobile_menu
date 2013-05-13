(function ($) {
  Drupal.behaviors.mobile_menu = {
    attach: function(context, settings) {

      //Get current width and set variables and manage multiple vs. single values for menu ids.
      var currentWidth = getwidth();
      var breakpoint = Drupal.settings.mobile_menu.menu_breakpoint;
      if (typeof(Drupal.settings.mobile_menu.menu_ids) == "string") {
        var menu_ids = [Drupal.settings.mobile_menu.menu_ids];
      } else {
        var menu_ids = Drupal.settings.mobile_menu.menu_ids;
      };
      var title_hide = Drupal.settings.mobile_menu.hide_title;

      //On document load, check to see if at the mobile breakpoint. If so, trigger mobile mode.
      if (currentWidth <= breakpoint) {
        mobilizeMenus(menu_ids);
      };

      //On document load, if title hide is true and we're above the breakpoint, hide menu titles.
      if (currentWidth > breakpoint && title_hide == 1) {
        $.each( menu_ids, function(key, value) {
          $(value + " h2").hide();
        });
      };

      //Hides menus and binds click to show.
      function mobilizeMenus(menu_array) {
        $.each( menu_array, function(key, value) {
          $(value + " ul").not(":.contextual-links").hide();
          $(value + " h2").show().bind('click', function() {
            $(value + " ul").not(":.contextual-links").slideToggle();
          });
        });
      }

      //Shows menus and unbinds click.
      function desktopMenus(menu_array) {
        $.each( menu_array, function(key, value) {
          $(value + " ul").show();
          $(value + " h2").unbind('click');
          if (title_hide == 1) {
            $(value + " h2").hide();
          };
        });
      }

      //Cross browser friendly function to get the width of the window and return it.
      function getwidth() {
        if (typeof window.innerWidth != 'undefined') {
          viewportwidth = window.innerWidth;
        }
        // IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
        else if (typeof document.documentElement != 'undefined'
          && typeof document.documentElement.clientWidth !=
          'undefined' && document.documentElement.clientWidth != 0) {
            viewportwidth = document.documentElement.clientWidth;
        }
        // older versions of IE
        else {
          viewportwidth = document.getElementsByTagName('body')[0].clientWidth;
        }
        return viewportwidth;
      }

      //Monitors browser resizing and modifies menus if the breakpoint is crossed. Does not trigger mobilizeMenus/desktopMenus if the breakpoint wasn't crossed.
      $(window).resize(function() {
        if ((getwidth() > breakpoint && currentWidth <= breakpoint) || (getwidth() <= breakpoint && currentWidth >= breakpoint)) {
          currentWidth = getwidth();
          if (currentWidth > breakpoint) {
            desktopMenus(menu_ids);
          } else{
            mobilizeMenus(menu_ids);
          };
        };
      });      

    }
  }

})(jQuery);