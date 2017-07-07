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
        eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _react = __webpack_require__(0);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _Tag = __webpack_require__(2);\n\nvar _Tag2 = _interopRequireDefault(_Tag);\n\n__webpack_require__(3);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }\n\nvar Tags = function Tags(_ref) {\n\tvar tags = _ref.tags,\n\t    _ref$maxTags = _ref.maxTags,\n\t    maxTags = _ref$maxTags === undefined ? -1 : _ref$maxTags,\n\t    _ref$placeholder = _ref.placeholder,\n\t    placeholder = _ref$placeholder === undefined ? 'Add a tag' : _ref$placeholder,\n\t    _ref$deleteOnKeyPress = _ref.deleteOnKeyPress,\n\t    deleteOnKeyPress = _ref$deleteOnKeyPress === undefined ? true : _ref$deleteOnKeyPress,\n\t    _ref$addKeys = _ref.addKeys,\n\t    addKeys = _ref$addKeys === undefined ? [Tags.KEYS.enter, Tags.KEYS.tab, Tags.KEYS.spacebar] : _ref$addKeys,\n\t    _ref$uniqueTags = _ref.uniqueTags,\n\t    uniqueTags = _ref$uniqueTags === undefined ? false : _ref$uniqueTags,\n\t    _ref$readOnly = _ref.readOnly,\n\t    readOnly = _ref$readOnly === undefined ? false : _ref$readOnly,\n\t    props = _objectWithoutProperties(_ref, ['tags', 'maxTags', 'placeholder', 'deleteOnKeyPress', 'addKeys', 'uniqueTags', 'readOnly']);\n\n\tvar input = void 0;\n\n\tvar addTag = function addTag() {\n\t\tvar onAdded = props.onAdded;\n\n\n\t\tif (maxTags > 0) {\n\t\t\tif (tags.length >= maxTags) return;\n\t\t}\n\n\t\tif (input) {\n\t\t\tvar value = input.value.trim();\n\n\t\t\tif (uniqueTags) {\n\t\t\t\tif (tags.indexOf(value) >= 0) return;\n\t\t\t}\n\n\t\t\tif (typeof onAdded !== 'undefined') {\n\t\t\t\tonAdded(value);\n\t\t\t}\n\n\t\t\tinput.value = '';\n\t\t}\n\t};\n\n\tvar removeTag = function removeTag(index) {\n\t\tvar onRemoved = props.onRemoved;\n\n\t\tvar value = tags[index];\n\n\t\tif (typeof onRemoved !== 'undefined') {\n\t\t\tonRemoved(value, index);\n\t\t}\n\t};\n\n\tvar onInputKey = function onInputKey(e) {\n\t\tswitch (e.keyCode) {\n\t\t\tcase Tags.KEYS.backspace:\n\t\t\t\tif (tags.length === 0 || !deleteOnKeyPress) return;\n\n\t\t\t\tif (input.value === '') {\n\t\t\t\t\tremoveTag(tags.length - 1);\n\t\t\t\t}\n\n\t\t\t\tbreak;\n\n\t\t\tdefault:\n\t\t\t\tif (input.value === '') return;\n\n\t\t\t\tif (addKeys.indexOf(e.keyCode) !== -1) {\n\t\t\t\t\tif (Tags.KEYS.enter !== e.keyCode) {\n\t\t\t\t\t\te.preventDefault();\n\t\t\t\t\t}\n\n\t\t\t\t\taddTag();\n\t\t\t\t}\n\n\t\t\t\tbreak;\n\t\t}\n\t};\n\n\tvar onInputChange = function onInputChange(e) {\n\t\tvar value = e.target.value.trim();\n\n\t\tif (typeof props.onInputChange !== 'undefined') {\n\t\t\tprops.onInputChange(value);\n\t\t}\n\t};\n\n\tvar removeTagIcon = props.removeTagIcon,\n\t    id = props.id;\n\n\t//-- Render tags\n\n\tvar tagItems = tags.map(function (tag, v) {\n\t\treturn _react2.default.createElement(_Tag2.default, {\n\t\t\tkey: v,\n\t\t\tname: tag,\n\t\t\treadOnly: readOnly,\n\t\t\tremoveTagIcon: removeTagIcon,\n\t\t\tonRemoveTag: removeTag.bind(undefined, v) });\n\t});\n\n\t//-- Render the input field\n\tvar tagInput = !readOnly ? _react2.default.createElement('input', {\n\t\ttype: 'text',\n\t\trole: 'textbox',\n\t\tautoComplete: 'off',\n\t\t'aria-label': placeholder,\n\t\tplaceholder: placeholder,\n\t\tonChange: onInputChange,\n\t\tonKeyDown: onInputKey,\n\t\tref: function ref(el) {\n\t\t\treturn input = el;\n\t\t} }) : null;\n\n\tvar classNames = readOnly ? 'react-tags__container react-tags__container_readonly' : 'react-tags__container';\n\n\treturn _react2.default.createElement(\n\t\t'div',\n\t\t{ className: 'react-tags', id: id },\n\t\t_react2.default.createElement(\n\t\t\t'ul',\n\t\t\t{ className: classNames },\n\t\t\ttagItems\n\t\t),\n\t\ttagInput\n\t);\n};\n\n//-- Keyboard key map\nTags.KEYS = {\n\tenter: 13,\n\ttab: 9,\n\tspacebar: 32,\n\tbackspace: 8,\n\tleft: 37,\n\tright: 39\n};\n\nexports.default = Tags;\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/component/js/Tags.js\n// module id = 1\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/component/js/Tags.js?");
    }, function(module, exports, __webpack_require__) {
        "use strict";
        eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _react = __webpack_require__(0);\n\nvar _react2 = _interopRequireDefault(_react);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar Tag = function Tag(props) {\n\tvar onRemoveClick = function onRemoveClick(e) {\n\t\te.preventDefault();\n\n\t\tprops.onRemoveTag(e);\n\t};\n\n\tvar removeIcon = !props.readOnly ? _react2.default.createElement(\n\t\t'a',\n\t\t{ onClick: onRemoveClick },\n\t\tprops.removeTagIcon || String.fromCharCode(215)\n\t) : null;\n\n\treturn _react2.default.createElement(\n\t\t'li',\n\t\tnull,\n\t\tprops.name,\n\t\tremoveIcon\n\t);\n};\n\nexports.default = Tag;\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/component/js/Tag.js\n// module id = 2\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/component/js/Tag.js?");
    }, function(module, exports) {
        eval("// removed by extract-text-webpack-plugin\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/component/scss/styles.scss\n// module id = 3\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/component/scss/styles.scss?");
    } ]);
});