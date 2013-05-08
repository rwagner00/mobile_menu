(function ($) {
  Drupal.behaviors.mobile_menu = {
    attach: function(context, settings) {
      var menuid = "#block-system-navigation";
      $( menuid + " .menu", context).hide();
      $( "#block-system-navigation h2").click(function() {
        $( "#block-system-navigation .menu").slideToggle();

      });
    }
  }

})(jQuery);