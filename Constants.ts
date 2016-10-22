/**
 * Created by Evan on 10/17/2016.
 */

class Constants{
    static VALID_VIEW_TYPES: string[] = [
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

   static ROOT_FILTERS: [string, string][] = [
       ["PercentRelativeLayout", "android.support.percent.PercentRelativeLayout"],
       ["Layout", ""]
   ];

    static LAYOUT_METHODS: string[] = [
        "addChild",
        "setMatchParent",
        "setWrapContent"
    ];

    static INDEPENDENT_METHODS: string[] = [
        "GenerateIds",
        "Colorify"
    ];

    public static isValidType(type: string): boolean{
        for(var entry of this.VALID_VIEW_TYPES){
            if(entry == type){
                return true;
            }
        }
        return false;
    }

    public static hasRootFilter(type: string): boolean{
        for(var entry of this.ROOT_FILTERS){
            if(entry[0] == type){
                return true;
            }
        }
        return false;
    }

    public static getRootFilter(type: string): string{
        for(var entry of this.ROOT_FILTERS){
            if(entry[0] == type){
                return entry[1];
            }
        }
    }


    static getRootTag(type: string): string {
        for(var entry of this.VALID_VIEW_TYPES){
            if(entry == type){
                if(Constants.hasRootFilter(type)){
                    return Constants.getRootFilter(type);
                }
                else{
                    return entry;
                }
            }
        }
    }
}