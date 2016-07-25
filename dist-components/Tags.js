'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsUpdate = require('react-addons-update');

var _reactAddonsUpdate2 = _interopRequireDefault(_reactAddonsUpdate);

var _Tag = require('./Tag');

var _Tag2 = _interopRequireDefault(_Tag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tags = function (_Component) {
	_inherits(Tags, _Component);

	function Tags(props) {
		_classCallCheck(this, Tags);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Tags).call(this, props));

		_this.state = {
			tags: _this.props.initialTags
		};
		return _this;
	}

	_createClass(Tags, [{
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

					if (this.props.delimiters.indexOf(e.keyCode) !== -1) {
						if (Tags.KEYS.enter !== e.keyCode) {
							e.preventDefault();
						}

						this.addTag();
					}

					break;
			}
		}
	}, {
		key: 'addTag',
		value: function addTag() {
			var _this2 = this;

			var value = this.input.value.trim();

			if (!this.props.allowDupes) {
				if (this.state.tags.indexOf(value) >= 0) return;
			}

			this.setState({
				tags: (0, _reactAddonsUpdate2.default)(this.state.tags, { $push: [value] })
			}, function () {
				if (typeof _this2.props.change !== 'undefined') {
					_this2.props.change(_this2.state.tags);
				}

				if (typeof _this2.props.added !== 'undefined') {
					_this2.props.added(value);
				}

				_this2.input.value = '';
			});
		}
	}, {
		key: 'removeTag',
		value: function removeTag(index) {
			var _this3 = this;

			var value = this.state.tags[index];

			this.setState({
				tags: (0, _reactAddonsUpdate2.default)(this.state.tags, { $splice: [[index, 1]] })
			}, function () {
				if (typeof _this3.props.change !== 'undefined') {
					_this3.props.change(_this3.state.tags);
				}

				if (typeof _this3.props.removed !== 'undefined') {
					_this3.props.removed(value);
				}
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var _this4 = this;

			var tagItems = this.state.tags.map(function (tag, v) {
				return _react2.default.createElement(_Tag2.default, {
					key: v,
					name: tag,
					readOnly: _this4.props.readOnly,
					removeTagIcon: _this4.props.removeTagIcon,
					removeTag: _this4.removeTag.bind(_this4, v) });
			});

			var tagInput = !this.props.readOnly ? _react2.default.createElement('input', {
				type: 'text',
				role: 'textbox',
				placeholder: this.props.placeholder,
				onKeyDown: this.onInputKey.bind(this),
				ref: function ref(el) {
					return _this4.input = el;
				} }) : null;

			var classNames = this.props.readOnly ? 'tags-container readonly' : 'tags-container';

			return _react2.default.createElement(
				'div',
				{ className: 'react-tags', id: this.props.id },
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
	change: _react2.default.PropTypes.func,
	added: _react2.default.PropTypes.func,
	removed: _react2.default.PropTypes.func,
	placeholder: _react2.default.PropTypes.string,
	delimiters: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.number),
	id: _react2.default.PropTypes.string,
	readOnly: _react2.default.PropTypes.bool,
	allowDupes: _react2.default.PropTypes.bool,
	removeTagIcon: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.element])
};
Tags.defaultProps = {
	initialTags: [],
	placeholder: 'Add a tag',
	delimiters: [Tags.KEYS.enter, Tags.KEYS.tab, Tags.KEYS.spacebar],
	allowDupes: true,
	readOnly: false
};
exports.default = Tags;