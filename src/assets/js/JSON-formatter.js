var json = {};
var html = "";
var templateArr = [];

var formatJSON = function (data) {

    var raw = data;

    try {
        json = JSON.parse(raw);
    } catch (e) {
        json = {};
    }

    if (len(json) == 0) {
        return json;
    }

    processObj(null,json);

    console.log(templateArr);

    html = templateArr.join("");

    return html;

}

var processObj = function (key,value) {

    if(key != null){
        templateArr.push("<li>");
        templateArr.push(`<div class="property">${key}</div>`);
        templateArr.push(`<div class="object">`);
    }

    var k = "" ,val = "";

    templateArr.push("<ul>")

    for(k in value){

        val = value[k];

        switch(typeof val){

            case "string": processString(k,val);
                break;
            case "object": processObj(k,val);
                break;
        }

    }

    templateArr.push("</ul>");

    if(key != null){
        templateArr.push(`</div>`);
        templateArr.push("</li>");
    }

}

var processString = function(key,value){

    templateArr.push(`<li>`);
    templateArr.push(`<div class="property">${key}</div>`);
    templateArr.push(`<div class="string">${value}</div>`);
    templateArr.push(`</li>`);

}

// helper functions

var len = function(json){
    if(typeof json == "object")
        return Object.keys(json).length;
    else
        return -1;
}