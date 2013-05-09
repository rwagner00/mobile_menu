(function ($) {
  Drupal.behaviors.mobile_menu = {
    attach: function(context, settings) {

      var currentWidth = getwidth();
      var breakpoint = Drupal.settings.mobile_menu.menu_breakpoint;
      var menu_ids = Drupal.settings.mobile_menu.menu_ids;

      //On document load, check to see if at the mobile breakpoint. If so, trigger mobile mode.
      if (currentWidth <= breakpoint) {
        mobilizeMenus(menu_ids);
      };

      //Hides menus and binds click to show.
      function mobilizeMenus(menu_array) {
        $.each( menu_array, function(key, value) {
          $(value + " .menu").hide();
          $(value + " h2").bind('click', function() {
            $(value + " .menu").slideToggle();
          });
        });
      }

      //Shows menus and unbinds click.
      function desktopMenus(menu_array) {
        $.each( menu_array, function(key, value) {
          $(value + " .menu").show();
          $(value + " h2").unbind('click');
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

      //Monitors browser resizing and modifies menus if the breakpoint is crossed. Does not fire if the breakpoint wasn't crossed.
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