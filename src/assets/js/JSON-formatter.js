var json = {};
var html = "";
var templateArr = [];

var formatJSON = function (data) {

    var raw = data;
    init();

    try {
        json = JSON.parse(raw);
    } catch (e) {
        json = {};
    }

    if (len(json) == 0) {
        return json;
    }

    if (Array.isArray(json)) {
        processArray(null, json);
    } else {
        processObj(null, json);
    }

    html = templateArr.join("");

    return html;

}

var init = function () {
    json = {};
    html = "";
    templateArr = [];
    level = 0;
}

var processObj = function (key, value) {

    templateArr.push("<li>");

    if (key != null)
        templateArr.push(`<span class="property">${key}</span>`);

    templateArr.push("<span class='toggle'></span>");
    templateArr.push(`<span class="object">`);

    var k = "", val = "";

    templateArr.push("<ul>")

    for (k in value) {

        val = value[k];

        switch (typeof val) {

            case "string": processString(k, val);
                break;
            case "number": processNumber(k, val);
                break;
            case "object":
                if (Array.isArray(val)) {
                    processArray(k, val);
                } else {
                    processObj(k, val);
                }
                break;
        }

    }

    templateArr.push("</ul>");

    templateArr.push('<span class="placeholder">...</span>')
    templateArr.push(`</span>`);
    templateArr.push("</li>");


}

var processArray = function (key, value) {

    templateArr.push("<li>");

    if (key != null)
        templateArr.push(`<span class="property">${key}</span>`);

    templateArr.push("<span class='toggle'></span>");
    templateArr.push(`<span class="array">`);


    var k = "", val = "";

    templateArr.push("<ol>")

    for (k in value) {

        val = value[k];

        switch (typeof val) {

            case "string": processString(null, val);
                break;
            case "number": processNumber(null, val);
                break;
            case "object":
                if (Array.isArray(val)) {
                    processArray(null, val);
                } else {
                    processObj(null, val);
                }
                break;
        }

    }

    templateArr.push("</ol>");


    templateArr.push('<span class="placeholder">...</span>')
    templateArr.push(`</span>`);
    templateArr.push("</li>");

}

var processString = function (key, value) {

    templateArr.push(`<li>`);

    if (key != null)
        templateArr.push(`<span class="property">${key}</span>`);

    templateArr.push(`<span class="string">${value}</span>`);
    templateArr.push(`</li>`);

}

var processNumber = function (key, value) {

    templateArr.push(`<li>`);

    if (key != null)
        templateArr.push(`<span class="property">${key}</span>`);

    templateArr.push(`<span class="number">${value}</span>`);
    templateArr.push(`</li>`);

}

// helper functions

var len = function (json) {
    if (typeof json == "object")
        return Object.keys(json).length;
    else
        return -1;
}

var enableAdditionalJSONFeatures = function () {


    var onToggle = function () {

        if (this.nextElementSibling.children[0].style.display == "" 
            || this.nextElementSibling.children[0].style.display == "inline") {

            this.nextElementSibling.children[0].style.display = "none";
            this.nextElementSibling.children[1].style.display = "inline";

        } else {

            this.nextElementSibling.children[0].style.display = "inline";
            this.nextElementSibling.children[1].style.display = "none";

        }

    }

    var toggles = document.getElementsByClassName("toggle");
    for (var i = 0; i < toggles.length; i++) {

        toggles[i].style.display = "inline";

        toggles[i].removeEventListener("click", onToggle);
        toggles[i].addEventListener("click", onToggle);

    }

}