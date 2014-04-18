/*

LT Tooltip - v0.2.1
A super light-weight tooltip plugin for jQuery

Copyright 2013 Lorin Tackett
Released under the MIT license
http://en.wikipedia.org/wiki/MIT_License

============================================================================ */

(function($){
  $.ltTooltip = function(){
    var tooltip;

    // Add tooltip div and bind var to it
    $(document).ready(function(){ tooltip = $('<div id="tooltip"></div>').appendTo("body"); });

    centerTip = function(ordinal) {
      var $tip = $(tooltip).find(".tip");
      $tip.removeAttr("style");

      if (ordinal === "vertical")    { $tip.css({top:   ($(tooltip).outerHeight() / 2)  - ($tip.outerHeight() / 2)}) };
      if (ordinal === "horizontal")  { $tip.css({left:  ($(tooltip).outerWidth() / 2)   - ($tip.outerWidth() / 2)}) };
    };

    positionTop = function(el) {
      $(tooltip).addClass("top").css({    top: el.offset().top - ($(tooltip).outerHeight()),
                                          left: el.offset().left - ($(tooltip).outerWidth(false) / 2) + (el.outerWidth(false) / 2) });
      centerTip("horizontal");
    };

    positionRight = function(el) {
      $(tooltip).addClass("right").css({  top: el.offset().top - ($(tooltip).outerHeight(false) / 2) + (el.outerHeight(false) / 2),
                                          left: el.offset().left + (el.outerWidth(false)) });
      centerTip("vertical");
    };

    positionBottom = function(el) {
      $(tooltip).addClass("bottom").css({ top: el.offset().top + (el.outerHeight(false)),
                                          left: el.offset().left - ($(tooltip).outerWidth(false) / 2) + (el.outerWidth(false) / 2) });
      centerTip("horizontal");
    };

    positionLeft = function(el) {
      $(tooltip).addClass("left").css({   top: el.offset().top - ($(tooltip).outerHeight(false) / 2) + (el.outerHeight(false) / 2),
                                          left: el.offset().left - ($(tooltip).outerWidth(false)) });
      centerTip("vertical");
    };

    $(document).on({
      mouseenter: function(){
        $(tooltip)
          .removeAttr("class")                  // Remove all classes
          .addClass("active")                   // Show Tooltip
          .html($(this).data().text)            // Add Content from data attribute 'text'
          .append('<span class="tip"></span>'); // Append tip elem

        if      ($(this).hasClass("top"))     { positionTop($(this)); }     // Tooltip on top
        else if ($(this).hasClass("right"))   { positionRight($(this)); }   // Tooltip to the right
        else if ($(this).hasClass("bottom"))  { positionBottom($(this)); }  // Tooltip on bottom
        else if ($(this).hasClass("left"))    { positionLeft($(this)); }    // Tooltip to the left
        else                                  { positionBottom($(this)); }  // Default
      },

      mouseleave: function(){
        $(tooltip).removeAttr("class"); // Remove all classes
      },

      click: function(){
        $(tooltip).removeAttr("class"); // Remove all classes
      }
    }, '.tooltip');
  };

  $.ltTooltip()
})(jQuery)