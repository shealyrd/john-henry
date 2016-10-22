///<reference path="StringBuilder.ts"/>
///<reference path="Environment.ts"/>
/**
 * Created by Evan on 10/17/2016.
 */

class Layout{
    rootTag: string = "";
    namespaces: [string, string][] = [];
    attributes: [string, string, string][] = [];
    children: Layout[] = [];

    constructor(rootTag: string){
        this.rootTag = rootTag;
    }

    public setRoot(tag: string): void{
        this.rootTag = tag;
    }

    public addNamespace(name: string, uri: string){
        this.namespaces.push([name, uri]);
    }

    public hasAttribute(attr_name: string): number{
        for(var i = 0; i < this.attributes.length; i++){
            if(this.attributes[i][1] == attr_name){
                return i;
            }
        }
        return -1;
    }

    public getAttribute(attr_name: string): string{
        for(var attribute of this.attributes){
            if(attribute[1] == attr_name){
                return attribute[2];
            }
        }
    }

    public addAttribute(namespace: string, attr_name: string, value: string){
        console.log("Adding attribute: " + namespace + ", " + attr_name + ", " + value);
        var hasAttr = this.hasAttribute(attr_name);
        if(hasAttr != -1) {
            this.attributes[hasAttr] = [namespace, attr_name, value];
            return;
        }
        else{
            this.attributes.push([namespace, attr_name, value]);
        }
    }

    public addChild(child: Layout){
        this.children.push(child);
    }

    public emitXML(): string{
        return this.emitXMLIndent(0);
    }

    public emitXMLIndent(tabNum: number): string{
        var builder = new StringBuilder();
        builder.setIdentation(tabNum);
        var rootPrefix: string = "<" + this.rootTag + "\n";
        var rootSuffix: string = "</" + this.rootTag + ">";
        builder.append(rootPrefix);
        for(var xmlns of this.namespaces){
            builder.append("\t" + "xmlns:" + xmlns[0] + "=\"" + xmlns[1] + "\"\n");
        }
        for(var attr of this.attributes){
            builder.append("\t" + attr[0] + ":" + attr[1] + "=\"" + attr[2] + "\"\n");
        }
        if(this.children.length == 0){
            builder.append("/>\n");
        }
        else{
            builder.append(">\n");
            for(var child of this.children){
                builder.append("\n" + child.emitXMLIndent(tabNum + 1));
            }
            builder.append(rootSuffix);
        }
        builder.removeCommentsMode(true);
        return builder.toString();
    }

    public copy(environment: Environment): Layout{
        console.log("Starting copy...");
        //construct json object
        var jsonObj: any = {};
        jsonObj.root = this.rootTag;
        jsonObj.namespaces = {};
        for(var namespace of this.namespaces){
            jsonObj.namespaces[namespace[0]] = namespace[1];
        }
        jsonObj.children = [];
        for(var attribute of this.attributes){
            if(jsonObj[attribute[0]] == null){
                jsonObj[attribute[0]] = {};
            }
            jsonObj[attribute[0]][attribute[1]] = attribute[2];
        }
        var wrappedLayout: Layout = Layout.fromJSON(environment, jsonObj);
        for(var child of this.children){
            wrappedLayout.addChild(child.copy(environment));
        }
        console.log("Wrapped");
        return wrappedLayout;
    }


    public static fromJSON(environment: Environment, json: any): Layout{
        var jsonRoot: string = json.root;
        var result: Layout = new Layout(jsonRoot);
        var jsonNamespaces = json.namespaces;
        for (var key in jsonNamespaces) {
            result.addNamespace(key, jsonNamespaces[key]);
        }
        var jsonChildren = json.children;
        for (var entry in jsonChildren) {
            var child: Layout = environment.getVariable(entry).content;
            result.addChild(child);
        }
        var numObjs: number = Object.keys(json).length;
        console.log("Number of json params: " + numObjs);
        for(var i = 3; i < numObjs; i++){
            var namespace: string = Object.keys(json)[i];
            console.log("Namespace: " + namespace);
            var jsonAttrs = json[namespace];
            console.log("Num attributes: " + Object.keys(jsonAttrs).length);
            for (var key in jsonAttrs) {
                result.addAttribute(namespace, key, jsonAttrs[key]);
            }
        }
        return result;
    }
}