'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Tag = require('./Tag');

var _Tag2 = _interopRequireDefault(_Tag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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

			var _props = this.props,
			    uniqueTags = _props.uniqueTags,
			    onChange = _props.onChange,
			    onAdded = _props.onAdded;


			var value = this.input.value.trim();

			if (uniqueTags) {
				if (this.state.tags.indexOf(value) >= 0) return;
			}

			this.setState({
				tags: [].concat(_toConsumableArray(this.state.tags), [value])
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

			var _props2 = this.props,
			    onChange = _props2.onChange,
			    onRemoved = _props2.onRemoved;

			var value = this.state.tags[index];

			this.setState({
				tags: this.state.tags.filter(function (_, i) {
					return i !== index;
				})
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

			var _props3 = this.props,
			    readOnly = _props3.readOnly,
			    removeTagIcon = _props3.removeTagIcon,
			    placeholder = _props3.placeholder,
			    id = _props3.id;


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
				autoComplete: 'off',
				'aria-label': placeholder,
				placeholder: placeholder,
				onChange: this.onInputChange.bind(this),
				onKeyDown: this.onInputKey.bind(this),
				ref: function ref(el) {
					return _this4.input = el;
				} }) : null;

			var classNames = readOnly ? 'react-tags__container react-tags__container_readonly' : 'react-tags__container';

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
	initialTags: _react.PropTypes.arrayOf(_react.PropTypes.string),
	onChange: _react.PropTypes.func,
	onAdded: _react.PropTypes.func,
	onRemoved: _react.PropTypes.func,
	onInputChange: _react.PropTypes.func,
	maxTags: _react.PropTypes.number,
	placeholder: _react.PropTypes.string,
	addKeys: _react.PropTypes.arrayOf(_react.PropTypes.number),
	id: _react.PropTypes.string,
	readOnly: _react.PropTypes.bool,
	uniqueTags: _react.PropTypes.bool,
	removeTagIcon: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element])
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