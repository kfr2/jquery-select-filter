/**
 * jQuery Select-Filter 0.0.1
 *
 * Dynamically filter long <select> lists through an (automatically created)
 * input[type="text"] control.
 *
 * https://github.com/kfr2/jquery-select-filter
 *
 * License: GPL - http://www.gnu.org/licenses/gpl.html
 */
(function($) {
    $.fn.selectFilter = function(options) {
        var defaults = {
            // searching should be case sensitive
            'caseSensitive': false,

            // clear input box on Escape press
            'clearInputOnEscape': true,

            // disable regular expressions in search input
            'disableRegex': true,

            // class to associate with filter element
            'filterClass': 'filter-bar',

            // whether the input element should be appended to the DOM
            // either 'below' (default) or 'above' the select element
            'inputLocation': 'below',

            // text to display as placeholder for the filter bar
            'inputPlaceholder': 'type to filter list',

            // the minimum number of characters required to begin initial filtering
            'minimumCharacters': 3,

            // the minimum size attribute for the select element this plugin is called on
            'minimumSelectElementSize': 3,

            // amount of time to delay filter between keypresses (in ms)
            'searchDelay': 200,

            // begin searching strickly from beginning of each option
            'searchFromBeginning': false,

            // the width for the select/input boxes. If -1, use the width of the calling element before filtering occurs
            // the width may be numeric (in which case px will be appended) or another valid CSS designator (ex: %)
            'width': -1
        };

        // Overwrite default settings with user provided ones.
        options = $.extend(defaults, options);


        // Note the calling element -- i.e., the select element -- and its
        // children.
        var self = this;
        if (!self || self.get(0).tagName !== 'SELECT') {
            return false;
        }

        // Keep a copy of the children of the calling element.
        var clone = self.children().clone();

        // Lock the calling element's width to prevent it from dynamically
        // resizing when the maximum length of its children changes.
        // Otherwise, the calling element may resize as its children
        // are removed/added.
        var width = options.width;
        if (width === -1) {
            width = self.width();
        }

        var widthStr = width.toString();
        if (isFinite(widthStr)) {
            widthStr += 'px';
        }

        self.css('width', widthStr);


        // Used for connection between input and select elements.
        var name = '';
        if (typeof(self.attr('name')) === 'undefined') {
            name = 'undefined_name';
        }
        else {
            name = self.attr('name').replace(/\]/g, '').replace(/\[/g, '');
        }


        // Ascertain the calling element's size is at least mininumSelectElementSize
        if(typeof(self.attr('size')) === 'undefined' || self.attr('size') < options.minimumSelectElementSize)
        {
            self.attr('size', options.minimumSelectElementSize);
        }

        // Create the filter element and attach it to the calling element.
        var filterElement = $('<input>', {
            id: 'input_' + name,
            type: 'text',
            placeholder: options.inputPlaceholder,
            class: options.filterClass,
            style: 'display: block; width: ' + widthStr
        });


        self.addClass(name + '_select').css({'display': 'block'});

        if (options.inputLocation === 'above') {
            self.before(filterElement);
        }
        else {
            self.after(filterElement);
        }



        // Clear the input box when escape is pressed.
        if (options.clearInputOnEscape) {
            $('#input_' + name).on('keydown', function(key) {
                if (key.which === 27) {
                    $(this).val('');
                }
            });
        }


        /**
         * Filtering logic
         */
        var keyDelayTimeout;
        var filteringStarted = false;
        var oldSearchText = null;

        $('#input_' + name).on('keyup', function() {
            clearTimeout(keyDelayTimeout);

            var searchText = $(this).val();
            if (!filteringStarted && searchText.length < options.minimumCharacters) {
                return;
            }

            filteringStarted = true;

            // Add timeout to filtering for performance reasons.
            keyDelayTimeout = setTimeout(function() {
                // Refresh the list of items if the search string has
                // grown shorter as the user is backtracking.
                // TODO: it might be neat to consider caching copies of results
                // for various phrases and swap them into place as the user
                // backtracks and enters previous queries.
                if (oldSearchText !== null) {
                    if (searchText.length <= oldSearchText.length) {
                        self.children().remove();
                        self.append(clone);
                    }
                }
                oldSearchText = searchText;

                if (!options.caseSensitive) {
                    searchText = searchText.toLowerCase();
                }

                if (options.disableRegex) {
                    searchText = searchText.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
                }

                if (options.searchFromBeginning) {
                    searchText = '^' + searchText;
                }

                var pattern = new RegExp(searchText);
                self.children().each(function(i, selected) {
                    var option_value = $(this).text();
                    if (!options.caseSensitive) {
                        option_value = option_value.toLowerCase();
                    }

                    if (!pattern.test(option_value)) {
                        $(selected).remove();
                    }
                });

                if (self.children().length === 0) {
                    self.append('<option disabled>(No results.)</option>');
                }

                clearTimeout(keyDelayTimeout);
            }, options.searchDelay);
        });


        return this;
    };
})(jQuery);
