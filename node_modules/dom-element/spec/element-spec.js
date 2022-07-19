var jsdom = require("jsdom");
var domify = require("component-domify");

global.document = jsdom.jsdom();
global.window = global.document.parentWindow;

var domElement = require("..");

global.self = global.window;
require("classlist-polyfill");

describe(".attr()", function() {

  it("sets/gets a value", function() {

    var link = domify("<a></a>");
    domElement.attr(link, "href", "/url");

    expect(link.getAttribute("href")).toBe("/url");
    expect(domElement.attr(link, "href")).toBe("/url");

  });

  it("removes an attribute using `undefined` as value", function() {

    var link = domify('<a href="/url"></a>');
    expect(domElement.attr(link, "href")).toBe("/url");

    domElement.attr(link, "href", undefined);
    expect(link.getAttribute("href")).toBeFalsy();

  });

  it("removes an attribute using `null` as value", function() {

    var link = domify('<a href="/url"></a>');
    expect(domElement.attr(link, "href")).toBe("/url");

    domElement.attr(link, "href", null);
    expect(link.getAttribute("href")).toBeFalsy();

  });

});

describe(".attrNS()", function() {

  it("sets/gets a value", function() {

    var ns = "http://www.w3.org/1999/xlink";
    var xlink = domify("<img></img>");
    domElement.attrNS(xlink, ns, "href", "/url");

    expect(xlink.getAttributeNS(ns, "href")).toBe("/url");
    expect(domElement.attrNS(xlink, ns, "href")).toBe("/url");

  });

  it("removes an attribute using `undefined` as value", function() {

    var ns = "http://www.w3.org/1999/xlink";
    var xlink = domify("<img></img>");
    xlink.setAttributeNS(ns, "href", "/url");

    expect(domElement.attrNS(xlink, ns, "href")).toBe("/url");

    domElement.attrNS(xlink, ns, "href", undefined);
    expect(xlink.getAttributeNS(ns, "href")).toBeFalsy();

  });

  it("removes an attribute using `null` as value", function() {

    var ns = "http://www.w3.org/1999/xlink";
    var xlink = domify("<img></img>");
    xlink.setAttributeNS(ns, "href", "/url");

    expect(domElement.attrNS(xlink, ns, "href")).toBe("/url");

    domElement.attrNS(xlink, ns, "href", null);
    expect(xlink.getAttributeNS(ns, "href")).toBeFalsy();

  });

});

describe(".prop()", function() {

  it("sets/gets a value", function() {

    var checkbox = domify('<input type="checkbox" checked="checked">');
    expect(checkbox.checked).toBe(true);

    expect(domElement.prop(checkbox, "checked", true)).toBe(true);

    expect(checkbox.checked).toBe(true);
    expect(domElement.prop(checkbox, "checked")).toBe(true);

  });

});

describe(".css()", function() {

  it("sets/gets a value", function() {

    var span = domify('<span>Hello World</span>');

    expect(domElement.css(span, "display", "none")).toBe("none");

    expect(span.style.display).toBe("none");
    expect(domElement.css(span, "display")).toBe("none");

  });

  it("removes a value", function() {

    var span = domify('<span>Hello World</span>');

    expect(domElement.css(span, "display", "none")).toBe("none");
    domElement.css(span, "display", null);
    expect(domElement.css(span, "display")).toBeFalsy();

    expect(domElement.css(span, "display", "none")).toBe("none");
    domElement.css(span, "display", undefined);
    expect(domElement.css(span, "display")).toBeFalsy();

  });

  describe("with an object as value", function() {

    it("sets/gets a value", function() {

      var span = domify('<span>Hello World</span>');

      expect(domElement.css(span, { display: "none" })).toEqual({ display: "none" });

      expect(span.style.display).toBe("none");
      expect(domElement.css(span, "display")).toBe("none");

    });

  });

});

describe(".type()", function() {

  it('returns the DOM element type', function() {

    expect(domElement.type(document.createElement("div"))).toBe("div");
    expect(domElement.type(domify('<input type="checkbox">'))).toBe("checkbox");
    expect(domElement.type(domify('<input type="radio">'))).toBe("radio");
    expect(domElement.type(domify('<input type="text">'))).toBe("text");
    expect(domElement.type(domify('<input>'))).toBe("text");
    expect(domElement.type(domify('<select></select>'))).toBe("select");
    expect(domElement.type(domify('<select multiple="multiple"></select>'))).toBe("select-multiple");
    expect(domElement.type(domify('<textarea>'))).toBe("textarea");

  });

});

describe(".addClass()", function() {

  it('adds the given class name', function() {

    var span = domify('<span class="foo">Hello World</span>');

    expect(span.className).toBe("foo");
    expect(domElement.addClass(span, "bar"));
    expect(span.className).toBe("foo bar");

    expect(domElement.hasClass(span, "foo")).toBe(true);
    expect(domElement.hasClass(span, "bar")).toBe(true);

  });

});

describe('.removeClass()', function() {

  it('removes the given class name', function() {

    var span = domify('<span class="foo bar">Hello World</span>');

    expect(domElement.removeClass(span, "foo"));
    expect(span.className).toBe("bar");
    expect(domElement.hasClass(span, "foo")).toBe(false);
    expect(domElement.hasClass(span, "bar")).toBe(true);
  });

});

describe('.toggleClass()', function() {

  it('toggles a given class name', function() {

    var span = domify('<span class="foo">Hello World</span>');

    expect(domElement.toggleClass(span, "foo"));
    expect(domElement.hasClass(span, "foo")).toBe(false);
    expect(domElement.toggleClass(span, "foo"));
    expect(domElement.hasClass(span, "foo")).toBe(true);

  });

});

describe(".data()", function() {

  it("sets/gets a value", function() {

    var div = domify("<div></div>");

    expect(domElement.data(div, "title", "Hello World")).toBe("Hello World");

    expect(domElement.data(div, "title")).toBe("Hello World");

  });

});

describe(".text()", function() {

  it("sets/gets a value", function() {

    var span = domify("<span>Hello</span>");

    expect(domElement.text(span)).toBe("Hello");

    expect(domElement.text(span, "Hello World")).toBe("Hello World");

    expect(domElement.text(span)).toBe("Hello World");

  });

});

describe(".value()", function() {

  describe("using text inputs", function() {

    it("gets/sets a value", function() {

      var input = domify('<input type="text">');

      expect(domElement.value(input)).toBeFalsy();
      expect(domElement.value(input, "Hello World")).toBe("Hello World");
      expect(domElement.value(input)).toBe("Hello World");

    });

  });

  describe("using textareas", function() {

    it("gets/sets a value", function() {

      var input = domify("<textarea></textarea>");

      expect(domElement.value(input)).toBeFalsy();
      expect(domElement.value(input, "Hello World")).toBe("Hello World");
      expect(domElement.value(input)).toBe("Hello World");

    });

  });

  describe("checkboxes", function() {

    it("gets/sets a boolean value", function() {

      var input = domify('<input type="checkbox">');

      expect(domElement.value(input)).toBe(false);
      expect(domElement.value(input, true)).toBe(true);
      expect(domElement.value(input)).toBe(true);
      expect(input.checked).toBe(true);

    });

    it("gets/sets a value", function() {

      var input = domify('<input type="checkbox" value="hello">');

      expect(domElement.value(input)).toBe(false);
      expect(domElement.value(input, true)).toBe(true);
      expect(domElement.value(input)).toBe("hello");
      expect(input.checked).toBe(true);

    });

    it("unsets checkboxes", function() {

      var input = domify('<input type="checkbox" checked="checked">');

      expect(domElement.value(input)).toBe(true);
      expect(domElement.value(input, false)).toBe(false);
      expect(domElement.value(input)).toBe(false);
      expect(input.checked).toBe(false);

    });

  });

  describe("radios", function() {

    it("gets/sets a boolean value", function() {

      var input = domify('<input type="radio">');

      expect(domElement.value(input)).toBe(false);
      expect(domElement.value(input, true)).toBe(true);
      expect(domElement.value(input)).toBe(true);
      expect(input.checked).toBe(true);

    });

    it("gets/sets a value", function() {

      var input = domify('<input type="radio" value="hello">');

      expect(domElement.value(input)).toBe(false);
      expect(domElement.value(input, true)).toBe(true);
      expect(domElement.value(input)).toBe("hello");
      expect(input.checked).toBe(true);

    });

    it("unsets radios", function() {

      var input = domify('<input type="radio" checked="checked">');

      expect(domElement.value(input)).toBe(true);
      expect(domElement.value(input, false)).toBe(false);
      expect(domElement.value(input)).toBe(false);
      expect(input.checked).toBe(false);

    });

  });

  describe("selects", function() {

    describe("with a simple select", function() {

      it("returns the first option value by default", function() {

        var select = domify('<select><option value="a"></option><option value="b"></option></select>');
        expect(domElement.value(select)).toBe("a");

      });

      it("returns the first the selected value", function() {

        var select = domify('<select><option value="a"></option><option value="b" selected="selected"></option></select>');
        expect(domElement.value(select)).toBe("b");

      });

      it('gets/sets an option', function() {

        var select = domify('<select><option value="a"></option><option value="b"></option></select>');

        expect(domElement.value(select)).toBe("a");
        expect(domElement.value(select, "a")).toBe("a");
        expect(domElement.value(select)).toBe("a");
        expect(select.options[0].selected).toBe(true);

      });

    });

    describe("with multiple select", function() {

      it("returns the first option value by default", function() {

        var select = domify('<select multiple="multiple"><option value="a"></option><option value="b"></option></select>');
        expect(domElement.value(select)).toEqual([]);

      });

      it("returns the first the selected value", function() {

        var select = domify('<select multiple="multiple"><option value="a"></option><option value="b" selected="selected"></option></select>');
        expect(domElement.value(select)).toEqual(["b"]);

      });

      it('gets/sets some options', function() {

        var select = domify('<select multiple="multiple"><option value="a"></option><option value="b"></option></select>');

        expect(domElement.value(select)).toEqual([]);
        expect(domElement.value(select, "a")).toEqual(["a"]);
        expect(domElement.value(select)).toEqual(["a"]);

        expect(domElement.value(select, "b")).toEqual(["b"]);
        expect(domElement.value(select)).toEqual(["b"]);

        expect(domElement.value(select, ["a", "b"])).toEqual(["a", "b"]);
        expect(domElement.value(select)).toEqual(["a", "b"]);

      });

    });

  });

});
