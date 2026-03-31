"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * The main js file.
 *
 * @since      3.0.0
 * @package    wc-ajax-product-filter
 * @subpackage wc-ajax-product-filter/public/js
 * @author     Mainul Hassan
 */

var wcapf_params = wcapf_params || {
  'is_rtl': '',
  'filter_input_delay': '',
  'combobox_display_selected_options': '',
  'combobox_no_results_text': '',
  'combobox_options_none_text': '',
  'search_box_in_default_orderby': '',
  'preserve_hierarchy_accordion_state': '',
  'preserve_soft_limit_state': '',
  'enable_animation_for_filter_accordion': '',
  'filter_accordion_animation_speed': '',
  'filter_accordion_animation_easing': '',
  'enable_animation_for_hierarchy_accordion': '',
  'hierarchy_accordion_animation_speed': '',
  'hierarchy_accordion_animation_easing': '',
  'scroll_to_top_speed': '',
  'scroll_to_top_easing': '',
  'is_mobile': '',
  'reload_on_back': '',
  'found_wcapf': '',
  'wcapf_pro': '',
  'update_document_title': '',
  'use_tippyjs': '',
  'shop_loop_container': '',
  'not_found_container': '',
  'pagination_container': '',
  'orderby_form': '',
  'orderby_element': '',
  'disable_ajax': '',
  'enable_pagination_via_ajax': '',
  'sorting_control': '',
  'attach_combobox_on_sorting': '',
  'loading_animation': '',
  'scroll_window': '',
  'scroll_window_for': '',
  'scroll_window_when': '',
  'scroll_window_custom_element': '',
  'scroll_on': '',
  'scroll_to_top_offset': '',
  'disable_scroll_animation': '',
  'more_selectors': '',
  'custom_scripts': ''
};
(function ($, window) {
  var _delay = parseInt(wcapf_params.filter_input_delay);
  var delay = _delay >= 0 ? _delay : 1000;
  var isPro = wcapf_params.wcapf_pro;
  var $body = $('body');
  var $document = $(document);
  var instanceIds = [];
  var defaultOrderByElement = wcapf_params.orderby_form + ' ' + wcapf_params.orderby_element;
  $('.wcapf-filter').each(function () {
    var id = $(this).data('id');
    if (!id) {
      return;
    }
    instanceIds.push(id);
  });
  window.tippyInstances = [];
  window.WCAPF = window.WCAPF || {};
  window.WCAPF = {
    handleFilterAccordion: function handleFilterAccordion() {
      var toggleAccordion = function toggleAccordion($el) {
        // Check to see if the accordion is opened
        var pressed = $el.attr('aria-expanded') === 'true';

        // Change aria-expanded to the opposite state
        $el.attr('aria-expanded', !pressed);
        var $filterInner = $el.closest('.wcapf-filter').children('.wcapf-filter-inner');
        if (wcapf_params.enable_animation_for_filter_accordion) {
          $filterInner.slideToggle(wcapf_params.filter_accordion_animation_speed, wcapf_params.filter_accordion_animation_easing);
        } else {
          $filterInner.toggle();
        }
      };
      $body.on('click', '.wcapf-filter-accordion-trigger', function (e) {
        e.stopPropagation();
        toggleAccordion($(this));
      });
      $body.on('click', '.wcapf-filter-title.has-accordion', function () {
        var $trigger = $(this).find('.wcapf-filter-accordion-trigger');
        toggleAccordion($trigger);
      });
    },
    handleHierarchyToggle: function handleHierarchyToggle() {
      var toggleAccordion = function toggleAccordion($el) {
        // Check to see if the button is pressed
        var pressed = $el.attr('aria-pressed') === 'true';

        // Change aria-pressed to the opposite state
        $el.attr('aria-pressed', !pressed);
        var $child = $el.closest('li').children('ul');
        if (wcapf_params.enable_animation_for_hierarchy_accordion) {
          $child.slideToggle(wcapf_params.hierarchy_accordion_animation_speed, wcapf_params.hierarchy_accordion_animation_easing);
        } else {
          $child.toggle();
        }
      };
      $body.on('click', '.wcapf-hierarchy-accordion-toggle', function () {
        toggleAccordion($(this));
      }).on('keydown', '.wcapf-hierarchy-accordion-toggle', function (e) {
        if (e.key === ' ' || e.key === 'Enter' || e.key === 'Spacebar') {
          // Prevent the default action to stop scrolling when space is pressed
          e.preventDefault();
          toggleAccordion($(this));
        }
      });
    },
    handleSoftLimit: function handleSoftLimit() {
      var toggleFilterOptions = function toggleFilterOptions($el) {
        // Check to see if the button is pressed
        var pressed = $el.attr('aria-pressed') === 'true';

        // Change aria-pressed to the opposite state
        $el.attr('aria-pressed', !pressed);
        var $listWrapper = $el.closest('.wcapf-list-wrapper');
        if (pressed) {
          $listWrapper.removeClass('show-hidden-options');
        } else {
          $listWrapper.addClass('show-hidden-options');
        }
      };
      $body.on('click', '.wcapf-soft-limit-trigger', function () {
        toggleFilterOptions($(this));
      }).on('keydown', '.wcapf-soft-limit-trigger', function (e) {
        if (e.key === ' ' || e.key === 'Enter' || e.key === 'Spacebar') {
          // Prevent the default action to stop scrolling when space is pressed
          e.preventDefault();
          toggleFilterOptions($(this));
        }
      });
    },
    handleSearchFilterOptions: function handleSearchFilterOptions() {
      $body.on('input', '.wcapf-search-box input[type="text"]', function () {
        var $that = $(this);
        var $inner = $that.closest('.wcapf-filter-inner');
        var $filter = $inner.closest('.wcapf-filter');
        var softLimitEnabled = $filter.hasClass('has-soft-limit');
        var softLimitToggle = $filter.find('.wcapf-soft-limit-wrapper');
        var noResults = $filter.find('.wcapf-no-results-text');
        var visibleOptions = parseInt($filter.attr('data-visible-options'));
        var keyword = $that.val();
        if (!keyword.length) {
          var _index = 0;
          $filter.removeClass('search-active');
          $.each($inner.find('.wcapf-filter-options > li'), function () {
            _index++;
            var $filterItem = $(this);
            $filterItem.removeClass('keyword-matched');
            if (softLimitEnabled) {
              if (_index > visibleOptions) {
                $filterItem.addClass('wcapf-filter-option-hidden');
              } else {
                $filterItem.removeClass('wcapf-filter-option-hidden');
              }
            }
          });
          if (softLimitEnabled) {
            softLimitToggle.removeAttr('style');
          }
          noResults.children('span').text('');
          noResults.hide();
          return;
        }
        var index = 0;
        $filter.addClass('search-active');
        $.each($inner.find('.wcapf-filter-options > li'), function () {
          var $filterItem = $(this);
          var label = $filterItem.find('.wcapf-filter-item-label').data('label');
          if (label.toString().toLowerCase().includes(keyword.toLowerCase())) {
            index++;
            $filterItem.addClass('keyword-matched');
            if (softLimitEnabled) {
              if (index > visibleOptions) {
                $filterItem.addClass('wcapf-filter-option-hidden');
              } else {
                $filterItem.removeClass('wcapf-filter-option-hidden');
              }
            }
          } else {
            $filterItem.removeClass('keyword-matched');
          }
        });
        if (softLimitEnabled) {
          if (index <= visibleOptions) {
            softLimitToggle.hide();
          } else {
            softLimitToggle.show();
          }
        }
        if (0 === index) {
          noResults.children('span').text(keyword);
          noResults.show();
        } else {
          noResults.children('span').text('');
          noResults.hide();
        }
      });
      $body.on('click', '.wcapf-search-box .wcapf-clear-state', function () {
        var $that = $(this);
        var $searchBox = $that.closest('.wcapf-search-box');
        var $input = $searchBox.find('input[type="text"]');
        var $filter = $searchBox.closest('.wcapf-filter');
        $input.val('');
        $input.trigger('input');
        if ($filter.hasClass('wcapf-filter-keyword')) {
          $input.trigger('change');
        }
      });
      $body.on('change', '.wcapf-filter-keyword input[type="text"]', function () {
        var $that = $(this);
        var $wrapper = $that.closest('.wcapf-keyword-filter-wrapper');
        var keyword = $that.val();
        var filterURL = $wrapper.data('filter-url');
        var clearFilterURL = $wrapper.data('clear-filter-url');
        var url = keyword.length ? filterURL.replace('%s', keyword) : clearFilterURL;
        WCAPF.requestFilter(url);
      });
      $body.on('keydown', '.wcapf-filter-keyword input[type="text"]', function (e) {
        if ('Enter' === e.key) {
          $(this).trigger('change');
        }
      });
    },
    updateProductsCountResult: function updateProductsCountResult($response) {
      var $container = $(wcapf_params.shop_loop_container);
      var selector = '.woocommerce-result-count';
      var newCount = $response.find(selector).html();
      $body.find(selector).each(function () {
        var $el = $(this);
        if (!$container.has($el).length) {
          $el.html(newCount);
        }
      });
    },
    scrollTo: function scrollTo() {
      if ('none' === wcapf_params.scroll_window) {
        return;
      }
      var scrollFor = wcapf_params.scroll_window_for;
      var isMobile = wcapf_params.is_mobile;
      var proceed = false;
      if ('mobile' === scrollFor && isMobile) {
        proceed = true;
      } else if ('desktop' === scrollFor && !isMobile) {
        proceed = true;
      } else if ('both' === scrollFor) {
        proceed = true;
      }
      if (!proceed) {
        return;
      }
      var adjustingOffset = 0,
        offset = 0;
      if (wcapf_params.scroll_to_top_offset) {
        adjustingOffset = parseInt(wcapf_params.scroll_to_top_offset);
      }
      var container;
      if ($(wcapf_params.shop_loop_container).length) {
        container = wcapf_params.shop_loop_container;
      } else if ($(wcapf_params.not_found_container).length) {
        container = wcapf_params.not_found_container;
      }
      if ('custom' === wcapf_params.scroll_window) {
        container = wcapf_params.scroll_window_custom_element;
      }
      var $container = $(container);
      if ($container.length) {
        offset = $container.offset().top - adjustingOffset;
        if (offset < 0) {
          offset = 0;
        }
        $('html, body').stop().animate({
          scrollTop: offset
        }, wcapf_params.scroll_to_top_speed, wcapf_params.scroll_to_top_easing);
      }
    },
    // Things are done before fetching the products like showing the loading indicator.
    beforeFetchingProducts: function beforeFetchingProducts(triggeredBy) {
      $body.find('.wcapf-loader').addClass('is-active');
      if (!isPro && 'immediately' === wcapf_params.scroll_window_when) {
        WCAPF.scrollTo();
      }
      $document.trigger('wcapf_before_fetching_products', [triggeredBy]);
    },
    destroyTippyInstances: function destroyTippyInstances() {
      if (wcapf_params.use_tippyjs) {
        // @source https://github.com/atomiks/tippyjs/issues/473
        tippyInstances.forEach(function (instance) {
          instance.destroy();
        });
        tippyInstances.length = 0; // clear it
      }
    },
    // Things are done before updating the products like hiding the loading indicator.
    beforeUpdatingProducts: function beforeUpdatingProducts($response, triggeredBy) {
      $body.find('.wcapf-loader').removeClass('is-active');

      // Maybe good for performance.
      WCAPF.destroyTippyInstances();
      $document.trigger('wcapf_before_updating_products', [$response, triggeredBy]);
    },
    afterUpdatingProducts: function afterUpdatingProducts($response, triggeredBy) {
      WCAPF.updateProductsCountResult($response);

      // Reinitialize wcapf.
      WCAPF.init();
      if (!isPro && 'after' === wcapf_params.scroll_window_when) {
        WCAPF.scrollTo();
      }

      // Trigger events.
      $(document).trigger('ready');
      $(window).trigger('scroll');
      $(window).trigger('resize');

      // A3 Lazy Load support.
      $(window).trigger('lazyshow');
      if (wcapf_params.custom_scripts) {
        eval(wcapf_params.custom_scripts);
      }
      $document.trigger('wcapf_after_updating_products', [$response, triggeredBy]);
    },
    filterProducts: function filterProducts() {
      var triggeredBy = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'filter';
      WCAPF.beforeFetchingProducts(triggeredBy);
      $.ajax({
        url: window.location.href,
        success: function success(response) {
          var $response = $(response);
          WCAPF.beforeUpdatingProducts($response, triggeredBy);

          /**
           * Update document title.
           *
           * @source https://stackoverflow.com/a/7599562
           */
          if (wcapf_params.update_document_title) {
            document.title = $response.filter('title').text();
          }

          // Update the instances.
          var _loop = function _loop() {
            var id = _instanceIds[_i];
            var instanceId = '[data-id="' + id + '"]';
            var $instance = $(instanceId);
            var $inner = $instance.find('.wcapf-filter-inner');
            var _instance = $response.find(instanceId);

            // Preserve hierarchy accordion state.
            if (wcapf_params.preserve_hierarchy_accordion_state) {
              if ($instance.hasClass('has-hierarchy-accordion')) {
                $instance.find('.wcapf-hierarchy-accordion-toggle').each(function () {
                  var $el = $(this);
                  var id = $el.data('id');
                  var toggleSelector = ".wcapf-hierarchy-accordion-toggle[data-id=\"".concat(id, "\"]");

                  // Check to see if the accordion is opened
                  var pressed = $el.attr('aria-pressed') === 'true';
                  if (pressed) {
                    _instance.find(toggleSelector).attr('aria-pressed', 'true');
                    _instance.find(toggleSelector).closest('li').children('ul').show();
                  } else {
                    _instance.find(toggleSelector).attr('aria-pressed', 'false');
                    _instance.find(toggleSelector).closest('li').children('ul').hide();
                  }
                });
              }
            }

            // Preserve soft limit state.
            if (wcapf_params.preserve_soft_limit_state) {
              if ($instance.hasClass('has-soft-limit')) {
                var $listWrapper = $instance.find('.wcapf-list-wrapper');
                if ($listWrapper.hasClass('show-hidden-options')) {
                  _instance.find('.wcapf-list-wrapper').addClass('show-hidden-options');
                  _instance.find('.wcapf-soft-limit-trigger').attr('aria-pressed', 'true');
                } else {
                  _instance.find('.wcapf-list-wrapper').removeClass('show-hidden-options');
                  _instance.find('.wcapf-soft-limit-trigger').attr('aria-pressed', 'false');
                }
              }
            }
            var _html = _instance.find('.wcapf-filter-inner').html();

            // Finally update the instance.
            $inner.html(_html);

            // Remove search-active from any search box whose input is now empty.
            $instance.find('.wcapf-search-box.with-cross input[type="text"]').each(function () {
              if (!$(this).val()) {
                $(this).closest('.wcapf-filter').removeClass('search-active');
              }
            });
            $instance.trigger('wcapf-filter-updated', [_instance]);
          };
          for (var _i = 0, _instanceIds = instanceIds; _i < _instanceIds.length; _i++) {
            _loop();
          }

          // Update the active filters and reset filters.
          $body.find('.wcapf-active-filters, .wcapf-reset-filters').each(function () {
            var $that = $(this);
            var instanceId = '[data-id="' + $that.data('id') + '"]';
            $that.html($response.find(instanceId).html());
          });

          // Replace old shop loop with new one.
          var $shopLoopContainer = $response.find(wcapf_params.shop_loop_container);
          var $notFoundContainer = $response.find(wcapf_params.not_found_container);
          if (wcapf_params.shop_loop_container === wcapf_params.not_found_container) {
            $(wcapf_params.shop_loop_container).html($shopLoopContainer.html());
          } else {
            if ($(wcapf_params.not_found_container).length) {
              if ($shopLoopContainer.length) {
                $(wcapf_params.not_found_container).html($shopLoopContainer.html());
              } else if ($notFoundContainer.length) {
                $(wcapf_params.not_found_container).html($notFoundContainer.html());
              }
            } else if ($(wcapf_params.shop_loop_container).length) {
              if ($shopLoopContainer.length) {
                $(wcapf_params.shop_loop_container).html($shopLoopContainer.html());
              } else if ($notFoundContainer.length) {
                $(wcapf_params.shop_loop_container).html($notFoundContainer.html());
              }
            }
          }
          WCAPF.afterUpdatingProducts($response, triggeredBy);
        }
      });
    },
    requestFilter: function requestFilter(url) {
      var triggeredBy = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'filter';
      if (!url) {
        return;
      }
      if (wcapf_params.disable_ajax) {
        window.location.href = url;
      } else {
        history.pushState({
          wcapf: true
        }, '', url);
        WCAPF.filterProducts(triggeredBy);
      }
    },
    handleNumberInputFilters: function handleNumberInputFilters() {
      var rangeNumberSelectors = '.wcapf-range-number .min-value, .wcapf-range-number .max-value';
      $body.on('change', rangeNumberSelectors, function () {
        var $item = $(this);
        var $rangeNumber = $item.closest('.wcapf-range-number');
        var formatNumbers = $rangeNumber.attr('data-format-numbers');
        var rangeMinValue = parseFloat($rangeNumber.attr('data-range-min-value'));
        var rangeMaxValue = parseFloat($rangeNumber.attr('data-range-max-value'));
        var oldMinValue = parseFloat($rangeNumber.attr('data-min-value'));
        var oldMaxValue = parseFloat($rangeNumber.attr('data-max-value'));
        var decimalPlaces = $rangeNumber.attr('data-decimal-places');
        var thousandSeparator = $rangeNumber.attr('data-thousand-separator');
        var decimalSeparator = $rangeNumber.attr('data-decimal-separator');
        var getValue = function getValue(floatValue) {
          if (formatNumbers) {
            return numberFormat(floatValue, decimalPlaces, decimalSeparator, thousandSeparator);
          }
          return floatValue;
        };
        var minValue = parseFloat($rangeNumber.find('.min-value').val());
        var maxValue = parseFloat($rangeNumber.find('.max-value').val());

        // Force the minValue not to be empty.
        if (isNaN(minValue)) {
          minValue = rangeMinValue;
          $rangeNumber.find('.min-value').val(getValue(minValue));
        } else {
          $rangeNumber.find('.min-value').val(getValue(minValue));
        }

        // Force the maxValue not to be empty.
        if (isNaN(maxValue)) {
          maxValue = rangeMaxValue;
          $rangeNumber.find('.max-value').val(getValue(maxValue));
        } else {
          $rangeNumber.find('.max-value').val(getValue(maxValue));
        }

        // Force the minValue not to go below the rangeMinValue.
        if (minValue < rangeMinValue) {
          minValue = rangeMinValue;
          $rangeNumber.find('.min-value').val(getValue(minValue));
        }

        // Force the minValue not to go up the rangeMaxValue.
        if (minValue > rangeMaxValue) {
          minValue = rangeMaxValue;
          $rangeNumber.find('.min-value').val(getValue(minValue));
        }

        // Force the maxValue not to go up the rangeMaxValue.
        if (maxValue > rangeMaxValue) {
          maxValue = rangeMaxValue;
          $rangeNumber.find('.max-value').val(getValue(maxValue));
        }

        // Force the maxValue not to go below the minValue.
        if (minValue > maxValue) {
          maxValue = minValue;
          $rangeNumber.find('.max-value').val(getValue(maxValue));
        }

        // If value is not changed then don't proceed.
        if (minValue === oldMinValue && maxValue === oldMaxValue) {
          return;
        }
        if (minValue === rangeMinValue && maxValue === rangeMaxValue) {
          // Remove range filter.
          WCAPF.requestFilter($rangeNumber.data('clear-filter-url'));
        } else {
          // Add range filter.
          var url = $rangeNumber.data('url').replace('%1s', minValue).replace('%2s', maxValue);
          WCAPF.requestFilter(url);
        }
      });
      $body.on('keydown', rangeNumberSelectors, function (e) {
        if ('Enter' === e.key) {
          $(this).trigger('change');
        }
      });
    },
    handleListFilters: function handleListFilters() {
      var nativeInputs = '.list-type-native [type="checkbox"],' + '.list-type-native [type="radio"],' + '.list-type-custom-checkbox [type="checkbox"]';
      $body.on('change', nativeInputs, function () {
        $(this).closest('.wcapf-filter-item').toggleClass('item-active');
        WCAPF.requestFilter($(this).data('url'));
      });
      var customRadioSelector = '.list-type-custom-radio';
      $body.on('change', customRadioSelector + ' [type="checkbox"]', function () {
        $(this).closest('.wcapf-filter-item').toggleClass('item-active');

        // https://stackoverflow.com/a/5839924
        $(this).closest(customRadioSelector).find('.wcapf-filter-item.item-active [type="checkbox"]').not(this).prop('checked', false).closest('.wcapf-filter-item').removeClass('item-active');
        WCAPF.requestFilter($(this).data('url'));
      });
    },
    handleDropdownFilters: function handleDropdownFilters() {
      $body.on('change', '.wcapf-dropdown-wrapper select', function () {
        var $select = $(this);
        var values = $select.val();
        var filterURL = $select.data('url');
        var clearFilterURL = $select.data('clear-filter-url');
        var url;
        if (values.length) {
          url = filterURL.replace('%s', values.toString());
        } else {
          url = clearFilterURL;
        }
        WCAPF.requestFilter(url);
      });
    },
    handlePagination: function handlePagination() {
      if (wcapf_params.enable_pagination_via_ajax && wcapf_params.pagination_container) {
        var $container = $(wcapf_params.shop_loop_container);
        var _selectors = wcapf_params.pagination_container.split(',');
        var selectors = [];
        _selectors.forEach(function (selector) {
          if (selector) {
            selectors.push(selector + ' a');
          }
        });
        var selector = selectors.join(',');
        if ($container.length) {
          $container.on('click', selector, function (e) {
            e.preventDefault();
            var href = $(this).attr('href');
            WCAPF.requestFilter(href, 'paginate');
          });
        }
      }
    },
    handleDefaultOrderby: function handleDefaultOrderby() {
      if (!wcapf_params.sorting_control) {
        // Submit the orderby form when value is changed.
        $body.on('change', defaultOrderByElement, function () {
          $(this).closest('form').trigger('submit');
        });
        return;
      }

      // Prevent the auto submission of the orderby form.
      $body.on('submit', wcapf_params.orderby_form, function () {
        return false;
      });

      // Handle the filter request via ajax when the orderby value is changed.
      $body.on('change', defaultOrderByElement, function () {
        var order = $(this).val();
        var url = new URL(window.location);
        url.searchParams.set('orderby', order);
        WCAPF.requestFilter(getOrderByUrl(url.href));
        return false;
      });
    },
    handleClearFilter: function handleClearFilter() {
      $body.on('click', '.wcapf-filter-clear-btn', function (e) {
        e.stopPropagation();
        WCAPF.requestFilter($(this).attr('data-clear-filter-url'));
      });
    },
    handleFilterTooltip: function handleFilterTooltip() {
      // noinspection JSUnresolvedReference
      if ('function' !== typeof tippy) {
        return;
      }
      if (!wcapf_params.use_tippyjs) {
        return;
      }

      // noinspection JSUnresolvedReference
      tippy('.wcapf-filter-tooltip', {
        placement: 'top',
        content: function content(reference) {
          return reference.getAttribute('data-content');
        },
        allowHTML: true
      });
    },
    initCombobox: function initCombobox() {
      if (!jQuery().chosenWCAPF) {
        return;
      }
      var templateResult = function templateResult(text, data) {
        return ['<span>' + text + '</span>', '<span class="wcapf-count">' + data['countMarkup'] + '</span>'].join('');
      };
      var templateSelection = function templateSelection(text, data) {
        return ['<span class="wcapf-count-' + data.count + '">' + text + '</span>', '<span class="wcapf-count wcapf-count-' + data.count + '">' + data['countMarkup'] + '</span>'].join('');
      };
      var defaults = {
        inherit_select_classes: true,
        inherit_option_classes: true,
        no_results_text: wcapf_params.combobox_no_results_text,
        options_none_text: wcapf_params.combobox_options_none_text,
        search_contains: true,
        // Match from anywhere in string.
        search_in_values: true // Search in values also.
      };
      if (wcapf_params.is_rtl) {
        defaults['rtl'] = true;
      }
      $body.find('.wcapf-chosen').each(function () {
        var $this = $(this);
        var options = _objectSpread({}, defaults);

        // If hierarchy enabled then we show the selected options.
        if ($this.hasClass('has-hierarchy')) {
          options['display_selected_options'] = true;
        } else {
          options['display_selected_options'] = wcapf_params.combobox_display_selected_options;
        }

        // Enable templating when showing count.
        if ($this.hasClass('with-count')) {
          options['templateResult'] = templateResult;
          options['templateSelection'] = templateSelection;
        }

        // Disable search box.
        if (!$this.data('enable-search')) {
          options['disable_search'] = true;
        }
        $this.chosenWCAPF(options);
      });

      // Attach chosen for default orderby.
      if (wcapf_params.attach_combobox_on_sorting) {
        var disableSearch = true;
        if (wcapf_params.search_box_in_default_orderby) {
          disableSearch = false;
        }
        var options = _objectSpread({}, defaults);
        options['disable_search'] = disableSearch;
        $body.find(defaultOrderByElement).chosenWCAPF(options);
      }
    },
    initRangeSlider: function initRangeSlider() {
      if ('undefined' === typeof noUiSlider) {
        return;
      }
      $body.find('.wcapf-range-slider').each(function () {
        var $item = $(this);
        var $slider = $item.find('.wcapf-noui-slider');
        var sliderId = $slider.attr('id');
        var displayValuesAs = $item.attr('data-display-values-as');
        var formatNumbers = $item.attr('data-format-numbers');
        var rangeMinValue = parseFloat($item.attr('data-range-min-value'));
        var rangeMaxValue = parseFloat($item.attr('data-range-max-value'));
        var step = parseFloat($item.attr('data-step'));
        var decimalPlaces = $item.attr('data-decimal-places');
        var thousandSeparator = $item.attr('data-thousand-separator');
        var decimalSeparator = $item.attr('data-decimal-separator');
        var minValue = parseFloat($item.attr('data-min-value'));
        var maxValue = parseFloat($item.attr('data-max-value'));
        var $minValue = $item.find('.min-value');
        var $maxValue = $item.find('.max-value');
        var slider = document.getElementById(sliderId);
        var safeStep = isNaN(step) || step <= 0 ? 1 : step;
        noUiSlider.create(slider, {
          start: [minValue, maxValue],
          step: safeStep,
          connect: true,
          cssPrefix: 'wcapf-noui-',
          range: {
            'min': rangeMinValue,
            'max': rangeMinValue === rangeMaxValue ? rangeMinValue + safeStep : rangeMaxValue
          }
        });
        slider.noUiSlider.on('update', function (values) {
          var minValue;
          var maxValue;
          if (formatNumbers) {
            minValue = numberFormat(values[0], decimalPlaces, decimalSeparator, thousandSeparator);
            maxValue = numberFormat(values[1], decimalPlaces, decimalSeparator, thousandSeparator);
          } else {
            minValue = parseFloat(values[0]);
            maxValue = parseFloat(values[1]);
          }
          if ('plain_text' === displayValuesAs) {
            $minValue.html(minValue);
            $maxValue.html(maxValue);
          } else {
            $minValue.val(minValue);
            $maxValue.val(maxValue);
          }
        });
        function filterProductsAccordingToSlider(values) {
          var _minValue = parseFloat(values[0]);
          var _maxValue = parseFloat(values[1]);

          // If value is not changed then don't proceed.
          if (_minValue === minValue && _maxValue === maxValue) {
            return;
          }
          if (_minValue === rangeMinValue && _maxValue === rangeMaxValue) {
            // Remove range filter.
            WCAPF.requestFilter($item.data('clear-filter-url'));
          } else {
            // Add range filter.
            var url = $item.data('url').replace('%1s', _minValue).replace('%2s', _maxValue);
            WCAPF.requestFilter(url);
          }
        }
        var isDragging = false;
        slider.noUiSlider.on('start', function () {
          isDragging = true;
        });
        slider.noUiSlider.on('end', function () {
          isDragging = false;
          filterProductsAccordingToSlider(slider.noUiSlider.get());
        });
        slider.noUiSlider.on('change', function (values) {
          if (isDragging) {
            return;
          }

          // Keyboard interaction — debounce to avoid a request on every key press.
          clearTimeout($item.data('timer'));
          $item.data('timer', setTimeout(function () {
            $item.removeData('timer');
            filterProductsAccordingToSlider(values);
          }, delay));
        });
        $minValue.on('change', function () {
          var val = parseFloat($(this).val());
          slider.noUiSlider.set([isNaN(val) ? rangeMinValue : val, null]);
          filterProductsAccordingToSlider(slider.noUiSlider.get());
        });
        $minValue.on('keydown', function (e) {
          if ('Enter' === e.key) {
            $(this).trigger('change');
          }
        });
        $maxValue.on('change', function () {
          var val = parseFloat($(this).val());
          slider.noUiSlider.set([null, isNaN(val) ? rangeMaxValue : val]);
          filterProductsAccordingToSlider(slider.noUiSlider.get());
        });
        $maxValue.on('keydown', function (e) {
          if ('Enter' === e.key) {
            $(this).trigger('change');
          }
        });
      });
    },
    initFilterOptionTooltip: function initFilterOptionTooltip() {
      // noinspection JSUnresolvedReference
      if ('function' !== typeof tippy) {
        return;
      }
      if (!wcapf_params.use_tippyjs) {
        return;
      }
      var tooltipPositions = ['top', 'right', 'bottom', 'left'];
      tooltipPositions.forEach(function (tooltipPosition) {
        var identifier = 'data-wcapf-tooltip-' + tooltipPosition;

        // noinspection JSUnresolvedReference
        var instances = tippy('[' + identifier + ']', {
          placement: tooltipPosition,
          content: function content(reference) {
            return reference.getAttribute(identifier);
          },
          allowHTML: true
        });
        window.tippyInstances = tippyInstances.concat(instances);
      });
    },
    init: function init() {
      WCAPF.initCombobox();
      WCAPF.initRangeSlider();
      WCAPF.initFilterOptionTooltip();
    },
    handleFormSubmit: function handleFormSubmit() {
      $body.on('submit', '.wcapf-form', function (e) {
        e.preventDefault();
      });
    },
    initPopState: function initPopState() {
      if (wcapf_params.reload_on_back && wcapf_params.found_wcapf) {
        history.replaceState({
          wcapf: true
        }, '', window.location);

        // Handle the popstate event(browser's back/forward)
        window.addEventListener('popstate', function (e) {
          if (null !== e.state && e.state.hasOwnProperty('wcapf')) {
            WCAPF.filterProducts('popstate');
          }
        });
      }
    }
  };

  /**
   * Enable it if necessary.
   *
   * @source https://stackoverflow.com/a/33004917
   */
  if ('scrollRestoration' in history) {
    // history.scrollRestoration = 'manual';
  }
})(jQuery, window);
(function ($, WCAPF) {
  WCAPF.init();
  WCAPF.initPopState();
  WCAPF.handleFilterAccordion();
  WCAPF.handleHierarchyToggle();
  WCAPF.handleSoftLimit();
  WCAPF.handleSearchFilterOptions();
  WCAPF.handleListFilters();
  WCAPF.handleDropdownFilters();
  WCAPF.handleNumberInputFilters();
  WCAPF.handlePagination();
  WCAPF.handleDefaultOrderby();
  WCAPF.handleClearFilter();
  WCAPF.handleFilterTooltip();
  WCAPF.handleFormSubmit();

  /**
   * Make it compatible with other plugins.
   */
  $(document).on('wcapf_after_updating_products', function () {
    // woo-variation-swatches
    $(document).trigger('woo_variation_swatches_pro_init');
  });
})(jQuery, window.WCAPF);
"use strict";

/**
 * @source https://stackoverflow.com/a/34141813
 *
 * @param number
 * @param decimals
 * @param dec_point
 * @param thousands_sep
 *
 * @returns {string}
 */
function numberFormat(number, decimals, dec_point, thousands_sep) {
  // Strip all characters but numerical ones.
  number = (number + '').replace(/[^\d+\-Ee.]/g, '');
  var n = !isFinite(+number) ? 0 : +number;
  var prec = !isFinite(+decimals) ? 0 : Math.abs(decimals);
  var sep = typeof thousands_sep === 'undefined' ? ',' : thousands_sep;
  var dec = typeof dec_point === 'undefined' ? '.' : dec_point;
  var s;
  var toFixedFix = function toFixedFix(n, prec) {
    var k = Math.pow(10, prec);
    return '' + Math.round(n * k) / k;
  };

  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}
function cleanUrl(url) {
  return url.replace(/%2C/g, ',');
}
function getOrderByUrl(url) {
  var paged = parseInt(url.replace(/.+\/page\/(\d+)+/, '$1'));
  if (paged) {
    url = url.replace(/page\/(\d+)\//, '');
  }
  return cleanUrl(url);
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCJ1dGlscy5qcyJdLCJuYW1lcyI6WyJ3Y2FwZl9wYXJhbXMiLCIkIiwid2luZG93IiwiX2RlbGF5IiwicGFyc2VJbnQiLCJmaWx0ZXJfaW5wdXRfZGVsYXkiLCJkZWxheSIsImlzUHJvIiwid2NhcGZfcHJvIiwiJGJvZHkiLCIkZG9jdW1lbnQiLCJkb2N1bWVudCIsImluc3RhbmNlSWRzIiwiZGVmYXVsdE9yZGVyQnlFbGVtZW50Iiwib3JkZXJieV9mb3JtIiwib3JkZXJieV9lbGVtZW50IiwiZWFjaCIsImlkIiwiZGF0YSIsInB1c2giLCJ0aXBweUluc3RhbmNlcyIsIldDQVBGIiwiaGFuZGxlRmlsdGVyQWNjb3JkaW9uIiwidG9nZ2xlQWNjb3JkaW9uIiwiJGVsIiwicHJlc3NlZCIsImF0dHIiLCIkZmlsdGVySW5uZXIiLCJjbG9zZXN0IiwiY2hpbGRyZW4iLCJlbmFibGVfYW5pbWF0aW9uX2Zvcl9maWx0ZXJfYWNjb3JkaW9uIiwic2xpZGVUb2dnbGUiLCJmaWx0ZXJfYWNjb3JkaW9uX2FuaW1hdGlvbl9zcGVlZCIsImZpbHRlcl9hY2NvcmRpb25fYW5pbWF0aW9uX2Vhc2luZyIsInRvZ2dsZSIsIm9uIiwiZSIsInN0b3BQcm9wYWdhdGlvbiIsIiR0cmlnZ2VyIiwiZmluZCIsImhhbmRsZUhpZXJhcmNoeVRvZ2dsZSIsIiRjaGlsZCIsImVuYWJsZV9hbmltYXRpb25fZm9yX2hpZXJhcmNoeV9hY2NvcmRpb24iLCJoaWVyYXJjaHlfYWNjb3JkaW9uX2FuaW1hdGlvbl9zcGVlZCIsImhpZXJhcmNoeV9hY2NvcmRpb25fYW5pbWF0aW9uX2Vhc2luZyIsImtleSIsInByZXZlbnREZWZhdWx0IiwiaGFuZGxlU29mdExpbWl0IiwidG9nZ2xlRmlsdGVyT3B0aW9ucyIsIiRsaXN0V3JhcHBlciIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJoYW5kbGVTZWFyY2hGaWx0ZXJPcHRpb25zIiwiJHRoYXQiLCIkaW5uZXIiLCIkZmlsdGVyIiwic29mdExpbWl0RW5hYmxlZCIsImhhc0NsYXNzIiwic29mdExpbWl0VG9nZ2xlIiwibm9SZXN1bHRzIiwidmlzaWJsZU9wdGlvbnMiLCJrZXl3b3JkIiwidmFsIiwibGVuZ3RoIiwiaW5kZXgiLCIkZmlsdGVySXRlbSIsInJlbW92ZUF0dHIiLCJ0ZXh0IiwiaGlkZSIsImxhYmVsIiwidG9TdHJpbmciLCJ0b0xvd2VyQ2FzZSIsImluY2x1ZGVzIiwic2hvdyIsIiRzZWFyY2hCb3giLCIkaW5wdXQiLCJ0cmlnZ2VyIiwiJHdyYXBwZXIiLCJmaWx0ZXJVUkwiLCJjbGVhckZpbHRlclVSTCIsInVybCIsInJlcGxhY2UiLCJyZXF1ZXN0RmlsdGVyIiwidXBkYXRlUHJvZHVjdHNDb3VudFJlc3VsdCIsIiRyZXNwb25zZSIsIiRjb250YWluZXIiLCJzaG9wX2xvb3BfY29udGFpbmVyIiwic2VsZWN0b3IiLCJuZXdDb3VudCIsImh0bWwiLCJoYXMiLCJzY3JvbGxUbyIsInNjcm9sbF93aW5kb3ciLCJzY3JvbGxGb3IiLCJzY3JvbGxfd2luZG93X2ZvciIsImlzTW9iaWxlIiwiaXNfbW9iaWxlIiwicHJvY2VlZCIsImFkanVzdGluZ09mZnNldCIsIm9mZnNldCIsInNjcm9sbF90b190b3Bfb2Zmc2V0IiwiY29udGFpbmVyIiwibm90X2ZvdW5kX2NvbnRhaW5lciIsInNjcm9sbF93aW5kb3dfY3VzdG9tX2VsZW1lbnQiLCJ0b3AiLCJzdG9wIiwiYW5pbWF0ZSIsInNjcm9sbFRvcCIsInNjcm9sbF90b190b3Bfc3BlZWQiLCJzY3JvbGxfdG9fdG9wX2Vhc2luZyIsImJlZm9yZUZldGNoaW5nUHJvZHVjdHMiLCJ0cmlnZ2VyZWRCeSIsInNjcm9sbF93aW5kb3dfd2hlbiIsImRlc3Ryb3lUaXBweUluc3RhbmNlcyIsInVzZV90aXBweWpzIiwiZm9yRWFjaCIsImluc3RhbmNlIiwiZGVzdHJveSIsImJlZm9yZVVwZGF0aW5nUHJvZHVjdHMiLCJhZnRlclVwZGF0aW5nUHJvZHVjdHMiLCJpbml0IiwiY3VzdG9tX3NjcmlwdHMiLCJldmFsIiwiZmlsdGVyUHJvZHVjdHMiLCJhcmd1bWVudHMiLCJ1bmRlZmluZWQiLCJhamF4IiwibG9jYXRpb24iLCJocmVmIiwic3VjY2VzcyIsInJlc3BvbnNlIiwidXBkYXRlX2RvY3VtZW50X3RpdGxlIiwidGl0bGUiLCJmaWx0ZXIiLCJfbG9vcCIsIl9pbnN0YW5jZUlkcyIsIl9pIiwiaW5zdGFuY2VJZCIsIiRpbnN0YW5jZSIsIl9pbnN0YW5jZSIsInByZXNlcnZlX2hpZXJhcmNoeV9hY2NvcmRpb25fc3RhdGUiLCJ0b2dnbGVTZWxlY3RvciIsImNvbmNhdCIsInByZXNlcnZlX3NvZnRfbGltaXRfc3RhdGUiLCJfaHRtbCIsIiRzaG9wTG9vcENvbnRhaW5lciIsIiRub3RGb3VuZENvbnRhaW5lciIsImRpc2FibGVfYWpheCIsImhpc3RvcnkiLCJwdXNoU3RhdGUiLCJ3Y2FwZiIsImhhbmRsZU51bWJlcklucHV0RmlsdGVycyIsInJhbmdlTnVtYmVyU2VsZWN0b3JzIiwiJGl0ZW0iLCIkcmFuZ2VOdW1iZXIiLCJmb3JtYXROdW1iZXJzIiwicmFuZ2VNaW5WYWx1ZSIsInBhcnNlRmxvYXQiLCJyYW5nZU1heFZhbHVlIiwib2xkTWluVmFsdWUiLCJvbGRNYXhWYWx1ZSIsImRlY2ltYWxQbGFjZXMiLCJ0aG91c2FuZFNlcGFyYXRvciIsImRlY2ltYWxTZXBhcmF0b3IiLCJnZXRWYWx1ZSIsImZsb2F0VmFsdWUiLCJudW1iZXJGb3JtYXQiLCJtaW5WYWx1ZSIsIm1heFZhbHVlIiwiaXNOYU4iLCJoYW5kbGVMaXN0RmlsdGVycyIsIm5hdGl2ZUlucHV0cyIsInRvZ2dsZUNsYXNzIiwiY3VzdG9tUmFkaW9TZWxlY3RvciIsIm5vdCIsInByb3AiLCJoYW5kbGVEcm9wZG93bkZpbHRlcnMiLCIkc2VsZWN0IiwidmFsdWVzIiwiaGFuZGxlUGFnaW5hdGlvbiIsImVuYWJsZV9wYWdpbmF0aW9uX3ZpYV9hamF4IiwicGFnaW5hdGlvbl9jb250YWluZXIiLCJfc2VsZWN0b3JzIiwic3BsaXQiLCJzZWxlY3RvcnMiLCJqb2luIiwiaGFuZGxlRGVmYXVsdE9yZGVyYnkiLCJzb3J0aW5nX2NvbnRyb2wiLCJvcmRlciIsIlVSTCIsInNlYXJjaFBhcmFtcyIsInNldCIsImdldE9yZGVyQnlVcmwiLCJoYW5kbGVDbGVhckZpbHRlciIsImhhbmRsZUZpbHRlclRvb2x0aXAiLCJ0aXBweSIsInBsYWNlbWVudCIsImNvbnRlbnQiLCJyZWZlcmVuY2UiLCJnZXRBdHRyaWJ1dGUiLCJhbGxvd0hUTUwiLCJpbml0Q29tYm9ib3giLCJqUXVlcnkiLCJjaG9zZW5XQ0FQRiIsInRlbXBsYXRlUmVzdWx0IiwidGVtcGxhdGVTZWxlY3Rpb24iLCJjb3VudCIsImRlZmF1bHRzIiwiaW5oZXJpdF9zZWxlY3RfY2xhc3NlcyIsImluaGVyaXRfb3B0aW9uX2NsYXNzZXMiLCJub19yZXN1bHRzX3RleHQiLCJjb21ib2JveF9ub19yZXN1bHRzX3RleHQiLCJvcHRpb25zX25vbmVfdGV4dCIsImNvbWJvYm94X29wdGlvbnNfbm9uZV90ZXh0Iiwic2VhcmNoX2NvbnRhaW5zIiwic2VhcmNoX2luX3ZhbHVlcyIsImlzX3J0bCIsIiR0aGlzIiwib3B0aW9ucyIsIl9vYmplY3RTcHJlYWQiLCJjb21ib2JveF9kaXNwbGF5X3NlbGVjdGVkX29wdGlvbnMiLCJhdHRhY2hfY29tYm9ib3hfb25fc29ydGluZyIsImRpc2FibGVTZWFyY2giLCJzZWFyY2hfYm94X2luX2RlZmF1bHRfb3JkZXJieSIsImluaXRSYW5nZVNsaWRlciIsIm5vVWlTbGlkZXIiLCIkc2xpZGVyIiwic2xpZGVySWQiLCJkaXNwbGF5VmFsdWVzQXMiLCJzdGVwIiwiJG1pblZhbHVlIiwiJG1heFZhbHVlIiwic2xpZGVyIiwiZ2V0RWxlbWVudEJ5SWQiLCJzYWZlU3RlcCIsImNyZWF0ZSIsInN0YXJ0IiwiY29ubmVjdCIsImNzc1ByZWZpeCIsInJhbmdlIiwiZmlsdGVyUHJvZHVjdHNBY2NvcmRpbmdUb1NsaWRlciIsIl9taW5WYWx1ZSIsIl9tYXhWYWx1ZSIsImlzRHJhZ2dpbmciLCJnZXQiLCJjbGVhclRpbWVvdXQiLCJzZXRUaW1lb3V0IiwicmVtb3ZlRGF0YSIsImluaXRGaWx0ZXJPcHRpb25Ub29sdGlwIiwidG9vbHRpcFBvc2l0aW9ucyIsInRvb2x0aXBQb3NpdGlvbiIsImlkZW50aWZpZXIiLCJpbnN0YW5jZXMiLCJoYW5kbGVGb3JtU3VibWl0IiwiaW5pdFBvcFN0YXRlIiwicmVsb2FkX29uX2JhY2siLCJmb3VuZF93Y2FwZiIsInJlcGxhY2VTdGF0ZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJzdGF0ZSIsImhhc093blByb3BlcnR5IiwibnVtYmVyIiwiZGVjaW1hbHMiLCJkZWNfcG9pbnQiLCJ0aG91c2FuZHNfc2VwIiwibiIsImlzRmluaXRlIiwicHJlYyIsIk1hdGgiLCJhYnMiLCJzZXAiLCJkZWMiLCJzIiwidG9GaXhlZEZpeCIsImsiLCJwb3ciLCJyb3VuZCIsIkFycmF5IiwiY2xlYW5VcmwiLCJwYWdlZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLElBQU1BLFlBQVksR0FBR0EsWUFBWSxJQUFJO0VBQ3BDLFFBQVEsRUFBRSxFQUFFO0VBQ1osb0JBQW9CLEVBQUUsRUFBRTtFQUN4QixtQ0FBbUMsRUFBRSxFQUFFO0VBQ3ZDLDBCQUEwQixFQUFFLEVBQUU7RUFDOUIsNEJBQTRCLEVBQUUsRUFBRTtFQUNoQywrQkFBK0IsRUFBRSxFQUFFO0VBQ25DLG9DQUFvQyxFQUFFLEVBQUU7RUFDeEMsMkJBQTJCLEVBQUUsRUFBRTtFQUMvQix1Q0FBdUMsRUFBRSxFQUFFO0VBQzNDLGtDQUFrQyxFQUFFLEVBQUU7RUFDdEMsbUNBQW1DLEVBQUUsRUFBRTtFQUN2QywwQ0FBMEMsRUFBRSxFQUFFO0VBQzlDLHFDQUFxQyxFQUFFLEVBQUU7RUFDekMsc0NBQXNDLEVBQUUsRUFBRTtFQUMxQyxxQkFBcUIsRUFBRSxFQUFFO0VBQ3pCLHNCQUFzQixFQUFFLEVBQUU7RUFDMUIsV0FBVyxFQUFFLEVBQUU7RUFD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QztBQUN2QiIsImZpbGUiOiJ3Yy1hamF4LXByb2R1Y3QtZmlsdGVyLXNjcmlwdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFRoZSBtYWluIGpzIGZpbGUuXG4gKlxuICogQHNpbmNlICAgICAgMy4wLjBcbiAqIEBwYWNrYWdlICAgIHdjLWFqYXgtcHJvZHVjdC1maWx0ZXJcbiAqIEBzdWJwYWNrYWdlIHdjLWFqYXgtcHJvZHVjdC1maWx0ZXIvcHVibGljL2pzXG4gKiBAYXV0aG9yICAgICBNYWludWwgSGFzc2FuXG4gKi9cblxuY29uc3Qgd2NhcGZfcGFyYW1zID0gd2NhcGZfcGFyYW1zIHx8IHtcblx0J2lzX3J0bCc6ICcnLFxuXHQnZmlsdGVyX2lucHV0X2RlbGF5JzogJycsXG5cdCdjb21ib2JveF9kaXNwbGF5X3NlbGVjdGVkX29wdGlvbnMnOiAnJyxcblx0J2NvbWJvYm94X25vX3Jlc3VsdHNfdGV4dCc6ICcnLFxuXHQnY29tYm9ib3hfb3B0aW9uc19ub25lX3RleHQnOiAnJyxcblx0J3NlYXJjaF9ib3hfaW5fZGVmYXVsdF9vcmRlcmJ5JzogJycsXG5cdCdwcmVzZXJ2ZV9oaWVyYXJjaHlfYWNjb3JkaW9uX3N0YXRlJzogJycsXG5cdCdwcmVzZXJ2ZV9zb2Z0X2xpbWl0X3N0YXRlJzogJycsXG5cdCdlbmFibGVfYW5pbWF0aW9uX2Zvcl9maWx0ZXJfYWNjb3JkaW9uJzogJycsXG5cdCdmaWx0ZXJfYWNjb3JkaW9uX2FuaW1hdGlvbl9zcGVlZCc6ICcnLFxuXHQnZmlsdGVyX2FjY29yZGlvbl9hbmltYXRpb25fZWFzaW5nJzogJycsXG5cdCdlbmFibGVfYW5pbWF0aW9uX2Zvcl9oaWVyYXJjaHlfYWNjb3JkaW9uJzogJycsXG5cdCdoaWVyYXJjaHlfYWNjb3JkaW9uX2FuaW1hdGlvbl9zcGVlZCc6ICcnLFxuXHQnaGllcmFyY2h5X2FjY29yZGlvbl9hbmltYXRpb25fZWFzaW5nJzogJycsXG5cdCdzY3JvbGxfdG9fdG9wX3NwZWVkJzogJycsXG5cdCdzY3JvbGxfdG9fdG9wX2Vhc2luZyc6ICcnLFxuXHQnaXNfbW9iaWxlJzogJycsXG5cdCdyZWxvYWRfb25fYmFjayc6ICcnLFxuXHQnZm91bmRfd2NhcGYnOiAnJyxcblx0J3djYXBmX3Bybyc6ICcnLFxuXHQndXBkYXRlX2RvY3VtZW50X3RpdGxlJzogJycsXG5cdCd1c2VfdGlwcHlqcyc6ICcnLFxuXHQnc2hvcF9sb29wX2NvbnRhaW5lcic6ICcnLFxuXHQnbm90X2ZvdW5kX2NvbnRhaW5lcic6ICcnLFxuXHQncGFnaW5hdGlvbl9jb250YWluZXInOiAnJyxcblx0J29yZGVyYnlfZm9ybSc6ICcnLFxuXHQnb3JkZXJieV9lbGVtZW50JzogJycsXG5cdCdkaXNhYmxlX2FqYXgnOiAnJyxcblx0J2VuYWJsZV9wYWdpbmF0aW9uX3ZpYV9hamF4JzogJycsXG5cdCdzb3J0aW5nX2NvbnRyb2wnOiAnJyxcblx0J2F0dGFjaF9jb21ib2JveF9vbl9zb3J0aW5nJzogJycsXG5cdCdsb2FkaW5nX2FuaW1hdGlvbic6ICcnLFxuXHQnc2Nyb2xsX3dpbmRvdyc6ICcnLFxuXHQnc2Nyb2xsX3dpbmRvd19mb3InOiAnJyxcblx0J3Njcm9sbF93aW5kb3dfd2hlbic6ICcnLFxuXHQnc2Nyb2xsX3dpbmRvd19jdXN0b21fZWxlbWVudCc6ICcnLFxuXHQnc2Nyb2xsX29uJzogJycsXG5cdCdzY3JvbGxfdG9fdG9wX29mZnNldCc6ICcnLFxuXHQnZGlzYWJsZV9zY3JvbGxfYW5pbWF0aW9uJzogJycsXG5cdCdtb3JlX3NlbGVjdG9ycyc6ICcnLFxuXHQnY3VzdG9tX3NjcmlwdHMnOiAnJyxcbn07XG5cbiggZnVuY3Rpb24oICQsIHdpbmRvdyApIHtcblxuXHRjb25zdCBfZGVsYXkgPSBwYXJzZUludCggd2NhcGZfcGFyYW1zLmZpbHRlcl9pbnB1dF9kZWxheSApO1xuXHRjb25zdCBkZWxheSAgPSBfZGVsYXkgPj0gMCA/IF9kZWxheSA6IDEwMDA7XG5cblx0Y29uc3QgaXNQcm8gPSB3Y2FwZl9wYXJhbXMud2NhcGZfcHJvO1xuXG5cdGNvbnN0ICRib2R5ICAgICA9ICQoICdib2R5JyApO1xuXHRjb25zdCAkZG9jdW1lbnQgPSAkKCBkb2N1bWVudCApO1xuXG5cdGNvbnN0IGluc3RhbmNlSWRzID0gW107XG5cblx0Y29uc3QgZGVmYXVsdE9yZGVyQnlFbGVtZW50ID0gd2NhcGZfcGFyYW1zLm9yZGVyYnlfZm9ybSArICcgJyArIHdjYXBmX3BhcmFtcy5vcmRlcmJ5X2VsZW1lbnQ7XG5cblx0JCggJy53Y2FwZi1maWx0ZXInICkuZWFjaCggZnVuY3Rpb24oKSB7XG5cdFx0Y29uc3QgaWQgPSAkKCB0aGlzICkuZGF0YSggJ2lkJyApO1xuXG5cdFx0aWYgKCAhIGlkICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGluc3RhbmNlSWRzLnB1c2goIGlkICk7XG5cdH0gKTtcblxuXHR3aW5kb3cudGlwcHlJbnN0YW5jZXMgPSBbXTtcblxuXHR3aW5kb3cuV0NBUEYgPSB3aW5kb3cuV0NBUEYgfHwge307XG5cblx0d2luZG93LldDQVBGID0ge1xuXHRcdGhhbmRsZUZpbHRlckFjY29yZGlvbjogZnVuY3Rpb24oKSB7XG5cdFx0XHRjb25zdCB0b2dnbGVBY2NvcmRpb24gPSAoICRlbCApID0+IHtcblx0XHRcdFx0Ly8gQ2hlY2sgdG8gc2VlIGlmIHRoZSBhY2NvcmRpb24gaXMgb3BlbmVkXG5cdFx0XHRcdGNvbnN0IHByZXNzZWQgPSAkZWwuYXR0ciggJ2FyaWEtZXhwYW5kZWQnICkgPT09ICd0cnVlJztcblxuXHRcdFx0XHQvLyBDaGFuZ2UgYXJpYS1leHBhbmRlZCB0byB0aGUgb3Bwb3NpdGUgc3RhdGVcblx0XHRcdFx0JGVsLmF0dHIoICdhcmlhLWV4cGFuZGVkJywgISBwcmVzc2VkICk7XG5cblx0XHRcdFx0Y29uc3QgJGZpbHRlcklubmVyID0gJGVsLmNsb3Nlc3QoICcud2NhcGYtZmlsdGVyJyApLmNoaWxkcmVuKCAnLndjYXBmLWZpbHRlci1pbm5lcicgKTtcblxuXHRcdFx0XHRpZiAoIHdjYXBmX3BhcmFtcy5lbmFibGVfYW5pbWF0aW9uX2Zvcl9maWx0ZXJfYWNjb3JkaW9uICkge1xuXHRcdFx0XHRcdCRmaWx0ZXJJbm5lci5zbGlkZVRvZ2dsZShcblx0XHRcdFx0XHRcdHdjYXBmX3BhcmFtcy5maWx0ZXJfYWNjb3JkaW9uX2FuaW1hdGlvbl9zcGVlZCxcblx0XHRcdFx0XHRcdHdjYXBmX3BhcmFtcy5maWx0ZXJfYWNjb3JkaW9uX2FuaW1hdGlvbl9lYXNpbmdcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdCRmaWx0ZXJJbm5lci50b2dnbGUoKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblxuXHRcdFx0JGJvZHkub24oICdjbGljaycsICcud2NhcGYtZmlsdGVyLWFjY29yZGlvbi10cmlnZ2VyJywgZnVuY3Rpb24oIGUgKSB7XG5cdFx0XHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cblx0XHRcdFx0dG9nZ2xlQWNjb3JkaW9uKCAkKCB0aGlzICkgKTtcblx0XHRcdH0gKTtcblxuXHRcdFx0JGJvZHkub24oICdjbGljaycsICcud2NhcGYtZmlsdGVyLXRpdGxlLmhhcy1hY2NvcmRpb24nLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0Y29uc3QgJHRyaWdnZXIgPSAkKCB0aGlzICkuZmluZCggJy53Y2FwZi1maWx0ZXItYWNjb3JkaW9uLXRyaWdnZXInICk7XG5cblx0XHRcdFx0dG9nZ2xlQWNjb3JkaW9uKCAkdHJpZ2dlciApO1xuXHRcdFx0fSApO1xuXHRcdH0sXG5cdFx0aGFuZGxlSGllcmFyY2h5VG9nZ2xlOiBmdW5jdGlvbigpIHtcblx0XHRcdGNvbnN0IHRvZ2dsZUFjY29yZGlvbiA9ICggJGVsICkgPT4ge1xuXHRcdFx0XHQvLyBDaGVjayB0byBzZWUgaWYgdGhlIGJ1dHRvbiBpcyBwcmVzc2VkXG5cdFx0XHRcdGNvbnN0IHByZXNzZWQgPSAkZWwuYXR0ciggJ2FyaWEtcHJlc3NlZCcgKSA9PT0gJ3RydWUnO1xuXG5cdFx0XHRcdC8vIENoYW5nZSBhcmlhLXByZXNzZWQgdG8gdGhlIG9wcG9zaXRlIHN0YXRlXG5cdFx0XHRcdCRlbC5hdHRyKCAnYXJpYS1wcmVzc2VkJywgISBwcmVzc2VkICk7XG5cblx0XHRcdFx0Y29uc3QgJGNoaWxkID0gJGVsLmNsb3Nlc3QoICdsaScgKS5jaGlsZHJlbiggJ3VsJyApO1xuXG5cdFx0XHRcdGlmICggd2NhcGZfcGFyYW1zLmVuYWJsZV9hbmltYXRpb25fZm9yX2hpZXJhcmNoeV9hY2NvcmRpb24gKSB7XG5cdFx0XHRcdFx0JGNoaWxkLnNsaWRlVG9nZ2xlKFxuXHRcdFx0XHRcdFx0d2NhcGZfcGFyYW1zLmhpZXJhcmNoeV9hY2NvcmRpb25fYW5pbWF0aW9uX3NwZWVkLFxuXHRcdFx0XHRcdFx0d2NhcGZfcGFyYW1zLmhpZXJhcmNoeV9hY2NvcmRpb25fYW5pbWF0aW9uX2Vhc2luZ1xuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0JGNoaWxkLnRvZ2dsZSgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXG5cdFx0XHQkYm9keVxuXHRcdFx0XHQub24oICdjbGljaycsICcud2NhcGYtaGllcmFyY2h5LWFjY29yZGlvbi10b2dnbGUnLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHR0b2dnbGVBY2NvcmRpb24oICQoIHRoaXMgKSApO1xuXHRcdFx0XHR9IClcblx0XHRcdFx0Lm9uKCAna2V5ZG93bicsICcud2NhcGYtaGllcmFyY2h5LWFjY29yZGlvbi10b2dnbGUnLCBmdW5jdGlvbiggZSApIHtcblx0XHRcdFx0XHRpZiAoIGUua2V5ID09PSAnICcgfHwgZS5rZXkgPT09ICdFbnRlcicgfHwgZS5rZXkgPT09ICdTcGFjZWJhcicgKSB7XG5cdFx0XHRcdFx0XHQvLyBQcmV2ZW50IHRoZSBkZWZhdWx0IGFjdGlvbiB0byBzdG9wIHNjcm9sbGluZyB3aGVuIHNwYWNlIGlzIHByZXNzZWRcblx0XHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0XHRcdFx0dG9nZ2xlQWNjb3JkaW9uKCAkKCB0aGlzICkgKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gKTtcblx0XHR9LFxuXHRcdGhhbmRsZVNvZnRMaW1pdDogZnVuY3Rpb24oKSB7XG5cdFx0XHRjb25zdCB0b2dnbGVGaWx0ZXJPcHRpb25zID0gKCAkZWwgKSA9PiB7XG5cdFx0XHRcdC8vIENoZWNrIHRvIHNlZSBpZiB0aGUgYnV0dG9uIGlzIHByZXNzZWRcblx0XHRcdFx0Y29uc3QgcHJlc3NlZCA9ICRlbC5hdHRyKCAnYXJpYS1wcmVzc2VkJyApID09PSAndHJ1ZSc7XG5cblx0XHRcdFx0Ly8gQ2hhbmdlIGFyaWEtcHJlc3NlZCB0byB0aGUgb3Bwb3NpdGUgc3RhdGVcblx0XHRcdFx0JGVsLmF0dHIoICdhcmlhLXByZXNzZWQnLCAhIHByZXNzZWQgKTtcblxuXHRcdFx0XHRjb25zdCAkbGlzdFdyYXBwZXIgPSAkZWwuY2xvc2VzdCggJy53Y2FwZi1saXN0LXdyYXBwZXInICk7XG5cblx0XHRcdFx0aWYgKCBwcmVzc2VkICkge1xuXHRcdFx0XHRcdCRsaXN0V3JhcHBlci5yZW1vdmVDbGFzcyggJ3Nob3ctaGlkZGVuLW9wdGlvbnMnICk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0JGxpc3RXcmFwcGVyLmFkZENsYXNzKCAnc2hvdy1oaWRkZW4tb3B0aW9ucycgKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblxuXHRcdFx0JGJvZHlcblx0XHRcdFx0Lm9uKCAnY2xpY2snLCAnLndjYXBmLXNvZnQtbGltaXQtdHJpZ2dlcicsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdHRvZ2dsZUZpbHRlck9wdGlvbnMoICQoIHRoaXMgKSApO1xuXHRcdFx0XHR9IClcblx0XHRcdFx0Lm9uKCAna2V5ZG93bicsICcud2NhcGYtc29mdC1saW1pdC10cmlnZ2VyJywgZnVuY3Rpb24oIGUgKSB7XG5cdFx0XHRcdFx0aWYgKCBlLmtleSA9PT0gJyAnIHx8IGUua2V5ID09PSAnRW50ZXInIHx8IGUua2V5ID09PSAnU3BhY2ViYXInICkge1xuXHRcdFx0XHRcdFx0Ly8gUHJldmVudCB0aGUgZGVmYXVsdCBhY3Rpb24gdG8gc3RvcCBzY3JvbGxpbmcgd2hlbiBzcGFjZSBpcyBwcmVzc2VkXG5cdFx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRcdFx0XHRcdHRvZ2dsZUZpbHRlck9wdGlvbnMoICQoIHRoaXMgKSApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSApO1xuXHRcdH0sXG5cdFx0aGFuZGxlU2VhcmNoRmlsdGVyT3B0aW9uczogZnVuY3Rpb24oKSB7XG5cdFx0XHQkYm9keS5vbiggJ2lucHV0JywgJy53Y2FwZi1zZWFyY2gtYm94IGlucHV0W3R5cGU9XCJ0ZXh0XCJdJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGNvbnN0ICR0aGF0ICAgPSAkKCB0aGlzICk7XG5cdFx0XHRcdGNvbnN0ICRpbm5lciAgPSAkdGhhdC5jbG9zZXN0KCAnLndjYXBmLWZpbHRlci1pbm5lcicgKTtcblx0XHRcdFx0Y29uc3QgJGZpbHRlciA9ICRpbm5lci5jbG9zZXN0KCAnLndjYXBmLWZpbHRlcicgKTtcblxuXHRcdFx0XHRjb25zdCBzb2Z0TGltaXRFbmFibGVkID0gJGZpbHRlci5oYXNDbGFzcyggJ2hhcy1zb2Z0LWxpbWl0JyApO1xuXHRcdFx0XHRjb25zdCBzb2Z0TGltaXRUb2dnbGUgID0gJGZpbHRlci5maW5kKCAnLndjYXBmLXNvZnQtbGltaXQtd3JhcHBlcicgKTtcblx0XHRcdFx0Y29uc3Qgbm9SZXN1bHRzICAgICAgICA9ICRmaWx0ZXIuZmluZCggJy53Y2FwZi1uby1yZXN1bHRzLXRleHQnICk7XG5cdFx0XHRcdGNvbnN0IHZpc2libGVPcHRpb25zICAgPSBwYXJzZUludCggJGZpbHRlci5hdHRyKCAnZGF0YS12aXNpYmxlLW9wdGlvbnMnICkgKTtcblxuXHRcdFx0XHRjb25zdCBrZXl3b3JkID0gJHRoYXQudmFsKCk7XG5cblx0XHRcdFx0aWYgKCAhIGtleXdvcmQubGVuZ3RoICkge1xuXHRcdFx0XHRcdGxldCBpbmRleCA9IDA7XG5cdFx0XHRcdFx0JGZpbHRlci5yZW1vdmVDbGFzcyggJ3NlYXJjaC1hY3RpdmUnICk7XG5cblx0XHRcdFx0XHQkLmVhY2goICRpbm5lci5maW5kKCAnLndjYXBmLWZpbHRlci1vcHRpb25zID4gbGknICksIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0aW5kZXgrKztcblxuXHRcdFx0XHRcdFx0Y29uc3QgJGZpbHRlckl0ZW0gPSAkKCB0aGlzICk7XG5cdFx0XHRcdFx0XHQkZmlsdGVySXRlbS5yZW1vdmVDbGFzcyggJ2tleXdvcmQtbWF0Y2hlZCcgKTtcblxuXHRcdFx0XHRcdFx0aWYgKCBzb2Z0TGltaXRFbmFibGVkICkge1xuXHRcdFx0XHRcdFx0XHRpZiAoIGluZGV4ID4gdmlzaWJsZU9wdGlvbnMgKSB7XG5cdFx0XHRcdFx0XHRcdFx0JGZpbHRlckl0ZW0uYWRkQ2xhc3MoICd3Y2FwZi1maWx0ZXItb3B0aW9uLWhpZGRlbicgKTtcblx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHQkZmlsdGVySXRlbS5yZW1vdmVDbGFzcyggJ3djYXBmLWZpbHRlci1vcHRpb24taGlkZGVuJyApO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSApO1xuXG5cdFx0XHRcdFx0aWYgKCBzb2Z0TGltaXRFbmFibGVkICkge1xuXHRcdFx0XHRcdFx0c29mdExpbWl0VG9nZ2xlLnJlbW92ZUF0dHIoICdzdHlsZScgKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRub1Jlc3VsdHMuY2hpbGRyZW4oICdzcGFuJyApLnRleHQoICcnICk7XG5cdFx0XHRcdFx0bm9SZXN1bHRzLmhpZGUoKTtcblxuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGxldCBpbmRleCA9IDA7XG5cdFx0XHRcdCRmaWx0ZXIuYWRkQ2xhc3MoICdzZWFyY2gtYWN0aXZlJyApO1xuXG5cdFx0XHRcdCQuZWFjaCggJGlubmVyLmZpbmQoICcud2NhcGYtZmlsdGVyLW9wdGlvbnMgPiBsaScgKSwgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0Y29uc3QgJGZpbHRlckl0ZW0gPSAkKCB0aGlzICk7XG5cdFx0XHRcdFx0Y29uc3QgbGFiZWwgICAgICAgPSAkZmlsdGVySXRlbS5maW5kKCAnLndjYXBmLWZpbHRlci1pdGVtLWxhYmVsJyApLmRhdGEoICdsYWJlbCcgKTtcblxuXHRcdFx0XHRcdGlmICggbGFiZWwudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKCBrZXl3b3JkLnRvTG93ZXJDYXNlKCkgKSApIHtcblx0XHRcdFx0XHRcdGluZGV4Kys7XG5cblx0XHRcdFx0XHRcdCRmaWx0ZXJJdGVtLmFkZENsYXNzKCAna2V5d29yZC1tYXRjaGVkJyApO1xuXG5cdFx0XHRcdFx0XHRpZiAoIHNvZnRMaW1pdEVuYWJsZWQgKSB7XG5cdFx0XHRcdFx0XHRcdGlmICggaW5kZXggPiB2aXNpYmxlT3B0aW9ucyApIHtcblx0XHRcdFx0XHRcdFx0XHQkZmlsdGVySXRlbS5hZGRDbGFzcyggJ3djYXBmLWZpbHRlci1vcHRpb24taGlkZGVuJyApO1xuXHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdCRmaWx0ZXJJdGVtLnJlbW92ZUNsYXNzKCAnd2NhcGYtZmlsdGVyLW9wdGlvbi1oaWRkZW4nICk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0JGZpbHRlckl0ZW0ucmVtb3ZlQ2xhc3MoICdrZXl3b3JkLW1hdGNoZWQnICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9ICk7XG5cblx0XHRcdFx0aWYgKCBzb2Z0TGltaXRFbmFibGVkICkge1xuXHRcdFx0XHRcdGlmICggaW5kZXggPD0gdmlzaWJsZU9wdGlvbnMgKSB7XG5cdFx0XHRcdFx0XHRzb2Z0TGltaXRUb2dnbGUuaGlkZSgpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRzb2Z0TGltaXRUb2dnbGUuc2hvdygpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICggMCA9PT0gaW5kZXggKSB7XG5cdFx0XHRcdFx0bm9SZXN1bHRzLmNoaWxkcmVuKCAnc3BhbicgKS50ZXh0KCBrZXl3b3JkICk7XG5cdFx0XHRcdFx0bm9SZXN1bHRzLnNob3coKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRub1Jlc3VsdHMuY2hpbGRyZW4oICdzcGFuJyApLnRleHQoICcnICk7XG5cdFx0XHRcdFx0bm9SZXN1bHRzLmhpZGUoKTtcblx0XHRcdFx0fVxuXHRcdFx0fSApO1xuXG5cdFx0XHQkYm9keS5vbiggJ2NsaWNrJywgJy53Y2FwZi1zZWFyY2gtYm94IC53Y2FwZi1jbGVhci1zdGF0ZScsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRjb25zdCAkdGhhdCAgICAgID0gJCggdGhpcyApO1xuXHRcdFx0XHRjb25zdCAkc2VhcmNoQm94ID0gJHRoYXQuY2xvc2VzdCggJy53Y2FwZi1zZWFyY2gtYm94JyApO1xuXHRcdFx0XHRjb25zdCAkaW5wdXQgICAgID0gJHNlYXJjaEJveC5maW5kKCAnaW5wdXRbdHlwZT1cInRleHRcIl0nICk7XG5cdFx0XHRcdGNvbnN0ICRmaWx0ZXIgICAgPSAkc2VhcmNoQm94LmNsb3Nlc3QoICcud2NhcGYtZmlsdGVyJyApO1xuXG5cdFx0XHRcdCRpbnB1dC52YWwoICcnICk7XG5cdFx0XHRcdCRpbnB1dC50cmlnZ2VyKCAnaW5wdXQnICk7XG5cblx0XHRcdFx0aWYgKCAkZmlsdGVyLmhhc0NsYXNzKCAnd2NhcGYtZmlsdGVyLWtleXdvcmQnICkgKSB7XG5cdFx0XHRcdFx0JGlucHV0LnRyaWdnZXIoICdjaGFuZ2UnICk7XG5cdFx0XHRcdH1cblx0XHRcdH0gKTtcblxuXHRcdFx0JGJvZHkub24oICdjaGFuZ2UnLCAnLndjYXBmLWZpbHRlci1rZXl3b3JkIGlucHV0W3R5cGU9XCJ0ZXh0XCJdJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGNvbnN0ICR0aGF0ICAgID0gJCggdGhpcyApO1xuXHRcdFx0XHRjb25zdCAkd3JhcHBlciA9ICR0aGF0LmNsb3Nlc3QoICcud2NhcGYta2V5d29yZC1maWx0ZXItd3JhcHBlcicgKTtcblx0XHRcdFx0Y29uc3Qga2V5d29yZCAgPSAkdGhhdC52YWwoKTtcblxuXHRcdFx0XHRjb25zdCBmaWx0ZXJVUkwgICAgICA9ICR3cmFwcGVyLmRhdGEoICdmaWx0ZXItdXJsJyApO1xuXHRcdFx0XHRjb25zdCBjbGVhckZpbHRlclVSTCA9ICR3cmFwcGVyLmRhdGEoICdjbGVhci1maWx0ZXItdXJsJyApO1xuXG5cdFx0XHRcdGNvbnN0IHVybCA9IGtleXdvcmQubGVuZ3RoID8gZmlsdGVyVVJMLnJlcGxhY2UoICclcycsIGtleXdvcmQgKSA6IGNsZWFyRmlsdGVyVVJMO1xuXG5cdFx0XHRcdFdDQVBGLnJlcXVlc3RGaWx0ZXIoIHVybCApO1xuXHRcdFx0fSApO1xuXG5cdFx0XHQkYm9keS5vbiggJ2tleWRvd24nLCAnLndjYXBmLWZpbHRlci1rZXl3b3JkIGlucHV0W3R5cGU9XCJ0ZXh0XCJdJywgZnVuY3Rpb24oIGUgKSB7XG5cdFx0XHRcdGlmICggJ0VudGVyJyA9PT0gZS5rZXkgKSB7XG5cdFx0XHRcdFx0JCggdGhpcyApLnRyaWdnZXIoICdjaGFuZ2UnICk7XG5cdFx0XHRcdH1cblx0XHRcdH0gKTtcblx0XHR9LFxuXHRcdHVwZGF0ZVByb2R1Y3RzQ291bnRSZXN1bHQ6IGZ1bmN0aW9uKCAkcmVzcG9uc2UgKSB7XG5cdFx0XHRjb25zdCAkY29udGFpbmVyID0gJCggd2NhcGZfcGFyYW1zLnNob3BfbG9vcF9jb250YWluZXIgKTtcblx0XHRcdGNvbnN0IHNlbGVjdG9yICAgPSAnLndvb2NvbW1lcmNlLXJlc3VsdC1jb3VudCc7XG5cdFx0XHRjb25zdCBuZXdDb3VudCAgID0gJHJlc3BvbnNlLmZpbmQoIHNlbGVjdG9yICkuaHRtbCgpO1xuXG5cdFx0XHQkYm9keS5maW5kKCBzZWxlY3RvciApLmVhY2goIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRjb25zdCAkZWwgPSAkKCB0aGlzICk7XG5cblx0XHRcdFx0aWYgKCAhICRjb250YWluZXIuaGFzKCAkZWwgKS5sZW5ndGggKSB7XG5cdFx0XHRcdFx0JGVsLmh0bWwoIG5ld0NvdW50ICk7XG5cdFx0XHRcdH1cblx0XHRcdH0gKTtcblx0XHR9LFxuXHRcdHNjcm9sbFRvOiBmdW5jdGlvbigpIHtcblx0XHRcdGlmICggJ25vbmUnID09PSB3Y2FwZl9wYXJhbXMuc2Nyb2xsX3dpbmRvdyApIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCBzY3JvbGxGb3IgPSB3Y2FwZl9wYXJhbXMuc2Nyb2xsX3dpbmRvd19mb3I7XG5cdFx0XHRjb25zdCBpc01vYmlsZSAgPSB3Y2FwZl9wYXJhbXMuaXNfbW9iaWxlO1xuXHRcdFx0bGV0IHByb2NlZWQgICAgID0gZmFsc2U7XG5cblx0XHRcdGlmICggJ21vYmlsZScgPT09IHNjcm9sbEZvciAmJiBpc01vYmlsZSApIHtcblx0XHRcdFx0cHJvY2VlZCA9IHRydWU7XG5cdFx0XHR9IGVsc2UgaWYgKCAnZGVza3RvcCcgPT09IHNjcm9sbEZvciAmJiAhIGlzTW9iaWxlICkge1xuXHRcdFx0XHRwcm9jZWVkID0gdHJ1ZTtcblx0XHRcdH0gZWxzZSBpZiAoICdib3RoJyA9PT0gc2Nyb2xsRm9yICkge1xuXHRcdFx0XHRwcm9jZWVkID0gdHJ1ZTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCAhIHByb2NlZWQgKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0bGV0IGFkanVzdGluZ09mZnNldCA9IDAsIG9mZnNldCA9IDA7XG5cblx0XHRcdGlmICggd2NhcGZfcGFyYW1zLnNjcm9sbF90b190b3Bfb2Zmc2V0ICkge1xuXHRcdFx0XHRhZGp1c3RpbmdPZmZzZXQgPSBwYXJzZUludCggd2NhcGZfcGFyYW1zLnNjcm9sbF90b190b3Bfb2Zmc2V0ICk7XG5cdFx0XHR9XG5cblx0XHRcdGxldCBjb250YWluZXI7XG5cblx0XHRcdGlmICggJCggd2NhcGZfcGFyYW1zLnNob3BfbG9vcF9jb250YWluZXIgKS5sZW5ndGggKSB7XG5cdFx0XHRcdGNvbnRhaW5lciA9IHdjYXBmX3BhcmFtcy5zaG9wX2xvb3BfY29udGFpbmVyO1xuXHRcdFx0fSBlbHNlIGlmICggJCggd2NhcGZfcGFyYW1zLm5vdF9mb3VuZF9jb250YWluZXIgKS5sZW5ndGggKSB7XG5cdFx0XHRcdGNvbnRhaW5lciA9IHdjYXBmX3BhcmFtcy5ub3RfZm91bmRfY29udGFpbmVyO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoICdjdXN0b20nID09PSB3Y2FwZl9wYXJhbXMuc2Nyb2xsX3dpbmRvdyApIHtcblx0XHRcdFx0Y29udGFpbmVyID0gd2NhcGZfcGFyYW1zLnNjcm9sbF93aW5kb3dfY3VzdG9tX2VsZW1lbnQ7XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0ICRjb250YWluZXIgPSAkKCBjb250YWluZXIgKTtcblxuXHRcdFx0aWYgKCAkY29udGFpbmVyLmxlbmd0aCApIHtcblx0XHRcdFx0b2Zmc2V0ID0gJGNvbnRhaW5lci5vZmZzZXQoKS50b3AgLSBhZGp1c3RpbmdPZmZzZXQ7XG5cblx0XHRcdFx0aWYgKCBvZmZzZXQgPCAwICkge1xuXHRcdFx0XHRcdG9mZnNldCA9IDA7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQkKCAnaHRtbCwgYm9keScgKS5zdG9wKCkuYW5pbWF0ZShcblx0XHRcdFx0XHR7IHNjcm9sbFRvcDogb2Zmc2V0IH0sXG5cdFx0XHRcdFx0d2NhcGZfcGFyYW1zLnNjcm9sbF90b190b3Bfc3BlZWQsXG5cdFx0XHRcdFx0d2NhcGZfcGFyYW1zLnNjcm9sbF90b190b3BfZWFzaW5nXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0fSxcblx0XHQvLyBUaGluZ3MgYXJlIGRvbmUgYmVmb3JlIGZldGNoaW5nIHRoZSBwcm9kdWN0cyBsaWtlIHNob3dpbmcgdGhlIGxvYWRpbmcgaW5kaWNhdG9yLlxuXHRcdGJlZm9yZUZldGNoaW5nUHJvZHVjdHM6IGZ1bmN0aW9uKCB0cmlnZ2VyZWRCeSApIHtcblx0XHRcdCRib2R5LmZpbmQoICcud2NhcGYtbG9hZGVyJyApLmFkZENsYXNzKCAnaXMtYWN0aXZlJyApO1xuXG5cdFx0XHRpZiAoICEgaXNQcm8gJiYgJ2ltbWVkaWF0ZWx5JyA9PT0gd2NhcGZfcGFyYW1zLnNjcm9sbF93aW5kb3dfd2hlbiApIHtcblx0XHRcdFx0V0NBUEYuc2Nyb2xsVG8oKTtcblx0XHRcdH1cblxuXHRcdFx0JGRvY3VtZW50LnRyaWdnZXIoICd3Y2FwZl9iZWZvcmVfZmV0Y2hpbmdfcHJvZHVjdHMnLCBbIHRyaWdnZXJlZEJ5IF0gKTtcblx0XHR9LFxuXHRcdGRlc3Ryb3lUaXBweUluc3RhbmNlczogZnVuY3Rpb24oKSB7XG5cdFx0XHRpZiAoIHdjYXBmX3BhcmFtcy51c2VfdGlwcHlqcyApIHtcblx0XHRcdFx0Ly8gQHNvdXJjZSBodHRwczovL2dpdGh1Yi5jb20vYXRvbWlrcy90aXBweWpzL2lzc3Vlcy80NzNcblx0XHRcdFx0dGlwcHlJbnN0YW5jZXMuZm9yRWFjaCggaW5zdGFuY2UgPT4ge1xuXHRcdFx0XHRcdGluc3RhbmNlLmRlc3Ryb3koKTtcblx0XHRcdFx0fSApO1xuXHRcdFx0XHR0aXBweUluc3RhbmNlcy5sZW5ndGggPSAwOyAvLyBjbGVhciBpdFxuXHRcdFx0fVxuXHRcdH0sXG5cdFx0Ly8gVGhpbmdzIGFyZSBkb25lIGJlZm9yZSB1cGRhdGluZyB0aGUgcHJvZHVjdHMgbGlrZSBoaWRpbmcgdGhlIGxvYWRpbmcgaW5kaWNhdG9yLlxuXHRcdGJlZm9yZVVwZGF0aW5nUHJvZHVjdHM6IGZ1bmN0aW9uKCAkcmVzcG9uc2UsIHRyaWdnZXJlZEJ5ICkge1xuXHRcdFx0JGJvZHkuZmluZCggJy53Y2FwZi1sb2FkZXInICkucmVtb3ZlQ2xhc3MoICdpcy1hY3RpdmUnICk7XG5cblx0XHRcdC8vIE1heWJlIGdvb2QgZm9yIHBlcmZvcm1hbmNlLlxuXHRcdFx0V0NBUEYuZGVzdHJveVRpcHB5SW5zdGFuY2VzKCk7XG5cblx0XHRcdCRkb2N1bWVudC50cmlnZ2VyKCAnd2NhcGZfYmVmb3JlX3VwZGF0aW5nX3Byb2R1Y3RzJywgWyAkcmVzcG9uc2UsIHRyaWdnZXJlZEJ5IF0gKTtcblx0XHR9LFxuXHRcdGFmdGVyVXBkYXRpbmdQcm9kdWN0czogZnVuY3Rpb24oICRyZXNwb25zZSwgdHJpZ2dlcmVkQnkgKSB7XG5cdFx0XHRXQ0FQRi51cGRhdGVQcm9kdWN0c0NvdW50UmVzdWx0KCAkcmVzcG9uc2UgKTtcblxuXHRcdFx0Ly8gUmVpbml0aWFsaXplIHdjYXBmLlxuXHRcdFx0V0NBUEYuaW5pdCgpO1xuXG5cdFx0XHRpZiAoICEgaXNQcm8gJiYgJ2FmdGVyJyA9PT0gd2NhcGZfcGFyYW1zLnNjcm9sbF93aW5kb3dfd2hlbiApIHtcblx0XHRcdFx0V0NBUEYuc2Nyb2xsVG8oKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gVHJpZ2dlciBldmVudHMuXG5cdFx0XHQkKCBkb2N1bWVudCApLnRyaWdnZXIoICdyZWFkeScgKTtcblx0XHRcdCQoIHdpbmRvdyApLnRyaWdnZXIoICdzY3JvbGwnICk7XG5cdFx0XHQkKCB3aW5kb3cgKS50cmlnZ2VyKCAncmVzaXplJyApO1xuXG5cdFx0XHQvLyBBMyBMYXp5IExvYWQgc3VwcG9ydC5cblx0XHRcdCQoIHdpbmRvdyApLnRyaWdnZXIoICdsYXp5c2hvdycgKTtcblxuXHRcdFx0aWYgKCB3Y2FwZl9wYXJhbXMuY3VzdG9tX3NjcmlwdHMgKSB7XG5cdFx0XHRcdGV2YWwoIHdjYXBmX3BhcmFtcy5jdXN0b21fc2NyaXB0cyApO1xuXHRcdFx0fVxuXG5cdFx0XHQkZG9jdW1lbnQudHJpZ2dlciggJ3djYXBmX2FmdGVyX3VwZGF0aW5nX3Byb2R1Y3RzJywgWyAkcmVzcG9uc2UsIHRyaWdnZXJlZEJ5IF0gKTtcblx0XHR9LFxuXHRcdGZpbHRlclByb2R1Y3RzOiBmdW5jdGlvbiggdHJpZ2dlcmVkQnkgPSAnZmlsdGVyJyApIHtcblx0XHRcdFdDQVBGLmJlZm9yZUZldGNoaW5nUHJvZHVjdHMoIHRyaWdnZXJlZEJ5ICk7XG5cblx0XHRcdCQuYWpheCgge1xuXHRcdFx0XHR1cmw6IHdpbmRvdy5sb2NhdGlvbi5ocmVmLFxuXHRcdFx0XHRzdWNjZXNzOiBmdW5jdGlvbiggcmVzcG9uc2UgKSB7XG5cdFx0XHRcdFx0Y29uc3QgJHJlc3BvbnNlID0gJCggcmVzcG9uc2UgKTtcblxuXHRcdFx0XHRcdFdDQVBGLmJlZm9yZVVwZGF0aW5nUHJvZHVjdHMoICRyZXNwb25zZSwgdHJpZ2dlcmVkQnkgKTtcblxuXHRcdFx0XHRcdC8qKlxuXHRcdFx0XHRcdCAqIFVwZGF0ZSBkb2N1bWVudCB0aXRsZS5cblx0XHRcdFx0XHQgKlxuXHRcdFx0XHRcdCAqIEBzb3VyY2UgaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzc1OTk1NjJcblx0XHRcdFx0XHQgKi9cblx0XHRcdFx0XHRpZiAoIHdjYXBmX3BhcmFtcy51cGRhdGVfZG9jdW1lbnRfdGl0bGUgKSB7XG5cdFx0XHRcdFx0XHRkb2N1bWVudC50aXRsZSA9ICRyZXNwb25zZS5maWx0ZXIoICd0aXRsZScgKS50ZXh0KCk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly8gVXBkYXRlIHRoZSBpbnN0YW5jZXMuXG5cdFx0XHRcdFx0Zm9yICggY29uc3QgaWQgb2YgaW5zdGFuY2VJZHMgKSB7XG5cdFx0XHRcdFx0XHRjb25zdCBpbnN0YW5jZUlkID0gJ1tkYXRhLWlkPVwiJyArIGlkICsgJ1wiXSc7XG5cdFx0XHRcdFx0XHRjb25zdCAkaW5zdGFuY2UgID0gJCggaW5zdGFuY2VJZCApO1xuXHRcdFx0XHRcdFx0Y29uc3QgJGlubmVyICAgICA9ICRpbnN0YW5jZS5maW5kKCAnLndjYXBmLWZpbHRlci1pbm5lcicgKTtcblx0XHRcdFx0XHRcdGNvbnN0IF9pbnN0YW5jZSAgPSAkcmVzcG9uc2UuZmluZCggaW5zdGFuY2VJZCApO1xuXG5cdFx0XHRcdFx0XHQvLyBQcmVzZXJ2ZSBoaWVyYXJjaHkgYWNjb3JkaW9uIHN0YXRlLlxuXHRcdFx0XHRcdFx0aWYgKCB3Y2FwZl9wYXJhbXMucHJlc2VydmVfaGllcmFyY2h5X2FjY29yZGlvbl9zdGF0ZSApIHtcblx0XHRcdFx0XHRcdFx0aWYgKCAkaW5zdGFuY2UuaGFzQ2xhc3MoICdoYXMtaGllcmFyY2h5LWFjY29yZGlvbicgKSApIHtcblx0XHRcdFx0XHRcdFx0XHQkaW5zdGFuY2UuZmluZCggJy53Y2FwZi1oaWVyYXJjaHktYWNjb3JkaW9uLXRvZ2dsZScgKS5lYWNoKCBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0ICRlbCA9ICQoIHRoaXMgKTtcblx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IGlkICA9ICRlbC5kYXRhKCAnaWQnICk7XG5cblx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IHRvZ2dsZVNlbGVjdG9yID0gYC53Y2FwZi1oaWVyYXJjaHktYWNjb3JkaW9uLXRvZ2dsZVtkYXRhLWlkPVwiJHsgaWQgfVwiXWA7XG5cblx0XHRcdFx0XHRcdFx0XHRcdC8vIENoZWNrIHRvIHNlZSBpZiB0aGUgYWNjb3JkaW9uIGlzIG9wZW5lZFxuXHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgcHJlc3NlZCA9ICRlbC5hdHRyKCAnYXJpYS1wcmVzc2VkJyApID09PSAndHJ1ZSc7XG5cblx0XHRcdFx0XHRcdFx0XHRcdGlmICggcHJlc3NlZCApIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0X2luc3RhbmNlLmZpbmQoIHRvZ2dsZVNlbGVjdG9yICkuYXR0ciggJ2FyaWEtcHJlc3NlZCcsICd0cnVlJyApO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRfaW5zdGFuY2UuZmluZCggdG9nZ2xlU2VsZWN0b3IgKS5jbG9zZXN0KCAnbGknICkuY2hpbGRyZW4oICd1bCcgKS5zaG93KCk7XG5cdFx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRfaW5zdGFuY2UuZmluZCggdG9nZ2xlU2VsZWN0b3IgKS5hdHRyKCAnYXJpYS1wcmVzc2VkJywgJ2ZhbHNlJyApO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRfaW5zdGFuY2UuZmluZCggdG9nZ2xlU2VsZWN0b3IgKS5jbG9zZXN0KCAnbGknICkuY2hpbGRyZW4oICd1bCcgKS5oaWRlKCk7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0fSApO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdC8vIFByZXNlcnZlIHNvZnQgbGltaXQgc3RhdGUuXG5cdFx0XHRcdFx0XHRpZiAoIHdjYXBmX3BhcmFtcy5wcmVzZXJ2ZV9zb2Z0X2xpbWl0X3N0YXRlICkge1xuXHRcdFx0XHRcdFx0XHRpZiAoICRpbnN0YW5jZS5oYXNDbGFzcyggJ2hhcy1zb2Z0LWxpbWl0JyApICkge1xuXHRcdFx0XHRcdFx0XHRcdGNvbnN0ICRsaXN0V3JhcHBlciA9ICRpbnN0YW5jZS5maW5kKCAnLndjYXBmLWxpc3Qtd3JhcHBlcicgKTtcblxuXHRcdFx0XHRcdFx0XHRcdGlmICggJGxpc3RXcmFwcGVyLmhhc0NsYXNzKCAnc2hvdy1oaWRkZW4tb3B0aW9ucycgKSApIHtcblx0XHRcdFx0XHRcdFx0XHRcdF9pbnN0YW5jZS5maW5kKCAnLndjYXBmLWxpc3Qtd3JhcHBlcicgKS5hZGRDbGFzcyggJ3Nob3ctaGlkZGVuLW9wdGlvbnMnICk7XG5cdFx0XHRcdFx0XHRcdFx0XHRfaW5zdGFuY2UuZmluZCggJy53Y2FwZi1zb2Z0LWxpbWl0LXRyaWdnZXInICkuYXR0ciggJ2FyaWEtcHJlc3NlZCcsICd0cnVlJyApO1xuXHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRfaW5zdGFuY2UuZmluZCggJy53Y2FwZi1saXN0LXdyYXBwZXInICkucmVtb3ZlQ2xhc3MoICdzaG93LWhpZGRlbi1vcHRpb25zJyApO1xuXHRcdFx0XHRcdFx0XHRcdFx0X2luc3RhbmNlLmZpbmQoICcud2NhcGYtc29mdC1saW1pdC10cmlnZ2VyJyApLmF0dHIoICdhcmlhLXByZXNzZWQnLCAnZmFsc2UnICk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdGNvbnN0IF9odG1sID0gX2luc3RhbmNlLmZpbmQoICcud2NhcGYtZmlsdGVyLWlubmVyJyApLmh0bWwoKTtcblxuXHRcdFx0XHRcdFx0Ly8gRmluYWxseSB1cGRhdGUgdGhlIGluc3RhbmNlLlxuXHRcdFx0XHRcdFx0JGlubmVyLmh0bWwoIF9odG1sICk7XG5cblx0XHRcdFx0XHRcdC8vIFJlbW92ZSBzZWFyY2gtYWN0aXZlIGZyb20gYW55IHNlYXJjaCBib3ggd2hvc2UgaW5wdXQgaXMgbm93IGVtcHR5LlxuXHRcdFx0XHRcdFx0JGluc3RhbmNlLmZpbmQoICcud2NhcGYtc2VhcmNoLWJveC53aXRoLWNyb3NzIGlucHV0W3R5cGU9XCJ0ZXh0XCJdJyApLmVhY2goIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0XHRpZiAoICEgJCggdGhpcyApLnZhbCgpICkge1xuXHRcdFx0XHRcdFx0XHRcdCQoIHRoaXMgKS5jbG9zZXN0KCAnLndjYXBmLWZpbHRlcicgKS5yZW1vdmVDbGFzcyggJ3NlYXJjaC1hY3RpdmUnICk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0gKTtcblxuXHRcdFx0XHRcdFx0JGluc3RhbmNlLnRyaWdnZXIoICd3Y2FwZi1maWx0ZXItdXBkYXRlZCcsIFsgX2luc3RhbmNlIF0gKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBVcGRhdGUgdGhlIGFjdGl2ZSBmaWx0ZXJzIGFuZCByZXNldCBmaWx0ZXJzLlxuXHRcdFx0XHRcdCRib2R5LmZpbmQoICcud2NhcGYtYWN0aXZlLWZpbHRlcnMsIC53Y2FwZi1yZXNldC1maWx0ZXJzJyApLmVhY2goIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0Y29uc3QgJHRoYXQgICAgICA9ICQoIHRoaXMgKTtcblx0XHRcdFx0XHRcdGNvbnN0IGluc3RhbmNlSWQgPSAnW2RhdGEtaWQ9XCInICsgJHRoYXQuZGF0YSggJ2lkJyApICsgJ1wiXSc7XG5cblx0XHRcdFx0XHRcdCR0aGF0Lmh0bWwoICRyZXNwb25zZS5maW5kKCBpbnN0YW5jZUlkICkuaHRtbCgpICk7XG5cdFx0XHRcdFx0fSApO1xuXG5cdFx0XHRcdFx0Ly8gUmVwbGFjZSBvbGQgc2hvcCBsb29wIHdpdGggbmV3IG9uZS5cblx0XHRcdFx0XHRjb25zdCAkc2hvcExvb3BDb250YWluZXIgPSAkcmVzcG9uc2UuZmluZCggd2NhcGZfcGFyYW1zLnNob3BfbG9vcF9jb250YWluZXIgKTtcblx0XHRcdFx0XHRjb25zdCAkbm90Rm91bmRDb250YWluZXIgPSAkcmVzcG9uc2UuZmluZCggd2NhcGZfcGFyYW1zLm5vdF9mb3VuZF9jb250YWluZXIgKTtcblxuXHRcdFx0XHRcdGlmICggd2NhcGZfcGFyYW1zLnNob3BfbG9vcF9jb250YWluZXIgPT09IHdjYXBmX3BhcmFtcy5ub3RfZm91bmRfY29udGFpbmVyICkge1xuXHRcdFx0XHRcdFx0JCggd2NhcGZfcGFyYW1zLnNob3BfbG9vcF9jb250YWluZXIgKS5odG1sKCAkc2hvcExvb3BDb250YWluZXIuaHRtbCgpICk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGlmICggJCggd2NhcGZfcGFyYW1zLm5vdF9mb3VuZF9jb250YWluZXIgKS5sZW5ndGggKSB7XG5cdFx0XHRcdFx0XHRcdGlmICggJHNob3BMb29wQ29udGFpbmVyLmxlbmd0aCApIHtcblx0XHRcdFx0XHRcdFx0XHQkKCB3Y2FwZl9wYXJhbXMubm90X2ZvdW5kX2NvbnRhaW5lciApLmh0bWwoICRzaG9wTG9vcENvbnRhaW5lci5odG1sKCkgKTtcblx0XHRcdFx0XHRcdFx0fSBlbHNlIGlmICggJG5vdEZvdW5kQ29udGFpbmVyLmxlbmd0aCApIHtcblx0XHRcdFx0XHRcdFx0XHQkKCB3Y2FwZl9wYXJhbXMubm90X2ZvdW5kX2NvbnRhaW5lciApLmh0bWwoICRub3RGb3VuZENvbnRhaW5lci5odG1sKCkgKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSBlbHNlIGlmICggJCggd2NhcGZfcGFyYW1zLnNob3BfbG9vcF9jb250YWluZXIgKS5sZW5ndGggKSB7XG5cdFx0XHRcdFx0XHRcdGlmICggJHNob3BMb29wQ29udGFpbmVyLmxlbmd0aCApIHtcblx0XHRcdFx0XHRcdFx0XHQkKCB3Y2FwZl9wYXJhbXMuc2hvcF9sb29wX2NvbnRhaW5lciApLmh0bWwoICRzaG9wTG9vcENvbnRhaW5lci5odG1sKCkgKTtcblx0XHRcdFx0XHRcdFx0fSBlbHNlIGlmICggJG5vdEZvdW5kQ29udGFpbmVyLmxlbmd0aCApIHtcblx0XHRcdFx0XHRcdFx0XHQkKCB3Y2FwZl9wYXJhbXMuc2hvcF9sb29wX2NvbnRhaW5lciApLmh0bWwoICRub3RGb3VuZENvbnRhaW5lci5odG1sKCkgKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFdDQVBGLmFmdGVyVXBkYXRpbmdQcm9kdWN0cyggJHJlc3BvbnNlLCB0cmlnZ2VyZWRCeSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9ICk7XG5cdFx0fSxcblx0XHRyZXF1ZXN0RmlsdGVyOiBmdW5jdGlvbiggdXJsLCB0cmlnZ2VyZWRCeSA9ICdmaWx0ZXInICkge1xuXHRcdFx0aWYgKCAhIHVybCApIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIHdjYXBmX3BhcmFtcy5kaXNhYmxlX2FqYXggKSB7XG5cdFx0XHRcdHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gdXJsO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aGlzdG9yeS5wdXNoU3RhdGUoIHsgd2NhcGY6IHRydWUgfSwgJycsIHVybCApO1xuXG5cdFx0XHRcdFdDQVBGLmZpbHRlclByb2R1Y3RzKCB0cmlnZ2VyZWRCeSApO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0aGFuZGxlTnVtYmVySW5wdXRGaWx0ZXJzOiBmdW5jdGlvbigpIHtcblx0XHRcdGNvbnN0IHJhbmdlTnVtYmVyU2VsZWN0b3JzID0gJy53Y2FwZi1yYW5nZS1udW1iZXIgLm1pbi12YWx1ZSwgLndjYXBmLXJhbmdlLW51bWJlciAubWF4LXZhbHVlJztcblxuXHRcdFx0JGJvZHkub24oICdjaGFuZ2UnLCByYW5nZU51bWJlclNlbGVjdG9ycywgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGNvbnN0ICRpdGVtID0gJCggdGhpcyApO1xuXG5cdFx0XHRcdGNvbnN0ICRyYW5nZU51bWJlciAgICAgID0gJGl0ZW0uY2xvc2VzdCggJy53Y2FwZi1yYW5nZS1udW1iZXInICk7XG5cdFx0XHRcdGNvbnN0IGZvcm1hdE51bWJlcnMgICAgID0gJHJhbmdlTnVtYmVyLmF0dHIoICdkYXRhLWZvcm1hdC1udW1iZXJzJyApO1xuXHRcdFx0XHRjb25zdCByYW5nZU1pblZhbHVlICAgICA9IHBhcnNlRmxvYXQoICRyYW5nZU51bWJlci5hdHRyKCAnZGF0YS1yYW5nZS1taW4tdmFsdWUnICkgKTtcblx0XHRcdFx0Y29uc3QgcmFuZ2VNYXhWYWx1ZSAgICAgPSBwYXJzZUZsb2F0KCAkcmFuZ2VOdW1iZXIuYXR0ciggJ2RhdGEtcmFuZ2UtbWF4LXZhbHVlJyApICk7XG5cdFx0XHRcdGNvbnN0IG9sZE1pblZhbHVlICAgICAgID0gcGFyc2VGbG9hdCggJHJhbmdlTnVtYmVyLmF0dHIoICdkYXRhLW1pbi12YWx1ZScgKSApO1xuXHRcdFx0XHRjb25zdCBvbGRNYXhWYWx1ZSAgICAgICA9IHBhcnNlRmxvYXQoICRyYW5nZU51bWJlci5hdHRyKCAnZGF0YS1tYXgtdmFsdWUnICkgKTtcblx0XHRcdFx0Y29uc3QgZGVjaW1hbFBsYWNlcyAgICAgPSAkcmFuZ2VOdW1iZXIuYXR0ciggJ2RhdGEtZGVjaW1hbC1wbGFjZXMnICk7XG5cdFx0XHRcdGNvbnN0IHRob3VzYW5kU2VwYXJhdG9yID0gJHJhbmdlTnVtYmVyLmF0dHIoICdkYXRhLXRob3VzYW5kLXNlcGFyYXRvcicgKTtcblx0XHRcdFx0Y29uc3QgZGVjaW1hbFNlcGFyYXRvciAgPSAkcmFuZ2VOdW1iZXIuYXR0ciggJ2RhdGEtZGVjaW1hbC1zZXBhcmF0b3InICk7XG5cblx0XHRcdFx0Y29uc3QgZ2V0VmFsdWUgPSAoIGZsb2F0VmFsdWUgKSA9PiB7XG5cdFx0XHRcdFx0aWYgKCBmb3JtYXROdW1iZXJzICkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIG51bWJlckZvcm1hdCggZmxvYXRWYWx1ZSwgZGVjaW1hbFBsYWNlcywgZGVjaW1hbFNlcGFyYXRvciwgdGhvdXNhbmRTZXBhcmF0b3IgKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRyZXR1cm4gZmxvYXRWYWx1ZTtcblx0XHRcdFx0fTtcblxuXHRcdFx0XHRsZXQgbWluVmFsdWUgPSBwYXJzZUZsb2F0KCAkcmFuZ2VOdW1iZXIuZmluZCggJy5taW4tdmFsdWUnICkudmFsKCkgKTtcblx0XHRcdFx0bGV0IG1heFZhbHVlID0gcGFyc2VGbG9hdCggJHJhbmdlTnVtYmVyLmZpbmQoICcubWF4LXZhbHVlJyApLnZhbCgpICk7XG5cblx0XHRcdFx0Ly8gRm9yY2UgdGhlIG1pblZhbHVlIG5vdCB0byBiZSBlbXB0eS5cblx0XHRcdFx0aWYgKCBpc05hTiggbWluVmFsdWUgKSApIHtcblx0XHRcdFx0XHRtaW5WYWx1ZSA9IHJhbmdlTWluVmFsdWU7XG5cblx0XHRcdFx0XHQkcmFuZ2VOdW1iZXIuZmluZCggJy5taW4tdmFsdWUnICkudmFsKCBnZXRWYWx1ZSggbWluVmFsdWUgKSApO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdCRyYW5nZU51bWJlci5maW5kKCAnLm1pbi12YWx1ZScgKS52YWwoIGdldFZhbHVlKCBtaW5WYWx1ZSApICk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBGb3JjZSB0aGUgbWF4VmFsdWUgbm90IHRvIGJlIGVtcHR5LlxuXHRcdFx0XHRpZiAoIGlzTmFOKCBtYXhWYWx1ZSApICkge1xuXHRcdFx0XHRcdG1heFZhbHVlID0gcmFuZ2VNYXhWYWx1ZTtcblxuXHRcdFx0XHRcdCRyYW5nZU51bWJlci5maW5kKCAnLm1heC12YWx1ZScgKS52YWwoIGdldFZhbHVlKCBtYXhWYWx1ZSApICk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0JHJhbmdlTnVtYmVyLmZpbmQoICcubWF4LXZhbHVlJyApLnZhbCggZ2V0VmFsdWUoIG1heFZhbHVlICkgKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIEZvcmNlIHRoZSBtaW5WYWx1ZSBub3QgdG8gZ28gYmVsb3cgdGhlIHJhbmdlTWluVmFsdWUuXG5cdFx0XHRcdGlmICggbWluVmFsdWUgPCByYW5nZU1pblZhbHVlICkge1xuXHRcdFx0XHRcdG1pblZhbHVlID0gcmFuZ2VNaW5WYWx1ZTtcblxuXHRcdFx0XHRcdCRyYW5nZU51bWJlci5maW5kKCAnLm1pbi12YWx1ZScgKS52YWwoIGdldFZhbHVlKCBtaW5WYWx1ZSApICk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBGb3JjZSB0aGUgbWluVmFsdWUgbm90IHRvIGdvIHVwIHRoZSByYW5nZU1heFZhbHVlLlxuXHRcdFx0XHRpZiAoIG1pblZhbHVlID4gcmFuZ2VNYXhWYWx1ZSApIHtcblx0XHRcdFx0XHRtaW5WYWx1ZSA9IHJhbmdlTWF4VmFsdWU7XG5cblx0XHRcdFx0XHQkcmFuZ2VOdW1iZXIuZmluZCggJy5taW4tdmFsdWUnICkudmFsKCBnZXRWYWx1ZSggbWluVmFsdWUgKSApO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gRm9yY2UgdGhlIG1heFZhbHVlIG5vdCB0byBnbyB1cCB0aGUgcmFuZ2VNYXhWYWx1ZS5cblx0XHRcdFx0aWYgKCBtYXhWYWx1ZSA+IHJhbmdlTWF4VmFsdWUgKSB7XG5cdFx0XHRcdFx0bWF4VmFsdWUgPSByYW5nZU1heFZhbHVlO1xuXG5cdFx0XHRcdFx0JHJhbmdlTnVtYmVyLmZpbmQoICcubWF4LXZhbHVlJyApLnZhbCggZ2V0VmFsdWUoIG1heFZhbHVlICkgKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIEZvcmNlIHRoZSBtYXhWYWx1ZSBub3QgdG8gZ28gYmVsb3cgdGhlIG1pblZhbHVlLlxuXHRcdFx0XHRpZiAoIG1pblZhbHVlID4gbWF4VmFsdWUgKSB7XG5cdFx0XHRcdFx0bWF4VmFsdWUgPSBtaW5WYWx1ZTtcblxuXHRcdFx0XHRcdCRyYW5nZU51bWJlci5maW5kKCAnLm1heC12YWx1ZScgKS52YWwoIGdldFZhbHVlKCBtYXhWYWx1ZSApICk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBJZiB2YWx1ZSBpcyBub3QgY2hhbmdlZCB0aGVuIGRvbid0IHByb2NlZWQuXG5cdFx0XHRcdGlmICggbWluVmFsdWUgPT09IG9sZE1pblZhbHVlICYmIG1heFZhbHVlID09PSBvbGRNYXhWYWx1ZSApIHtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoIG1pblZhbHVlID09PSByYW5nZU1pblZhbHVlICYmIG1heFZhbHVlID09PSByYW5nZU1heFZhbHVlICkge1xuXHRcdFx0XHRcdC8vIFJlbW92ZSByYW5nZSBmaWx0ZXIuXG5cdFx0XHRcdFx0V0NBUEYucmVxdWVzdEZpbHRlciggJHJhbmdlTnVtYmVyLmRhdGEoICdjbGVhci1maWx0ZXItdXJsJyApICk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Ly8gQWRkIHJhbmdlIGZpbHRlci5cblx0XHRcdFx0XHRjb25zdCB1cmwgPSAkcmFuZ2VOdW1iZXIuZGF0YSggJ3VybCcgKS5yZXBsYWNlKCAnJTFzJywgbWluVmFsdWUgKS5yZXBsYWNlKCAnJTJzJywgbWF4VmFsdWUgKTtcblx0XHRcdFx0XHRXQ0FQRi5yZXF1ZXN0RmlsdGVyKCB1cmwgKTtcblx0XHRcdFx0fVxuXHRcdFx0fSApO1xuXG5cdFx0XHQkYm9keS5vbiggJ2tleWRvd24nLCByYW5nZU51bWJlclNlbGVjdG9ycywgZnVuY3Rpb24oIGUgKSB7XG5cdFx0XHRcdGlmICggJ0VudGVyJyA9PT0gZS5rZXkgKSB7XG5cdFx0XHRcdFx0JCggdGhpcyApLnRyaWdnZXIoICdjaGFuZ2UnICk7XG5cdFx0XHRcdH1cblx0XHRcdH0gKTtcblx0XHR9LFxuXHRcdGhhbmRsZUxpc3RGaWx0ZXJzOiBmdW5jdGlvbigpIHtcblx0XHRcdGNvbnN0IG5hdGl2ZUlucHV0cyA9ICcubGlzdC10eXBlLW5hdGl2ZSBbdHlwZT1cImNoZWNrYm94XCJdLCcgK1xuXHRcdFx0XHQnLmxpc3QtdHlwZS1uYXRpdmUgW3R5cGU9XCJyYWRpb1wiXSwnICtcblx0XHRcdFx0Jy5saXN0LXR5cGUtY3VzdG9tLWNoZWNrYm94IFt0eXBlPVwiY2hlY2tib3hcIl0nO1xuXG5cdFx0XHQkYm9keS5vbiggJ2NoYW5nZScsIG5hdGl2ZUlucHV0cywgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdCQoIHRoaXMgKS5jbG9zZXN0KCAnLndjYXBmLWZpbHRlci1pdGVtJyApLnRvZ2dsZUNsYXNzKCAnaXRlbS1hY3RpdmUnICk7XG5cblx0XHRcdFx0V0NBUEYucmVxdWVzdEZpbHRlciggJCggdGhpcyApLmRhdGEoICd1cmwnICkgKTtcblx0XHRcdH0gKTtcblxuXHRcdFx0Y29uc3QgY3VzdG9tUmFkaW9TZWxlY3RvciA9ICcubGlzdC10eXBlLWN1c3RvbS1yYWRpbyc7XG5cblx0XHRcdCRib2R5Lm9uKCAnY2hhbmdlJywgY3VzdG9tUmFkaW9TZWxlY3RvciArICcgW3R5cGU9XCJjaGVja2JveFwiXScsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHQkKCB0aGlzICkuY2xvc2VzdCggJy53Y2FwZi1maWx0ZXItaXRlbScgKS50b2dnbGVDbGFzcyggJ2l0ZW0tYWN0aXZlJyApO1xuXG5cdFx0XHRcdC8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS81ODM5OTI0XG5cdFx0XHRcdCQoIHRoaXMgKVxuXHRcdFx0XHRcdC5jbG9zZXN0KCBjdXN0b21SYWRpb1NlbGVjdG9yIClcblx0XHRcdFx0XHQuZmluZCggJy53Y2FwZi1maWx0ZXItaXRlbS5pdGVtLWFjdGl2ZSBbdHlwZT1cImNoZWNrYm94XCJdJyApXG5cdFx0XHRcdFx0Lm5vdCggdGhpcyApXG5cdFx0XHRcdFx0LnByb3AoICdjaGVja2VkJywgZmFsc2UgKVxuXHRcdFx0XHRcdC5jbG9zZXN0KCAnLndjYXBmLWZpbHRlci1pdGVtJyApXG5cdFx0XHRcdFx0LnJlbW92ZUNsYXNzKCAnaXRlbS1hY3RpdmUnICk7XG5cblx0XHRcdFx0V0NBUEYucmVxdWVzdEZpbHRlciggJCggdGhpcyApLmRhdGEoICd1cmwnICkgKTtcblx0XHRcdH0gKTtcblx0XHR9LFxuXHRcdGhhbmRsZURyb3Bkb3duRmlsdGVyczogZnVuY3Rpb24oKSB7XG5cdFx0XHQkYm9keS5vbiggJ2NoYW5nZScsICcud2NhcGYtZHJvcGRvd24td3JhcHBlciBzZWxlY3QnLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0Y29uc3QgJHNlbGVjdCAgICAgICAgPSAkKCB0aGlzICk7XG5cdFx0XHRcdGNvbnN0IHZhbHVlcyAgICAgICAgID0gJHNlbGVjdC52YWwoKTtcblx0XHRcdFx0Y29uc3QgZmlsdGVyVVJMICAgICAgPSAkc2VsZWN0LmRhdGEoICd1cmwnICk7XG5cdFx0XHRcdGNvbnN0IGNsZWFyRmlsdGVyVVJMID0gJHNlbGVjdC5kYXRhKCAnY2xlYXItZmlsdGVyLXVybCcgKTtcblx0XHRcdFx0bGV0IHVybDtcblxuXHRcdFx0XHRpZiAoIHZhbHVlcy5sZW5ndGggKSB7XG5cdFx0XHRcdFx0dXJsID0gZmlsdGVyVVJMLnJlcGxhY2UoICclcycsIHZhbHVlcy50b1N0cmluZygpICk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dXJsID0gY2xlYXJGaWx0ZXJVUkw7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRXQ0FQRi5yZXF1ZXN0RmlsdGVyKCB1cmwgKTtcblx0XHRcdH0gKTtcblx0XHR9LFxuXHRcdGhhbmRsZVBhZ2luYXRpb246IGZ1bmN0aW9uKCkge1xuXHRcdFx0aWYgKCB3Y2FwZl9wYXJhbXMuZW5hYmxlX3BhZ2luYXRpb25fdmlhX2FqYXggJiYgd2NhcGZfcGFyYW1zLnBhZ2luYXRpb25fY29udGFpbmVyICkge1xuXHRcdFx0XHRjb25zdCAkY29udGFpbmVyID0gJCggd2NhcGZfcGFyYW1zLnNob3BfbG9vcF9jb250YWluZXIgKTtcblx0XHRcdFx0Y29uc3QgX3NlbGVjdG9ycyA9IHdjYXBmX3BhcmFtcy5wYWdpbmF0aW9uX2NvbnRhaW5lci5zcGxpdCggJywnICk7XG5cdFx0XHRcdGNvbnN0IHNlbGVjdG9ycyAgPSBbXTtcblxuXHRcdFx0XHRfc2VsZWN0b3JzLmZvckVhY2goIHNlbGVjdG9yID0+IHtcblx0XHRcdFx0XHRpZiAoIHNlbGVjdG9yICkge1xuXHRcdFx0XHRcdFx0c2VsZWN0b3JzLnB1c2goIHNlbGVjdG9yICsgJyBhJyApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSApO1xuXG5cdFx0XHRcdGNvbnN0IHNlbGVjdG9yID0gc2VsZWN0b3JzLmpvaW4oICcsJyApO1xuXG5cdFx0XHRcdGlmICggJGNvbnRhaW5lci5sZW5ndGggKSB7XG5cdFx0XHRcdFx0JGNvbnRhaW5lci5vbiggJ2NsaWNrJywgc2VsZWN0b3IsIGZ1bmN0aW9uKCBlICkge1xuXHRcdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0XHRcdFx0XHRjb25zdCBocmVmID0gJCggdGhpcyApLmF0dHIoICdocmVmJyApO1xuXG5cdFx0XHRcdFx0XHRXQ0FQRi5yZXF1ZXN0RmlsdGVyKCBocmVmLCAncGFnaW5hdGUnICk7XG5cdFx0XHRcdFx0fSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSxcblx0XHRoYW5kbGVEZWZhdWx0T3JkZXJieTogZnVuY3Rpb24oKSB7XG5cdFx0XHRpZiAoICEgd2NhcGZfcGFyYW1zLnNvcnRpbmdfY29udHJvbCApIHtcblx0XHRcdFx0Ly8gU3VibWl0IHRoZSBvcmRlcmJ5IGZvcm0gd2hlbiB2YWx1ZSBpcyBjaGFuZ2VkLlxuXHRcdFx0XHQkYm9keS5vbiggJ2NoYW5nZScsIGRlZmF1bHRPcmRlckJ5RWxlbWVudCwgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0JCggdGhpcyApLmNsb3Nlc3QoICdmb3JtJyApLnRyaWdnZXIoICdzdWJtaXQnICk7XG5cdFx0XHRcdH0gKTtcblxuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdC8vIFByZXZlbnQgdGhlIGF1dG8gc3VibWlzc2lvbiBvZiB0aGUgb3JkZXJieSBmb3JtLlxuXHRcdFx0JGJvZHkub24oICdzdWJtaXQnLCB3Y2FwZl9wYXJhbXMub3JkZXJieV9mb3JtLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fSApO1xuXG5cdFx0XHQvLyBIYW5kbGUgdGhlIGZpbHRlciByZXF1ZXN0IHZpYSBhamF4IHdoZW4gdGhlIG9yZGVyYnkgdmFsdWUgaXMgY2hhbmdlZC5cblx0XHRcdCRib2R5Lm9uKCAnY2hhbmdlJywgZGVmYXVsdE9yZGVyQnlFbGVtZW50LCBmdW5jdGlvbigpIHtcblx0XHRcdFx0Y29uc3Qgb3JkZXIgPSAkKCB0aGlzICkudmFsKCk7XG5cblx0XHRcdFx0Y29uc3QgdXJsID0gbmV3IFVSTCggd2luZG93LmxvY2F0aW9uICk7XG5cdFx0XHRcdHVybC5zZWFyY2hQYXJhbXMuc2V0KCAnb3JkZXJieScsIG9yZGVyICk7XG5cblx0XHRcdFx0V0NBUEYucmVxdWVzdEZpbHRlciggZ2V0T3JkZXJCeVVybCggdXJsLmhyZWYgKSApO1xuXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH0gKTtcblx0XHR9LFxuXHRcdGhhbmRsZUNsZWFyRmlsdGVyOiBmdW5jdGlvbigpIHtcblx0XHRcdCRib2R5Lm9uKCAnY2xpY2snLCAnLndjYXBmLWZpbHRlci1jbGVhci1idG4nLCBmdW5jdGlvbiggZSApIHtcblx0XHRcdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcblxuXHRcdFx0XHRXQ0FQRi5yZXF1ZXN0RmlsdGVyKCAkKCB0aGlzICkuYXR0ciggJ2RhdGEtY2xlYXItZmlsdGVyLXVybCcgKSApO1xuXHRcdFx0fSApO1xuXHRcdH0sXG5cdFx0aGFuZGxlRmlsdGVyVG9vbHRpcDogZnVuY3Rpb24oKSB7XG5cdFx0XHQvLyBub2luc3BlY3Rpb24gSlNVbnJlc29sdmVkUmVmZXJlbmNlXG5cdFx0XHRpZiAoICdmdW5jdGlvbicgIT09IHR5cGVvZiB0aXBweSApIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoICEgd2NhcGZfcGFyYW1zLnVzZV90aXBweWpzICkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdC8vIG5vaW5zcGVjdGlvbiBKU1VucmVzb2x2ZWRSZWZlcmVuY2Vcblx0XHRcdHRpcHB5KCAnLndjYXBmLWZpbHRlci10b29sdGlwJywge1xuXHRcdFx0XHRwbGFjZW1lbnQ6ICd0b3AnLFxuXHRcdFx0XHRjb250ZW50KCByZWZlcmVuY2UgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHJlZmVyZW5jZS5nZXRBdHRyaWJ1dGUoICdkYXRhLWNvbnRlbnQnICk7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGFsbG93SFRNTDogdHJ1ZSxcblx0XHRcdH0gKTtcblx0XHR9LFxuXHRcdGluaXRDb21ib2JveDogZnVuY3Rpb24oKSB7XG5cdFx0XHRpZiAoICEgalF1ZXJ5KCkuY2hvc2VuV0NBUEYgKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Y29uc3QgdGVtcGxhdGVSZXN1bHQgPSAoIHRleHQsIGRhdGEgKSA9PiB7XG5cdFx0XHRcdHJldHVybiBbXG5cdFx0XHRcdFx0JzxzcGFuPicgKyB0ZXh0ICsgJzwvc3Bhbj4nLFxuXHRcdFx0XHRcdCc8c3BhbiBjbGFzcz1cIndjYXBmLWNvdW50XCI+JyArIGRhdGFbICdjb3VudE1hcmt1cCcgXSArICc8L3NwYW4+Jyxcblx0XHRcdFx0XS5qb2luKCAnJyApO1xuXHRcdFx0fTtcblxuXHRcdFx0Y29uc3QgdGVtcGxhdGVTZWxlY3Rpb24gPSAoIHRleHQsIGRhdGEgKSA9PiB7XG5cdFx0XHRcdHJldHVybiBbXG5cdFx0XHRcdFx0JzxzcGFuIGNsYXNzPVwid2NhcGYtY291bnQtJyArIGRhdGEuY291bnQgKyAnXCI+JyArIHRleHQgKyAnPC9zcGFuPicsXG5cdFx0XHRcdFx0JzxzcGFuIGNsYXNzPVwid2NhcGYtY291bnQgd2NhcGYtY291bnQtJyArIGRhdGEuY291bnQgKyAnXCI+JyArIGRhdGFbICdjb3VudE1hcmt1cCcgXSArICc8L3NwYW4+Jyxcblx0XHRcdFx0XS5qb2luKCAnJyApO1xuXHRcdFx0fTtcblxuXHRcdFx0Y29uc3QgZGVmYXVsdHMgPSB7XG5cdFx0XHRcdGluaGVyaXRfc2VsZWN0X2NsYXNzZXM6IHRydWUsXG5cdFx0XHRcdGluaGVyaXRfb3B0aW9uX2NsYXNzZXM6IHRydWUsXG5cdFx0XHRcdG5vX3Jlc3VsdHNfdGV4dDogd2NhcGZfcGFyYW1zLmNvbWJvYm94X25vX3Jlc3VsdHNfdGV4dCxcblx0XHRcdFx0b3B0aW9uc19ub25lX3RleHQ6IHdjYXBmX3BhcmFtcy5jb21ib2JveF9vcHRpb25zX25vbmVfdGV4dCxcblx0XHRcdFx0c2VhcmNoX2NvbnRhaW5zOiB0cnVlLCAvLyBNYXRjaCBmcm9tIGFueXdoZXJlIGluIHN0cmluZy5cblx0XHRcdFx0c2VhcmNoX2luX3ZhbHVlczogdHJ1ZSwgLy8gU2VhcmNoIGluIHZhbHVlcyBhbHNvLlxuXHRcdFx0fTtcblxuXHRcdFx0aWYgKCB3Y2FwZl9wYXJhbXMuaXNfcnRsICkge1xuXHRcdFx0XHRkZWZhdWx0c1sgJ3J0bCcgXSA9IHRydWU7XG5cdFx0XHR9XG5cblx0XHRcdCRib2R5LmZpbmQoICcud2NhcGYtY2hvc2VuJyApLmVhY2goIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRjb25zdCAkdGhpcyAgID0gJCggdGhpcyApO1xuXHRcdFx0XHRjb25zdCBvcHRpb25zID0geyAuLi5kZWZhdWx0cyB9O1xuXG5cdFx0XHRcdC8vIElmIGhpZXJhcmNoeSBlbmFibGVkIHRoZW4gd2Ugc2hvdyB0aGUgc2VsZWN0ZWQgb3B0aW9ucy5cblx0XHRcdFx0aWYgKCAkdGhpcy5oYXNDbGFzcyggJ2hhcy1oaWVyYXJjaHknICkgKSB7XG5cdFx0XHRcdFx0b3B0aW9uc1sgJ2Rpc3BsYXlfc2VsZWN0ZWRfb3B0aW9ucycgXSA9IHRydWU7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0b3B0aW9uc1sgJ2Rpc3BsYXlfc2VsZWN0ZWRfb3B0aW9ucycgXSA9IHdjYXBmX3BhcmFtcy5jb21ib2JveF9kaXNwbGF5X3NlbGVjdGVkX29wdGlvbnM7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBFbmFibGUgdGVtcGxhdGluZyB3aGVuIHNob3dpbmcgY291bnQuXG5cdFx0XHRcdGlmICggJHRoaXMuaGFzQ2xhc3MoICd3aXRoLWNvdW50JyApICkge1xuXHRcdFx0XHRcdG9wdGlvbnNbICd0ZW1wbGF0ZVJlc3VsdCcgXSAgICA9IHRlbXBsYXRlUmVzdWx0O1xuXHRcdFx0XHRcdG9wdGlvbnNbICd0ZW1wbGF0ZVNlbGVjdGlvbicgXSA9IHRlbXBsYXRlU2VsZWN0aW9uO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gRGlzYWJsZSBzZWFyY2ggYm94LlxuXHRcdFx0XHRpZiAoICEgJHRoaXMuZGF0YSggJ2VuYWJsZS1zZWFyY2gnICkgKSB7XG5cdFx0XHRcdFx0b3B0aW9uc1sgJ2Rpc2FibGVfc2VhcmNoJyBdID0gdHJ1ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdCR0aGlzLmNob3NlbldDQVBGKCBvcHRpb25zICk7XG5cdFx0XHR9ICk7XG5cblx0XHRcdC8vIEF0dGFjaCBjaG9zZW4gZm9yIGRlZmF1bHQgb3JkZXJieS5cblx0XHRcdGlmICggd2NhcGZfcGFyYW1zLmF0dGFjaF9jb21ib2JveF9vbl9zb3J0aW5nICkge1xuXHRcdFx0XHRsZXQgZGlzYWJsZVNlYXJjaCA9IHRydWU7XG5cblx0XHRcdFx0aWYgKCB3Y2FwZl9wYXJhbXMuc2VhcmNoX2JveF9pbl9kZWZhdWx0X29yZGVyYnkgKSB7XG5cdFx0XHRcdFx0ZGlzYWJsZVNlYXJjaCA9IGZhbHNlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Y29uc3Qgb3B0aW9ucyA9IHsgLi4uZGVmYXVsdHMgfTtcblxuXHRcdFx0XHRvcHRpb25zWyAnZGlzYWJsZV9zZWFyY2gnIF0gPSBkaXNhYmxlU2VhcmNoO1xuXG5cdFx0XHRcdCRib2R5LmZpbmQoIGRlZmF1bHRPcmRlckJ5RWxlbWVudCApLmNob3NlbldDQVBGKCBvcHRpb25zICk7XG5cdFx0XHR9XG5cdFx0fSxcblx0XHRpbml0UmFuZ2VTbGlkZXI6IGZ1bmN0aW9uKCkge1xuXHRcdFx0aWYgKCAndW5kZWZpbmVkJyA9PT0gdHlwZW9mIG5vVWlTbGlkZXIgKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0JGJvZHkuZmluZCggJy53Y2FwZi1yYW5nZS1zbGlkZXInICkuZWFjaCggZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGNvbnN0ICRpdGVtICAgPSAkKCB0aGlzICk7XG5cdFx0XHRcdGNvbnN0ICRzbGlkZXIgPSAkaXRlbS5maW5kKCAnLndjYXBmLW5vdWktc2xpZGVyJyApO1xuXG5cdFx0XHRcdGNvbnN0IHNsaWRlcklkICAgICAgICAgID0gJHNsaWRlci5hdHRyKCAnaWQnICk7XG5cdFx0XHRcdGNvbnN0IGRpc3BsYXlWYWx1ZXNBcyAgID0gJGl0ZW0uYXR0ciggJ2RhdGEtZGlzcGxheS12YWx1ZXMtYXMnICk7XG5cdFx0XHRcdGNvbnN0IGZvcm1hdE51bWJlcnMgICAgID0gJGl0ZW0uYXR0ciggJ2RhdGEtZm9ybWF0LW51bWJlcnMnICk7XG5cdFx0XHRcdGNvbnN0IHJhbmdlTWluVmFsdWUgICAgID0gcGFyc2VGbG9hdCggJGl0ZW0uYXR0ciggJ2RhdGEtcmFuZ2UtbWluLXZhbHVlJyApICk7XG5cdFx0XHRcdGNvbnN0IHJhbmdlTWF4VmFsdWUgICAgID0gcGFyc2VGbG9hdCggJGl0ZW0uYXR0ciggJ2RhdGEtcmFuZ2UtbWF4LXZhbHVlJyApICk7XG5cdFx0XHRcdGNvbnN0IHN0ZXAgICAgICAgICAgICAgID0gcGFyc2VGbG9hdCggJGl0ZW0uYXR0ciggJ2RhdGEtc3RlcCcgKSApO1xuXHRcdFx0XHRjb25zdCBkZWNpbWFsUGxhY2VzICAgICA9ICRpdGVtLmF0dHIoICdkYXRhLWRlY2ltYWwtcGxhY2VzJyApO1xuXHRcdFx0XHRjb25zdCB0aG91c2FuZFNlcGFyYXRvciA9ICRpdGVtLmF0dHIoICdkYXRhLXRob3VzYW5kLXNlcGFyYXRvcicgKTtcblx0XHRcdFx0Y29uc3QgZGVjaW1hbFNlcGFyYXRvciAgPSAkaXRlbS5hdHRyKCAnZGF0YS1kZWNpbWFsLXNlcGFyYXRvcicgKTtcblx0XHRcdFx0Y29uc3QgbWluVmFsdWUgICAgICAgICAgPSBwYXJzZUZsb2F0KCAkaXRlbS5hdHRyKCAnZGF0YS1taW4tdmFsdWUnICkgKTtcblx0XHRcdFx0Y29uc3QgbWF4VmFsdWUgICAgICAgICAgPSBwYXJzZUZsb2F0KCAkaXRlbS5hdHRyKCAnZGF0YS1tYXgtdmFsdWUnICkgKTtcblx0XHRcdFx0Y29uc3QgJG1pblZhbHVlICAgICAgICAgPSAkaXRlbS5maW5kKCAnLm1pbi12YWx1ZScgKTtcblx0XHRcdFx0Y29uc3QgJG1heFZhbHVlICAgICAgICAgPSAkaXRlbS5maW5kKCAnLm1heC12YWx1ZScgKTtcblxuXHRcdFx0XHRjb25zdCBzbGlkZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggc2xpZGVySWQgKTtcblxuXHRcdFx0XHRjb25zdCBzYWZlU3RlcCA9IGlzTmFOKCBzdGVwICkgfHwgc3RlcCA8PSAwID8gMSA6IHN0ZXA7XG5cblx0XHRcdFx0bm9VaVNsaWRlci5jcmVhdGUoIHNsaWRlciwge1xuXHRcdFx0XHRcdHN0YXJ0OiBbIG1pblZhbHVlLCBtYXhWYWx1ZSBdLFxuXHRcdFx0XHRcdHN0ZXA6IHNhZmVTdGVwLFxuXHRcdFx0XHRcdGNvbm5lY3Q6IHRydWUsXG5cdFx0XHRcdFx0Y3NzUHJlZml4OiAnd2NhcGYtbm91aS0nLFxuXHRcdFx0XHRcdHJhbmdlOiB7XG5cdFx0XHRcdFx0XHQnbWluJzogcmFuZ2VNaW5WYWx1ZSxcblx0XHRcdFx0XHRcdCdtYXgnOiByYW5nZU1pblZhbHVlID09PSByYW5nZU1heFZhbHVlID8gcmFuZ2VNaW5WYWx1ZSArIHNhZmVTdGVwIDogcmFuZ2VNYXhWYWx1ZSxcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gKTtcblxuXHRcdFx0XHRzbGlkZXIubm9VaVNsaWRlci5vbiggJ3VwZGF0ZScsIGZ1bmN0aW9uKCB2YWx1ZXMgKSB7XG5cdFx0XHRcdFx0bGV0IG1pblZhbHVlO1xuXHRcdFx0XHRcdGxldCBtYXhWYWx1ZTtcblxuXHRcdFx0XHRcdGlmICggZm9ybWF0TnVtYmVycyApIHtcblx0XHRcdFx0XHRcdG1pblZhbHVlID0gbnVtYmVyRm9ybWF0KCB2YWx1ZXNbIDAgXSwgZGVjaW1hbFBsYWNlcywgZGVjaW1hbFNlcGFyYXRvciwgdGhvdXNhbmRTZXBhcmF0b3IgKTtcblx0XHRcdFx0XHRcdG1heFZhbHVlID0gbnVtYmVyRm9ybWF0KCB2YWx1ZXNbIDEgXSwgZGVjaW1hbFBsYWNlcywgZGVjaW1hbFNlcGFyYXRvciwgdGhvdXNhbmRTZXBhcmF0b3IgKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0bWluVmFsdWUgPSBwYXJzZUZsb2F0KCB2YWx1ZXNbIDAgXSApO1xuXHRcdFx0XHRcdFx0bWF4VmFsdWUgPSBwYXJzZUZsb2F0KCB2YWx1ZXNbIDEgXSApO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmICggJ3BsYWluX3RleHQnID09PSBkaXNwbGF5VmFsdWVzQXMgKSB7XG5cdFx0XHRcdFx0XHQkbWluVmFsdWUuaHRtbCggbWluVmFsdWUgKTtcblx0XHRcdFx0XHRcdCRtYXhWYWx1ZS5odG1sKCBtYXhWYWx1ZSApO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHQkbWluVmFsdWUudmFsKCBtaW5WYWx1ZSApO1xuXHRcdFx0XHRcdFx0JG1heFZhbHVlLnZhbCggbWF4VmFsdWUgKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gKTtcblxuXHRcdFx0XHRmdW5jdGlvbiBmaWx0ZXJQcm9kdWN0c0FjY29yZGluZ1RvU2xpZGVyKCB2YWx1ZXMgKSB7XG5cdFx0XHRcdFx0Y29uc3QgX21pblZhbHVlID0gcGFyc2VGbG9hdCggdmFsdWVzWyAwIF0gKTtcblx0XHRcdFx0XHRjb25zdCBfbWF4VmFsdWUgPSBwYXJzZUZsb2F0KCB2YWx1ZXNbIDEgXSApO1xuXG5cdFx0XHRcdFx0Ly8gSWYgdmFsdWUgaXMgbm90IGNoYW5nZWQgdGhlbiBkb24ndCBwcm9jZWVkLlxuXHRcdFx0XHRcdGlmICggX21pblZhbHVlID09PSBtaW5WYWx1ZSAmJiBfbWF4VmFsdWUgPT09IG1heFZhbHVlICkge1xuXHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmICggX21pblZhbHVlID09PSByYW5nZU1pblZhbHVlICYmIF9tYXhWYWx1ZSA9PT0gcmFuZ2VNYXhWYWx1ZSApIHtcblx0XHRcdFx0XHRcdC8vIFJlbW92ZSByYW5nZSBmaWx0ZXIuXG5cdFx0XHRcdFx0XHRXQ0FQRi5yZXF1ZXN0RmlsdGVyKCAkaXRlbS5kYXRhKCAnY2xlYXItZmlsdGVyLXVybCcgKSApO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHQvLyBBZGQgcmFuZ2UgZmlsdGVyLlxuXHRcdFx0XHRcdFx0Y29uc3QgdXJsID0gJGl0ZW0uZGF0YSggJ3VybCcgKS5yZXBsYWNlKCAnJTFzJywgX21pblZhbHVlICkucmVwbGFjZSggJyUycycsIF9tYXhWYWx1ZSApO1xuXHRcdFx0XHRcdFx0V0NBUEYucmVxdWVzdEZpbHRlciggdXJsICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0bGV0IGlzRHJhZ2dpbmcgPSBmYWxzZTtcblxuXHRcdFx0XHRzbGlkZXIubm9VaVNsaWRlci5vbiggJ3N0YXJ0JywgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0aXNEcmFnZ2luZyA9IHRydWU7XG5cdFx0XHRcdH0gKTtcblxuXHRcdFx0XHRzbGlkZXIubm9VaVNsaWRlci5vbiggJ2VuZCcsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdGlzRHJhZ2dpbmcgPSBmYWxzZTtcblx0XHRcdFx0XHRmaWx0ZXJQcm9kdWN0c0FjY29yZGluZ1RvU2xpZGVyKCBzbGlkZXIubm9VaVNsaWRlci5nZXQoKSApO1xuXHRcdFx0XHR9ICk7XG5cblx0XHRcdFx0c2xpZGVyLm5vVWlTbGlkZXIub24oICdjaGFuZ2UnLCBmdW5jdGlvbiggdmFsdWVzICkge1xuXHRcdFx0XHRcdGlmICggaXNEcmFnZ2luZyApIHtcblx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBLZXlib2FyZCBpbnRlcmFjdGlvbiDigJQgZGVib3VuY2UgdG8gYXZvaWQgYSByZXF1ZXN0IG9uIGV2ZXJ5IGtleSBwcmVzcy5cblx0XHRcdFx0XHRjbGVhclRpbWVvdXQoICRpdGVtLmRhdGEoICd0aW1lcicgKSApO1xuXG5cdFx0XHRcdFx0JGl0ZW0uZGF0YSggJ3RpbWVyJywgc2V0VGltZW91dCggZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHQkaXRlbS5yZW1vdmVEYXRhKCAndGltZXInICk7XG5cdFx0XHRcdFx0XHRmaWx0ZXJQcm9kdWN0c0FjY29yZGluZ1RvU2xpZGVyKCB2YWx1ZXMgKTtcblx0XHRcdFx0XHR9LCBkZWxheSApICk7XG5cdFx0XHRcdH0gKTtcblxuXHRcdFx0XHQkbWluVmFsdWUub24oICdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRjb25zdCB2YWwgPSBwYXJzZUZsb2F0KCAkKCB0aGlzICkudmFsKCkgKTtcblx0XHRcdFx0XHRzbGlkZXIubm9VaVNsaWRlci5zZXQoIFsgaXNOYU4oIHZhbCApID8gcmFuZ2VNaW5WYWx1ZSA6IHZhbCwgbnVsbCBdICk7XG5cdFx0XHRcdFx0ZmlsdGVyUHJvZHVjdHNBY2NvcmRpbmdUb1NsaWRlciggc2xpZGVyLm5vVWlTbGlkZXIuZ2V0KCkgKTtcblx0XHRcdFx0fSApO1xuXG5cdFx0XHRcdCRtaW5WYWx1ZS5vbiggJ2tleWRvd24nLCBmdW5jdGlvbiggZSApIHtcblx0XHRcdFx0XHRpZiAoICdFbnRlcicgPT09IGUua2V5ICkge1xuXHRcdFx0XHRcdFx0JCggdGhpcyApLnRyaWdnZXIoICdjaGFuZ2UnICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9ICk7XG5cblx0XHRcdFx0JG1heFZhbHVlLm9uKCAnY2hhbmdlJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0Y29uc3QgdmFsID0gcGFyc2VGbG9hdCggJCggdGhpcyApLnZhbCgpICk7XG5cdFx0XHRcdFx0c2xpZGVyLm5vVWlTbGlkZXIuc2V0KCBbIG51bGwsIGlzTmFOKCB2YWwgKSA/IHJhbmdlTWF4VmFsdWUgOiB2YWwgXSApO1xuXHRcdFx0XHRcdGZpbHRlclByb2R1Y3RzQWNjb3JkaW5nVG9TbGlkZXIoIHNsaWRlci5ub1VpU2xpZGVyLmdldCgpICk7XG5cdFx0XHRcdH0gKTtcblxuXHRcdFx0XHQkbWF4VmFsdWUub24oICdrZXlkb3duJywgZnVuY3Rpb24oIGUgKSB7XG5cdFx0XHRcdFx0aWYgKCAnRW50ZXInID09PSBlLmtleSApIHtcblx0XHRcdFx0XHRcdCQoIHRoaXMgKS50cmlnZ2VyKCAnY2hhbmdlJyApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSApO1xuXHRcdFx0fSApO1xuXHRcdH0sXG5cdFx0aW5pdEZpbHRlck9wdGlvblRvb2x0aXA6IGZ1bmN0aW9uKCkge1xuXHRcdFx0Ly8gbm9pbnNwZWN0aW9uIEpTVW5yZXNvbHZlZFJlZmVyZW5jZVxuXHRcdFx0aWYgKCAnZnVuY3Rpb24nICE9PSB0eXBlb2YgdGlwcHkgKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCAhIHdjYXBmX3BhcmFtcy51c2VfdGlwcHlqcyApIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCB0b29sdGlwUG9zaXRpb25zID0gWyAndG9wJywgJ3JpZ2h0JywgJ2JvdHRvbScsICdsZWZ0JyBdO1xuXG5cdFx0XHR0b29sdGlwUG9zaXRpb25zLmZvckVhY2goIGZ1bmN0aW9uKCB0b29sdGlwUG9zaXRpb24gKSB7XG5cdFx0XHRcdGNvbnN0IGlkZW50aWZpZXIgPSAnZGF0YS13Y2FwZi10b29sdGlwLScgKyB0b29sdGlwUG9zaXRpb247XG5cblx0XHRcdFx0Ly8gbm9pbnNwZWN0aW9uIEpTVW5yZXNvbHZlZFJlZmVyZW5jZVxuXHRcdFx0XHRjb25zdCBpbnN0YW5jZXMgPSB0aXBweSggJ1snICsgaWRlbnRpZmllciArICddJywge1xuXHRcdFx0XHRcdHBsYWNlbWVudDogdG9vbHRpcFBvc2l0aW9uLFxuXHRcdFx0XHRcdGNvbnRlbnQoIHJlZmVyZW5jZSApIHtcblx0XHRcdFx0XHRcdHJldHVybiByZWZlcmVuY2UuZ2V0QXR0cmlidXRlKCBpZGVudGlmaWVyICk7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRhbGxvd0hUTUw6IHRydWUsXG5cdFx0XHRcdH0gKTtcblxuXHRcdFx0XHR3aW5kb3cudGlwcHlJbnN0YW5jZXMgPSB0aXBweUluc3RhbmNlcy5jb25jYXQoIGluc3RhbmNlcyApO1xuXHRcdFx0fSApO1xuXHRcdH0sXG5cdFx0aW5pdDogZnVuY3Rpb24oKSB7XG5cdFx0XHRXQ0FQRi5pbml0Q29tYm9ib3goKTtcblx0XHRcdFdDQVBGLmluaXRSYW5nZVNsaWRlcigpO1xuXHRcdFx0V0NBUEYuaW5pdEZpbHRlck9wdGlvblRvb2x0aXAoKTtcblx0XHR9LFxuXHRcdGhhbmRsZUZvcm1TdWJtaXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0JGJvZHkub24oICdzdWJtaXQnLCAnLndjYXBmLWZvcm0nLCBmdW5jdGlvbiggZSApIHtcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0fSApO1xuXHRcdH0sXG5cdFx0aW5pdFBvcFN0YXRlOiBmdW5jdGlvbigpIHtcblx0XHRcdGlmICggd2NhcGZfcGFyYW1zLnJlbG9hZF9vbl9iYWNrICYmIHdjYXBmX3BhcmFtcy5mb3VuZF93Y2FwZiApIHtcblx0XHRcdFx0aGlzdG9yeS5yZXBsYWNlU3RhdGUoIHsgd2NhcGY6IHRydWUgfSwgJycsIHdpbmRvdy5sb2NhdGlvbiApO1xuXG5cdFx0XHRcdC8vIEhhbmRsZSB0aGUgcG9wc3RhdGUgZXZlbnQoYnJvd3NlcidzIGJhY2svZm9yd2FyZClcblx0XHRcdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoICdwb3BzdGF0ZScsIGZ1bmN0aW9uKCBlICkge1xuXHRcdFx0XHRcdGlmICggbnVsbCAhPT0gZS5zdGF0ZSAmJiBlLnN0YXRlLmhhc093blByb3BlcnR5KCAnd2NhcGYnICkgKSB7XG5cdFx0XHRcdFx0XHRXQ0FQRi5maWx0ZXJQcm9kdWN0cyggJ3BvcHN0YXRlJyApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSApO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcblxuXHQvKipcblx0ICogRW5hYmxlIGl0IGlmIG5lY2Vzc2FyeS5cblx0ICpcblx0ICogQHNvdXJjZSBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMzMwMDQ5MTdcblx0ICovXG5cdGlmICggJ3Njcm9sbFJlc3RvcmF0aW9uJyBpbiBoaXN0b3J5ICkge1xuXHRcdC8vIGhpc3Rvcnkuc2Nyb2xsUmVzdG9yYXRpb24gPSAnbWFudWFsJztcblx0fVxuXG59KCBqUXVlcnksIHdpbmRvdyApICk7XG5cbiggZnVuY3Rpb24oICQsIFdDQVBGICkge1xuXG5cdFdDQVBGLmluaXQoKTtcblx0V0NBUEYuaW5pdFBvcFN0YXRlKCk7XG5cblx0V0NBUEYuaGFuZGxlRmlsdGVyQWNjb3JkaW9uKCk7XG5cdFdDQVBGLmhhbmRsZUhpZXJhcmNoeVRvZ2dsZSgpO1xuXHRXQ0FQRi5oYW5kbGVTb2Z0TGltaXQoKTtcblx0V0NBUEYuaGFuZGxlU2VhcmNoRmlsdGVyT3B0aW9ucygpO1xuXG5cdFdDQVBGLmhhbmRsZUxpc3RGaWx0ZXJzKCk7XG5cdFdDQVBGLmhhbmRsZURyb3Bkb3duRmlsdGVycygpO1xuXHRXQ0FQRi5oYW5kbGVOdW1iZXJJbnB1dEZpbHRlcnMoKTtcblx0V0NBUEYuaGFuZGxlUGFnaW5hdGlvbigpO1xuXHRXQ0FQRi5oYW5kbGVEZWZhdWx0T3JkZXJieSgpO1xuXG5cdFdDQVBGLmhhbmRsZUNsZWFyRmlsdGVyKCk7XG5cblx0V0NBUEYuaGFuZGxlRmlsdGVyVG9vbHRpcCgpO1xuXG5cdFdDQVBGLmhhbmRsZUZvcm1TdWJtaXQoKTtcblxuXHQvKipcblx0ICogTWFrZSBpdCBjb21wYXRpYmxlIHdpdGggb3RoZXIgcGx1Z2lucy5cblx0ICovXG5cdCQoIGRvY3VtZW50ICkub24oICd3Y2FwZl9hZnRlcl91cGRhdGluZ19wcm9kdWN0cycsIGZ1bmN0aW9uKCkge1xuXHRcdC8vIHdvby12YXJpYXRpb24tc3dhdGNoZXNcblx0XHQkKCBkb2N1bWVudCApLnRyaWdnZXIoICd3b29fdmFyaWF0aW9uX3N3YXRjaGVzX3Byb19pbml0JyApO1xuXHR9ICk7XG5cbn0oIGpRdWVyeSwgd2luZG93LldDQVBGICkgKTtcbiIsIi8qKlxuICogQHNvdXJjZSBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMzQxNDE4MTNcbiAqXG4gKiBAcGFyYW0gbnVtYmVyXG4gKiBAcGFyYW0gZGVjaW1hbHNcbiAqIEBwYXJhbSBkZWNfcG9pbnRcbiAqIEBwYXJhbSB0aG91c2FuZHNfc2VwXG4gKlxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gbnVtYmVyRm9ybWF0KCBudW1iZXIsIGRlY2ltYWxzLCBkZWNfcG9pbnQsIHRob3VzYW5kc19zZXAgKSB7XG5cdC8vIFN0cmlwIGFsbCBjaGFyYWN0ZXJzIGJ1dCBudW1lcmljYWwgb25lcy5cblx0bnVtYmVyID0gKCBudW1iZXIgKyAnJyApLnJlcGxhY2UoIC9bXlxcZCtcXC1FZS5dL2csICcnICk7XG5cblx0Y29uc3QgbiAgICA9ICEgaXNGaW5pdGUoICtudW1iZXIgKSA/IDAgOiArbnVtYmVyO1xuXHRjb25zdCBwcmVjID0gISBpc0Zpbml0ZSggK2RlY2ltYWxzICkgPyAwIDogTWF0aC5hYnMoIGRlY2ltYWxzICk7XG5cdGNvbnN0IHNlcCAgPSAoIHR5cGVvZiB0aG91c2FuZHNfc2VwID09PSAndW5kZWZpbmVkJyApID8gJywnIDogdGhvdXNhbmRzX3NlcDtcblx0Y29uc3QgZGVjICA9ICggdHlwZW9mIGRlY19wb2ludCA9PT0gJ3VuZGVmaW5lZCcgKSA/ICcuJyA6IGRlY19wb2ludDtcblxuXHRsZXQgcztcblxuXHRjb25zdCB0b0ZpeGVkRml4ID0gZnVuY3Rpb24oIG4sIHByZWMgKSB7XG5cdFx0Y29uc3QgayA9IE1hdGgucG93KCAxMCwgcHJlYyApO1xuXHRcdHJldHVybiAnJyArIE1hdGgucm91bmQoIG4gKiBrICkgLyBrO1xuXHR9O1xuXG5cdC8vIEZpeCBmb3IgSUUgcGFyc2VGbG9hdCgwLjU1KS50b0ZpeGVkKDApID0gMDtcblx0cyA9ICggcHJlYyA/IHRvRml4ZWRGaXgoIG4sIHByZWMgKSA6ICcnICsgTWF0aC5yb3VuZCggbiApICkuc3BsaXQoICcuJyApO1xuXG5cdGlmICggc1sgMCBdLmxlbmd0aCA+IDMgKSB7XG5cdFx0c1sgMCBdID0gc1sgMCBdLnJlcGxhY2UoIC9cXEIoPz0oPzpcXGR7M30pKyg/IVxcZCkpL2csIHNlcCApO1xuXHR9XG5cblx0aWYgKCAoIHNbIDEgXSB8fCAnJyApLmxlbmd0aCA8IHByZWMgKSB7XG5cdFx0c1sgMSBdID0gc1sgMSBdIHx8ICcnO1xuXHRcdHNbIDEgXSArPSBuZXcgQXJyYXkoIHByZWMgLSBzWyAxIF0ubGVuZ3RoICsgMSApLmpvaW4oICcwJyApO1xuXHR9XG5cblx0cmV0dXJuIHMuam9pbiggZGVjICk7XG59XG5cbmZ1bmN0aW9uIGNsZWFuVXJsKCB1cmwgKSB7XG5cdHJldHVybiB1cmwucmVwbGFjZSggLyUyQy9nLCAnLCcgKTtcbn1cblxuZnVuY3Rpb24gZ2V0T3JkZXJCeVVybCggdXJsICkge1xuXHRjb25zdCBwYWdlZCA9IHBhcnNlSW50KCB1cmwucmVwbGFjZSggLy4rXFwvcGFnZVxcLyhcXGQrKSsvLCAnJDEnICkgKTtcblxuXHRpZiAoIHBhZ2VkICkge1xuXHRcdHVybCA9IHVybC5yZXBsYWNlKCAvcGFnZVxcLyhcXGQrKVxcLy8sICcnICk7XG5cdH1cblxuXHRyZXR1cm4gY2xlYW5VcmwoIHVybCApO1xufVxuIl19
