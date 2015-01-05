# jQuery Select-Filter
A jQuery plugin to dynamically filter long \<select\> lists through an input[type="text"] control.

This plugin is forked from [a project by Andras Zoltan-Gyarfas](http:///realizare-site-web.ro/works/codes/jquery/HTML-Select-List-Filter).


## Demo
See [this jsFiddle](http://jsfiddle.net/Ct2eM/40/).

## Getting Started
Download the production version (`jquery.select-filter.min.js`) or development version (`jquery.select-filter.js`) of jQuery.Select-Filter and include it in your HTML.

    <script type="text/javascript" src="http://code.jquery.com/jquery.js"></script>
    <script type="text/javascript" src="jquery.select-filter.min.js"></script>
    <script type="text/javascript">
        $(document).ready(function() {
            $('select.class').selectFilter();
        });
    </script>


## Examples
### Simple Syntax
    $('select.class').selectFilter();

### Verbose Syntax
    Any of the following attributes can be inside a dictionary to `selectFilter()`.  These options highlight jQuery.select-filter's default settings.

    $('select.class').selectFilter({
        // Filtering should be case sensitive.
        'caseSensitive': false,

        // The filter box will be cleared when the user presses the Escape key.
        'clearInputOnEscape': true,

        // If true, disable any regex the user enters into the search box.
        'disableRegex': true,

        // The class to apply to the filter bar.
        'filterClass': 'filter-bar',

        // The placeholder text for the filter bar.
        'inputPlaceholder': 'type to filter list',

        // The minimum number of characters at which to begin the filtering process.
        'minimumCharacters': 3,

        // The minimum size attribute (number of rows) for the element this plugin is called upon.
        // If the element is less than this size, its size will be updated accordingly.
        'minimumSelectElementSize': 3,

        // Amount of time to delay filtering (in ms) after a key is pressed.
        'searchDelay': 200,

        // Begin searching (strictly) from the beginning of each <option> of the calling element.
        'searchFromBeginning': false,

        // The width for the select element and its input filter box.
        // If -1, both the select element and its filter box have their size set to the width of
        // the select element before any filtering occurs.
        'width': -1
    });


## Release History
* 2013-01-14 -- 0.0.1 -- Initial verison.


## License
* [GNU GPL](http://www.gnu.org/licenses/gpl.html)


## Authors
* [Kevin Richardson](http://github.com/kfr2)
