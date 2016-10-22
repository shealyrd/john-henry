/**
 * Created by Evan on 10/17/2016.
 */
var Constants = (function () {
    function Constants() {
    }
    Constants.isValidType = function (type) {
        for (var _i = 0, _a = this.VALID_VIEW_TYPES; _i < _a.length; _i++) {
            var entry = _a[_i];
            if (entry == type) {
                return true;
            }
        }
        return false;
    };
    Constants.hasRootFilter = function (type) {
        for (var _i = 0, _a = this.ROOT_FILTERS; _i < _a.length; _i++) {
            var entry = _a[_i];
            if (entry[0] == type) {
                return true;
            }
        }
        return false;
    };
    Constants.getRootFilter = function (type) {
        for (var _i = 0, _a = this.ROOT_FILTERS; _i < _a.length; _i++) {
            var entry = _a[_i];
            if (entry[0] == type) {
                return entry[1];
            }
        }
    };
    Constants.getRootTag = function (type) {
        for (var _i = 0, _a = this.VALID_VIEW_TYPES; _i < _a.length; _i++) {
            var entry = _a[_i];
            if (entry == type) {
                if (Constants.hasRootFilter(type)) {
                    return Constants.getRootFilter(type);
                }
                else {
                    return entry;
                }
            }
        }
    };
    Constants.VALID_VIEW_TYPES = [
        "Layout",
        "ActionMenuView",
        "AutoCompleteTextView",
        "Button",
        "CalendarView",
        "CheckBox",
        "CheckedTextView",
        "Chronometer",
        "DatePicker",
        "DigitalClock",
        "EditText",
        "ExpandableListView",
        "FrameLayout",
        "Gallery",
        "GridLayout",
        "GridView",
        "HorizontalScrollView",
        "ImageButton",
        "ImageSwitcher",
        "ImageView",
        "LinearLayout",
        "ListPopupWindow",
        "ListView",
        "MediaController",
        "MultiAutoCompleteTextView",
        "NumberPicker",
        "OverScroller",
        "PopupMenu",
        "PopupWindow",
        "ProgressBar",
        "QuickContactBadge",
        "RadioButton",
        "RadioGroup",
        "RatingBar",
        "RelativeLayout",
        "RemoteViews",
        "Scroller",
        "ScrollView",
        "SearchView",
        "SeekBar",
        "SlidingDrawer",
        "Space",
        "Spinner",
        "StackView",
        "Switch",
        "TabHost",
        "TableLayout",
        "TableRow",
        "TabWidget",
        "TextClock",
        "TextSwitcher",
        "TextView",
        "TimePicker",
        "Toast",
        "ToggleButton",
        "Toolbar",
        "TwoLineListItem",
        "View",
        "VideoView",
        "ViewAnimator",
        "ViewFlipper",
        "ViewSwitcher",
        "ZoomButton",
        "PercentRelativeLayout"
    ];
    Constants.ROOT_FILTERS = [
        ["PercentRelativeLayout", "android.support.percent.PercentRelativeLayout"],
        ["Layout", ""]
    ];
    Constants.LAYOUT_METHODS = [
        "addChild",
        "setMatchParent",
        "setWrapContent"
    ];
    Constants.INDEPENDENT_METHODS = [
        "GenerateIds",
        "Colorify"
    ];
    return Constants;
}());
//# sourceMappingURL=Constants.js.map