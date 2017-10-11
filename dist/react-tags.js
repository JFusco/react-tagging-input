!function(root, factory) {
    "object" == typeof exports && "object" == typeof module ? module.exports = factory(require("react")) : "function" == typeof define && define.amd ? define([ "react" ], factory) : "object" == typeof exports ? exports.Tags = factory(require("react")) : root.Tags = factory(root.React);
}(this, function(__WEBPACK_EXTERNAL_MODULE_0__) {
    return function(modules) {
        function __webpack_require__(moduleId) {
            if (installedModules[moduleId]) return installedModules[moduleId].exports;
            var module = installedModules[moduleId] = {
                i: moduleId,
                l: !1,
                exports: {}
            };
            return modules[moduleId].call(module.exports, module, module.exports, __webpack_require__), 
            module.l = !0, module.exports;
        }
        var installedModules = {};
        return __webpack_require__.m = modules, __webpack_require__.c = installedModules, 
        __webpack_require__.d = function(exports, name, getter) {
            __webpack_require__.o(exports, name) || Object.defineProperty(exports, name, {
                configurable: !1,
                enumerable: !0,
                get: getter
            });
        }, __webpack_require__.n = function(module) {
            var getter = module && module.__esModule ? function() {
                return module.default;
            } : function() {
                return module;
            };
            return __webpack_require__.d(getter, "a", getter), getter;
        }, __webpack_require__.o = function(object, property) {
            return Object.prototype.hasOwnProperty.call(object, property);
        }, __webpack_require__.p = "/", __webpack_require__(__webpack_require__.s = 1);
    }([ function(module, exports) {
        eval('module.exports = __WEBPACK_EXTERNAL_MODULE_0__;\n\n//////////////////\n// WEBPACK FOOTER\n// external {"root":"React","commonjs2":"react","commonjs":"react","amd":"react"}\n// module id = 0\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%7B%22root%22:%22React%22,%22commonjs2%22:%22react%22,%22commonjs%22:%22react%22,%22amd%22:%22react%22%7D?');
    }, function(module, exports, __webpack_require__) {
        "use strict";
        eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _react = __webpack_require__(0);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _Tag = __webpack_require__(2);\n\nvar _Tag2 = _interopRequireDefault(_Tag);\n\n__webpack_require__(3);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }\n\nvar Tags = function Tags(_ref) {\n  var tags = _ref.tags,\n      _ref$maxTags = _ref.maxTags,\n      maxTags = _ref$maxTags === undefined ? -1 : _ref$maxTags,\n      _ref$placeholder = _ref.placeholder,\n      placeholder = _ref$placeholder === undefined ? 'Add a tag' : _ref$placeholder,\n      _ref$deleteOnKeyPress = _ref.deleteOnKeyPress,\n      deleteOnKeyPress = _ref$deleteOnKeyPress === undefined ? true : _ref$deleteOnKeyPress,\n      _ref$addKeys = _ref.addKeys,\n      addKeys = _ref$addKeys === undefined ? [Tags.KEYS.enter, Tags.KEYS.tab, Tags.KEYS.spacebar] : _ref$addKeys,\n      _ref$uniqueTags = _ref.uniqueTags,\n      uniqueTags = _ref$uniqueTags === undefined ? false : _ref$uniqueTags,\n      _ref$readOnly = _ref.readOnly,\n      readOnly = _ref$readOnly === undefined ? false : _ref$readOnly,\n      props = _objectWithoutProperties(_ref, ['tags', 'maxTags', 'placeholder', 'deleteOnKeyPress', 'addKeys', 'uniqueTags', 'readOnly']);\n\n  var input = void 0;\n\n  var addTag = function addTag() {\n    var onAdded = props.onAdded;\n\n\n    if (maxTags > 0) {\n      if (tags.length >= maxTags) return;\n    }\n\n    if (input) {\n      var value = input.value.trim();\n\n      if (uniqueTags) {\n        if (tags.indexOf(value) >= 0) return;\n      }\n\n      if (typeof onAdded !== 'undefined') {\n        onAdded(value);\n      }\n\n      input.value = '';\n    }\n  };\n\n  var removeTag = function removeTag(index) {\n    var onRemoved = props.onRemoved;\n\n    var value = tags[index];\n\n    if (typeof onRemoved !== 'undefined') {\n      onRemoved(value, index);\n    }\n  };\n\n  var onInputKey = function onInputKey(e) {\n    switch (e.keyCode) {\n      case Tags.KEYS.backspace:\n        var length = tags.length;\n\n\n        if (length === 0 || !deleteOnKeyPress) return;\n\n        if (input.value === '') {\n          removeTag(length - 1);\n        }\n\n        break;\n\n      default:\n        if (input.value === '') return;\n\n        if (addKeys.indexOf(e.keyCode) !== -1) {\n          if (Tags.KEYS.enter !== e.keyCode) {\n            e.preventDefault();\n          }\n\n          addTag();\n        }\n\n        break;\n    }\n  };\n\n  var onInputChange = function onInputChange(e) {\n    var value = e.target.value.trim();\n\n    if (typeof props.onInputChange !== 'undefined') {\n      props.onInputChange(value);\n    }\n  };\n\n  var removeTagIcon = props.removeTagIcon,\n      id = props.id;\n\n  //-- Render tags\n\n  var tagItems = tags.map(function (tag, v) {\n    return _react2.default.createElement(_Tag2.default, {\n      key: v,\n      name: tag,\n      readOnly: readOnly,\n      removeTagIcon: removeTagIcon,\n      onRemoveTag: removeTag.bind(undefined, v) });\n  });\n\n  //-- Render the input field\n  var tagInput = !readOnly ? _react2.default.createElement('input', {\n    type: 'text',\n    role: 'textbox',\n    autoComplete: 'off',\n    'aria-label': placeholder,\n    placeholder: placeholder,\n    onChange: onInputChange,\n    onKeyDown: onInputKey,\n    ref: function ref(el) {\n      return input = el;\n    } }) : null;\n\n  var classNames = readOnly ? 'react-tags__container react-tags__container_readonly' : 'react-tags__container';\n\n  return _react2.default.createElement(\n    'div',\n    { className: 'react-tags', id: id },\n    _react2.default.createElement(\n      'ul',\n      { className: classNames },\n      tagItems\n    ),\n    tagInput\n  );\n};\n\n//-- Keyboard key map\nTags.KEYS = {\n  enter: 13,\n  tab: 9,\n  spacebar: 32,\n  backspace: 8,\n  left: 37,\n  right: 39\n};\n\nexports.default = Tags;\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/component/js/Tags.js\n// module id = 1\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/component/js/Tags.js?");
    }, function(module, exports, __webpack_require__) {
        "use strict";
        eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _react = __webpack_require__(0);\n\nvar _react2 = _interopRequireDefault(_react);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar Tag = function Tag(props) {\n  var onRemoveClick = function onRemoveClick(e) {\n    e.preventDefault();\n\n    props.onRemoveTag(e);\n  };\n\n  var removeIcon = !props.readOnly ? _react2.default.createElement(\n    'a',\n    { onClick: onRemoveClick },\n    props.removeTagIcon || String.fromCharCode(215)\n  ) : null;\n\n  return _react2.default.createElement(\n    'li',\n    null,\n    props.name,\n    removeIcon\n  );\n};\n\nexports.default = Tag;\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/component/js/Tag.js\n// module id = 2\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/component/js/Tag.js?");
    }, function(module, exports) {
        eval("// removed by extract-text-webpack-plugin\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/component/scss/styles.scss\n// module id = 3\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/component/scss/styles.scss?");
    } ]);
});