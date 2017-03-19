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
        __webpack_require__.i = function(value) {
            return value;
        }, __webpack_require__.d = function(exports, name, getter) {
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
        }, __webpack_require__.p = "/", __webpack_require__(__webpack_require__.s = 3);
    }([ function(module, exports) {
        eval('module.exports = __WEBPACK_EXTERNAL_MODULE_0__;\n\n//////////////////\n// WEBPACK FOOTER\n// external {"root":"React","commonjs2":"react","commonjs":"react","amd":"react"}\n// module id = 0\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%7B%22root%22:%22React%22,%22commonjs2%22:%22react%22,%22commonjs%22:%22react%22,%22amd%22:%22react%22%7D?');
    }, function(module, exports, __webpack_require__) {
        "use strict";
        eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _react = __webpack_require__(0);\n\nvar _react2 = _interopRequireDefault(_react);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar Tag = function Tag(props) {\n\tvar onRemoveClick = function onRemoveClick(e) {\n\t\te.preventDefault();\n\n\t\tprops.onRemoveTag(e);\n\t};\n\n\tvar removeIcon = !props.readOnly ? _react2.default.createElement(\n\t\t'a',\n\t\t{ onClick: onRemoveClick },\n\t\tprops.removeTagIcon || String.fromCharCode(215)\n\t) : null;\n\n\treturn _react2.default.createElement(\n\t\t'li',\n\t\tnull,\n\t\tprops.name,\n\t\tremoveIcon\n\t);\n};\n\nexports.default = Tag;\n\n\nTag.propTypes = {\n\tname: _react.PropTypes.string.isRequired,\n\tonRemoveTag: _react.PropTypes.func,\n\treadOnly: _react.PropTypes.bool,\n\tremoveTagIcon: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element])\n};\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/component/js/Tag.js\n// module id = 1\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/component/js/Tag.js?");
    }, function(module, exports) {
        eval("// removed by extract-text-webpack-plugin\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/component/scss/styles.scss\n// module id = 2\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/component/scss/styles.scss?");
    }, function(module, exports, __webpack_require__) {
        "use strict";
        eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _react = __webpack_require__(0);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _Tag = __webpack_require__(1);\n\nvar _Tag2 = _interopRequireDefault(_Tag);\n\n__webpack_require__(2);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar Tags = function Tags(props) {\n\tvar input = null;\n\n\tvar addTag = function addTag() {\n\t\tvar uniqueTags = props.uniqueTags,\n\t\t    onAdded = props.onAdded,\n\t\t    tags = props.tags,\n\t\t    maxTags = props.maxTags;\n\n\n\t\tif (maxTags > 0) {\n\t\t\tif (tags.length >= maxTags) return;\n\t\t}\n\n\t\tvar value = input.value.trim();\n\n\t\tif (uniqueTags) {\n\t\t\tif (tags.indexOf(value) >= 0) return;\n\t\t}\n\n\t\tif (typeof onAdded !== 'undefined') {\n\t\t\tonAdded(value);\n\t\t}\n\n\t\tinput.value = '';\n\t};\n\n\tvar removeTag = function removeTag(index) {\n\t\tvar onRemoved = props.onRemoved;\n\n\t\tvar value = props.tags[index];\n\n\t\tif (typeof onRemoved !== 'undefined') {\n\t\t\tonRemoved(value, index);\n\t\t}\n\t};\n\n\tvar onInputKey = function onInputKey(e) {\n\t\tvar tags = props.tags;\n\n\n\t\tswitch (e.keyCode) {\n\t\t\tcase Tags.KEYS.backspace:\n\t\t\t\tif (tags.length === 0 || !props.deleteOnKeyPress) return;\n\n\t\t\t\tif (input.value === '') {\n\t\t\t\t\tremoveTag(tags.length - 1);\n\t\t\t\t}\n\n\t\t\t\tbreak;\n\n\t\t\tdefault:\n\t\t\t\tif (input.value === '') return;\n\n\t\t\t\tif (props.addKeys.indexOf(e.keyCode) !== -1) {\n\t\t\t\t\tif (Tags.KEYS.enter !== e.keyCode) {\n\t\t\t\t\t\te.preventDefault();\n\t\t\t\t\t}\n\n\t\t\t\t\taddTag();\n\t\t\t\t}\n\n\t\t\t\tbreak;\n\t\t}\n\t};\n\n\tvar onInputChange = function onInputChange(e) {\n\t\tvar value = e.target.value.trim();\n\n\t\tif (typeof props.onInputChange !== 'undefined') {\n\t\t\tprops.onInputChange(value);\n\t\t}\n\t};\n\n\tvar readOnly = props.readOnly,\n\t    removeTagIcon = props.removeTagIcon,\n\t    placeholder = props.placeholder,\n\t    id = props.id;\n\n\t//-- Render tags\n\n\tvar tagItems = props.tags.map(function (tag, v) {\n\t\treturn _react2.default.createElement(_Tag2.default, {\n\t\t\tkey: v,\n\t\t\tname: tag,\n\t\t\treadOnly: readOnly,\n\t\t\tremoveTagIcon: removeTagIcon,\n\t\t\tonRemoveTag: removeTag.bind(undefined, v) });\n\t});\n\n\t//-- Render the input field\n\tvar tagInput = !props.readOnly ? _react2.default.createElement('input', {\n\t\ttype: 'text',\n\t\trole: 'textbox',\n\t\tautoComplete: 'off',\n\t\t'aria-label': placeholder,\n\t\tplaceholder: placeholder,\n\t\tonChange: onInputChange,\n\t\tonKeyDown: onInputKey,\n\t\tref: function ref(el) {\n\t\t\treturn input = el;\n\t\t} }) : null;\n\n\tvar classNames = readOnly ? 'react-tags__container react-tags__container_readonly' : 'react-tags__container';\n\n\treturn _react2.default.createElement(\n\t\t'div',\n\t\t{ className: 'react-tags', id: id },\n\t\t_react2.default.createElement(\n\t\t\t'ul',\n\t\t\t{ className: classNames },\n\t\t\ttagItems\n\t\t),\n\t\ttagInput\n\t);\n};\n\n//-- Keyboard key map\nTags.KEYS = {\n\tenter: 13,\n\ttab: 9,\n\tspacebar: 32,\n\tbackspace: 8,\n\tleft: 37,\n\tright: 39\n};\n\n//-- Property types\nTags.propTypes = {\n\ttags: _react.PropTypes.arrayOf(_react.PropTypes.string).isRequired,\n\tonAdded: _react.PropTypes.func,\n\tonRemoved: _react.PropTypes.func,\n\tonInputChange: _react.PropTypes.func,\n\tmaxTags: _react.PropTypes.number,\n\tplaceholder: _react.PropTypes.string,\n\tdeleteOnKeyPress: _react.PropTypes.bool,\n\taddKeys: _react.PropTypes.arrayOf(_react.PropTypes.number),\n\tid: _react.PropTypes.string,\n\treadOnly: _react.PropTypes.bool,\n\tuniqueTags: _react.PropTypes.bool,\n\tremoveTagIcon: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element])\n};\n\n//-- Default properties\nTags.defaultProps = {\n\tmaxTags: -1,\n\tplaceholder: 'Add a tag',\n\tdeleteOnKeyPress: true,\n\taddKeys: [Tags.KEYS.enter, Tags.KEYS.tab, Tags.KEYS.spacebar],\n\tuniqueTags: false,\n\treadOnly: false\n};\n\nexports.default = Tags;\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/component/js/Tags.js\n// module id = 3\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/component/js/Tags.js?");
    } ]);
});