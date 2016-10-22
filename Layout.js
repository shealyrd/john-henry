///<reference path="StringBuilder.ts"/>
///<reference path="Environment.ts"/>
/**
 * Created by Evan on 10/17/2016.
 */
var Layout = (function () {
    function Layout(rootTag) {
        this.rootTag = "";
        this.namespaces = [];
        this.attributes = [];
        this.children = [];
        this.rootTag = rootTag;
    }
    Layout.prototype.setRoot = function (tag) {
        this.rootTag = tag;
    };
    Layout.prototype.addNamespace = function (name, uri) {
        this.namespaces.push([name, uri]);
    };
    Layout.prototype.hasAttribute = function (attr_name) {
        for (var i = 0; i < this.attributes.length; i++) {
            if (this.attributes[i][1] == attr_name) {
                return i;
            }
        }
        return -1;
    };
    Layout.prototype.getAttribute = function (attr_name) {
        for (var _i = 0, _a = this.attributes; _i < _a.length; _i++) {
            var attribute = _a[_i];
            if (attribute[1] == attr_name) {
                return attribute[2];
            }
        }
    };
    Layout.prototype.addAttribute = function (namespace, attr_name, value) {
        console.log("Adding attribute: " + namespace + ", " + attr_name + ", " + value);
        var hasAttr = this.hasAttribute(attr_name);
        if (hasAttr != -1) {
            this.attributes[hasAttr] = [namespace, attr_name, value];
            return;
        }
        else {
            this.attributes.push([namespace, attr_name, value]);
        }
    };
    Layout.prototype.addChild = function (child) {
        this.children.push(child);
    };
    Layout.prototype.emitXML = function () {
        return this.emitXMLIndent(0);
    };
    Layout.prototype.emitXMLIndent = function (tabNum) {
        var builder = new StringBuilder();
        builder.setIdentation(tabNum);
        var rootPrefix = "<" + this.rootTag + "\n";
        var rootSuffix = "</" + this.rootTag + ">";
        builder.append(rootPrefix);
        for (var _i = 0, _a = this.namespaces; _i < _a.length; _i++) {
            var xmlns = _a[_i];
            builder.append("\t" + "xmlns:" + xmlns[0] + "=\"" + xmlns[1] + "\"\n");
        }
        for (var _b = 0, _c = this.attributes; _b < _c.length; _b++) {
            var attr = _c[_b];
            builder.append("\t" + attr[0] + ":" + attr[1] + "=\"" + attr[2] + "\"\n");
        }
        if (this.children.length == 0) {
            builder.append("/>\n");
        }
        else {
            builder.append(">\n");
            for (var _d = 0, _e = this.children; _d < _e.length; _d++) {
                var child = _e[_d];
                builder.append("\n" + child.emitXMLIndent(tabNum + 1));
            }
            builder.append(rootSuffix);
        }
        builder.removeCommentsMode(true);
        return builder.toString();
    };
    Layout.prototype.copy = function (environment) {
        console.log("Starting copy...");
        //construct json object
        var jsonObj = {};
        jsonObj.root = this.rootTag;
        jsonObj.namespaces = {};
        for (var _i = 0, _a = this.namespaces; _i < _a.length; _i++) {
            var namespace = _a[_i];
            jsonObj.namespaces[namespace[0]] = namespace[1];
        }
        jsonObj.children = [];
        for (var _b = 0, _c = this.attributes; _b < _c.length; _b++) {
            var attribute = _c[_b];
            if (jsonObj[attribute[0]] == null) {
                jsonObj[attribute[0]] = {};
            }
            jsonObj[attribute[0]][attribute[1]] = attribute[2];
        }
        var wrappedLayout = Layout.fromJSON(environment, jsonObj);
        for (var _d = 0, _e = this.children; _d < _e.length; _d++) {
            var child = _e[_d];
            wrappedLayout.addChild(child.copy(environment));
        }
        console.log("Wrapped");
        return wrappedLayout;
    };
    Layout.fromJSON = function (environment, json) {
        var jsonRoot = json.root;
        var result = new Layout(jsonRoot);
        var jsonNamespaces = json.namespaces;
        for (var key in jsonNamespaces) {
            result.addNamespace(key, jsonNamespaces[key]);
        }
        var jsonChildren = json.children;
        for (var entry in jsonChildren) {
            var child = environment.getVariable(entry).content;
            result.addChild(child);
        }
        var numObjs = Object.keys(json).length;
        console.log("Number of json params: " + numObjs);
        for (var i = 3; i < numObjs; i++) {
            var namespace = Object.keys(json)[i];
            console.log("Namespace: " + namespace);
            var jsonAttrs = json[namespace];
            console.log("Num attributes: " + Object.keys(jsonAttrs).length);
            for (var key in jsonAttrs) {
                result.addAttribute(namespace, key, jsonAttrs[key]);
            }
        }
        return result;
    };
    return Layout;
}());
//# sourceMappingURL=Layout.js.map