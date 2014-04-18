###

LT Dropdown - v0.1.0
A super light-weight dropdown menu plugin for jQuery

Copyright 2014 Lorin Tackett
Released under the MIT license
http://en.wikipedia.org/wiki/MIT_License

============================================================================ ###

do ($ = jQuery, window, document) ->

  # Defaults
  pluginName = "ltDropdown"
  defaults =
    handle: "> li > a"
    menu:   "li > ul"

  class Plugin
    constructor: (@element, options) ->
      @settings = $.extend {}, defaults, options
      @_defaults = defaults
      @_name = "ltDropdown"
      @init()


    # Initialization
    # ============================================================================

    init: ->
      self           = @
      self.handle    = $(@element).find(@settings.handle)
      self.menu      = $(@element).find(@settings.menu)
      self.menuItems = self.menu.find('a')

      # Add CSS classes
      self.handle.addClass('dropdown-handle')
      self.menu.addClass('dropdown-menu')

      # Toggle menu when handle is clicked.
      self.handle.on 'click', (event) ->
        event.preventDefault()
        self.toggleMenu()

      self.menuItems.on 'click', (event) ->
        event.preventDefault()
        self.selectMenuItem($(@).text(), $(@).data('value'))


    # Utility functions
    # ============================================================================

    showMenu: ->
      self = @
      self.setMenuPosition()
      $(self.element).addClass('active')

    hideMenu: ->
      self = @
      $(self.element).removeClass('active')

    toggleMenu: ->
      self = @
      if $(self.element).hasClass 'active'
        self.hideMenu()
      else
        self.showMenu()

    selectMenuItem: (text, value) ->
      self = @

      self.handle.text(text)
      self.handle.data('value', value)
      self.hideMenu()

    setMenuPosition: ->
      self = @

      # right align the dropdown by offsetting it by the difference between the width of the button, and the width of the dropdown
      rightAlignOffset = (self.menu.outerWidth() - self.handle.outerWidth())
      self.menu.css('top', self.handle.offset().top + self.handle.outerHeight())
      self.menu.css('left', self.handle.offset().left - rightAlignOffset)


  # Plugin wrapper around the constructor
  # ============================================================================
  $.fn[pluginName] = (options) ->
    @each ->
      unless $.data @, "plugin_#{pluginName}"
        $.data @, "plugin_#{pluginName}", new Plugin @, options