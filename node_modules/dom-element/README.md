# dom-element

[![Build Status](https://travis-ci.org/crysalead-js/dom-element.svg?branch=master)](https://travis-ci.org/crysalead-js/dom-element)

DOM element manipulation functions.

## API

### attr(element, name, value)

Gets/sets an attribute.

```js
domElement.attr(element, "class", "active"); // Setter
domElement.attr(element, "class"); //Getter
```

### attrNS(element, ns, name, value)

Gets/sets an attribute with a specific namespace.

```js
domElement.attrNS(element, "http://www.w3.org/1999/xlink", "href", "/url"); // Setter
domElement.attrNS(element, "http://www.w3.org/1999/xlink", "href"); //Getter
```

### prop(element, name, value)

Gets/sets an property.

```js
domElement.prop(element, "className", "active"); // Setter
domElement.prop(element, "className"); // Getter
```

### css(element, name, value)

Gets/sets a style.

```js
domElement.css(element, "color", "black"); // Setter
domElement.css(element, "color"); // Getter
```

### css(element, object)

Sets a style using an object as value.

```js
domElement.css(element, {
  color: "black",
  background: "white"
});
```

### data(element, name, value)

Gets/sets some data.

```js
domElement.data(element, "cutom", "hello"); // Setter
domElement.data(element, "cutom"); // Getter
```

### text(element, value)

Gets/sets the text content.

```js
domElement.text(element, "some text"); // Setter
domElement.text(element); // Getter
```

### value(element, value)

Gets/sets the element value.

```js
domElement.value(element, "some data"); // Setter
domElement.value(element); // Getter
```

### hasClass(element, name)

Checks if the element has a class.

```js
domElement.hasClass(element);
```

### addClass(element, name)

Adds a class.

```js
domElement.addClass(element, name);
```

### removeClass(element, name)

Removes a class.

```js
domElement.removeClass(element, name);
```

### toggleClass(element, name)

Toggles a class.

```js
domElement.toggleClass(element, name);
```

### type(element)

Returns the type of an input or the node name of the element if the type is not set.

```js
domElement.type(element);
```

## Acknowledgement

The [component team](https://github.com/component) which provides a lot of solid working bases to plagiarize :-p.
