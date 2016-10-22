///<reference path="Engine.ts"/>
/**
 * Created by Evan on 10/18/2016.
 */
var Test = (function () {
    function Test() {
    }
    Test.runTest = function () {
        new Engine().run(Test.text);
        //Engine.printVars();
    };
    Test.text = "Layout card_img = {\n            \"root\" : \"ImageView\",\n            \"namespaces\" : {\"android\": \"http://schemas.android.com/apk/res/android\", \"app\": \"http://schemas.android.com/tools\"},\n            \"children\" : {},\n            \"android\" : {\"layout_width\": \"match_parent\", \"layout_height\": \"wrap_content\"},\n            \"app\": {\"layout_widthPercent\": \"100%\", \"layout_heightPercent\": \"100%\"}\n         };\n         \n card_img.src = \"hey\";\n card_img.app.new = \"more_hey\";\n card_img.other.stuff = \"my_value\";\n PercentRelativeLayout myNewLayout = {};\n myNewLayout.app.layout_widthPercent = \"100%\";\n myNewLayout.app.layout_heightPercent = \"100%\";\n card_img.addChild(myNewLayout);\n card_img.addChild(myNewLayout);\n myNewLayout.background = \"#FF000000\";\n Layout myCopy = card_img.copy();\n myNewLayout.poop = \"hallloalll\";\n card_img.namespaces.my_new_namespace = \"http://dumburi.lol\";\n Layout newLayout = {};\n newLayout.root = \"Spinner\";\n GenerateIds();\n EditText tempEditText = {};\n EditText tempEditText2 = {};\n tempEditText.setWrapContent();\n tempEditText2.setMatchParent();\n Colorify();\n Project.emitXml(\"card_img\", card_img);\n Project.emitJson(\"card_img\", card_img);\n";
    return Test;
}());
//Test.runTest(); 
//# sourceMappingURL=Test.js.map