(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"), require("update"));
	else if(typeof define === 'function' && define.amd)
		define(["React", "update"], factory);
	else if(typeof exports === 'object')
		exports["Tags"] = factory(require("React"), require("update"));
	else
		root["Tags"] = factory(root["React"], root["update"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactAddonsUpdate = __webpack_require__(2);

	var _reactAddonsUpdate2 = _interopRequireDefault(_reactAddonsUpdate);

	var _Tag = __webpack_require__(3);

	var _Tag2 = _interopRequireDefault(_Tag);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Tags = function (_Component) {
		_inherits(Tags, _Component);

		function Tags(props) {
			_classCallCheck(this, Tags);

			var _this = _possibleConstructorReturn(this, (Tags.__proto__ || Object.getPrototypeOf(Tags)).call(this, props));

			_this.state = {
				tags: _this.props.initialTags,
				value: ''
			};
			return _this;
		}

		_createClass(Tags, [{
			key: 'addTag',
			value: function addTag() {
				var _this2 = this;

				if (this.props.maxTags >= 0) {
					if (this.state.tags.length >= this.props.maxTags) return;
				}

				var _props = this.props;
				var uniqueTags = _props.uniqueTags;
				var onChange = _props.onChange;
				var onAdded = _props.onAdded;


				var value = this.input.value.trim();

				if (uniqueTags) {
					if (this.state.tags.indexOf(value) >= 0) return;
				}

				this.setState({
					tags: (0, _reactAddonsUpdate2.default)(this.state.tags, { $push: [value] })
				}, function () {
					if (typeof onChange !== 'undefined') {
						onChange(_this2.state.tags);
					}

					if (typeof onAdded !== 'undefined') {
						onAdded(value);
					}

					_this2.input.value = '';
				});
			}
		}, {
			key: 'removeTag',
			value: function removeTag(index) {
				var _this3 = this;

				var _props2 = this.props;
				var onChange = _props2.onChange;
				var onRemoved = _props2.onRemoved;

				var value = this.state.tags[index];

				this.setState({
					tags: (0, _reactAddonsUpdate2.default)(this.state.tags, { $splice: [[index, 1]] })
				}, function () {
					if (typeof onChange !== 'undefined') {
						onChange(_this3.state.tags);
					}

					if (typeof onRemoved !== 'undefined') {
						onRemoved(value);
					}
				});
			}
		}, {
			key: 'onInputKey',
			value: function onInputKey(e) {
				switch (e.keyCode) {
					case Tags.KEYS.backspace:
						if (this.state.tags.length === 0) return;

						if (this.input.value === '') {
							this.removeTag(this.state.tags.length - 1);
						}

						break;

					default:
						if (this.input.value === '') return;

						if (this.props.addKeys.indexOf(e.keyCode) !== -1) {
							if (Tags.KEYS.enter !== e.keyCode) {
								e.preventDefault();
							}

							this.addTag();
						}

						break;
				}
			}
		}, {
			key: 'onInputChange',
			value: function onInputChange(e) {
				var value = e.target.value.trim();

				if (typeof this.props.onInputChange !== 'undefined') {
					this.props.onInputChange(value);
				}

				this.setState({
					value: value
				});
			}
		}, {
			key: 'render',
			value: function render() {
				var _this4 = this;

				var _props3 = this.props;
				var readOnly = _props3.readOnly;
				var removeTagIcon = _props3.removeTagIcon;
				var placeholder = _props3.placeholder;
				var id = _props3.id;


				var tagItems = this.state.tags.map(function (tag, v) {
					return _react2.default.createElement(_Tag2.default, {
						key: v,
						name: tag,
						readOnly: readOnly,
						removeTagIcon: removeTagIcon,
						onRemoveTag: _this4.removeTag.bind(_this4, v) });
				});

				var tagInput = !this.props.readOnly ? _react2.default.createElement('input', {
					type: 'text',
					role: 'textbox',
					'aria-label': placeholder,
					placeholder: placeholder,
					onChange: this.onInputChange.bind(this),
					onKeyDown: this.onInputKey.bind(this),
					ref: function ref(el) {
						return _this4.input = el;
					} }) : null;

				var classNames = readOnly ? 'tags-container readonly' : 'tags-container';

				return _react2.default.createElement(
					'div',
					{ className: 'react-tags', id: id },
					_react2.default.createElement(
						'ul',
						{ className: classNames },
						tagItems
					),
					tagInput
				);
			}
		}]);

		return Tags;
	}(_react.Component);

	Tags.KEYS = {
		enter: 13,
		tab: 9,
		spacebar: 32,
		backspace: 8,
		left: 37,
		right: 39
	};
	Tags.propTypes = {
		initialTags: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.string),
		onChange: _react2.default.PropTypes.func,
		onAdded: _react2.default.PropTypes.func,
		onRemoved: _react2.default.PropTypes.func,
		onInputChange: _react2.default.PropTypes.func,
		maxTags: _react2.default.PropTypes.number,
		placeholder: _react2.default.PropTypes.string,
		addKeys: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.number),
		id: _react2.default.PropTypes.string,
		readOnly: _react2.default.PropTypes.bool,
		uniqueTags: _react2.default.PropTypes.bool,
		removeTagIcon: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.element])
	};
	Tags.defaultProps = {
		initialTags: [],
		maxTags: -1,
		placeholder: 'Add a tag',
		addKeys: [Tags.KEYS.enter, Tags.KEYS.tab, Tags.KEYS.spacebar],
		uniqueTags: false,
		readOnly: false
	};
	exports.default = Tags;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Tag = function Tag(props) {
		var onRemoveClick = function onRemoveClick(e) {
			e.preventDefault();

			props.onRemoveTag(e);
		};

		var removeIcon = !props.readOnly ? _react2.default.createElement(
			'a',
			{ onClick: onRemoveClick },
			props.removeTagIcon || String.fromCharCode(215)
		) : null;

		return _react2.default.createElement(
			'li',
			null,
			props.name,
			removeIcon
		);
	};

	exports.default = Tag;


	Tag.propTypes = {
		name: _react2.default.PropTypes.string.isRequired,
		onRemoveTag: _react2.default.PropTypes.func,
		selectedTag: _react2.default.PropTypes.bool,
		readOnly: _react2.default.PropTypes.bool,
		removeTagIcon: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.element])
	};

/***/ }
/******/ ])
});
;