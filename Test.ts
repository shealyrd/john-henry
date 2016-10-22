///<reference path="Engine.ts"/>
/**
 * Created by Evan on 10/18/2016.
 */

class Test{
    static text: string =
        `Layout card_img = {
            "root" : "ImageView",
            "namespaces" : {"android": "http://schemas.android.com/apk/res/android", "app": "http://schemas.android.com/tools"},
            "children" : {},
            "android" : {"layout_width": "match_parent", "layout_height": "wrap_content"},
            "app": {"layout_widthPercent": "100%", "layout_heightPercent": "100%"}
         };
         
 card_img.src = "hey";
 card_img.app.new = "more_hey";
 card_img.other.stuff = "my_value";
 PercentRelativeLayout myNewLayout = {};
 myNewLayout.app.layout_widthPercent = "100%";
 myNewLayout.app.layout_heightPercent = "100%";
 card_img.addChild(myNewLayout);
 card_img.addChild(myNewLayout);
 myNewLayout.background = "#FF000000";
 Layout myCopy = card_img.copy();
 myNewLayout.poop = "hallloalll";
 card_img.namespaces.my_new_namespace = "http://dumburi.lol";
 Layout newLayout = {};
 newLayout.root = "Spinner";
 GenerateIds();
 EditText tempEditText = {};
 EditText tempEditText2 = {};
 tempEditText.setWrapContent();
 tempEditText2.setMatchParent();
 Colorify();
 Project.emitXml("card_img", card_img);
 Project.emitJson("card_img", card_img);
`;

    public static runTest(): void{
        new Engine().run(Test.text);
        //Engine.printVars();
    }

}

//Test.runTest();