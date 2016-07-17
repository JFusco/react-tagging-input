'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsUpdate = require('react-addons-update');

var _reactAddonsUpdate2 = _interopRequireDefault(_reactAddonsUpdate);

var _tag = require('./tag');

var _tag2 = _interopRequireDefault(_tag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var map = new WeakMap();

var Tags = function (_Component) {
	_inherits(Tags, _Component);

	function Tags(props) {
		_classCallCheck(this, Tags);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Tags).call(this, props));

		_this.state = {
			tags: _this.props.initialTags
		};

		map.set(_this, {
			empty: true
		});
		return _this;
	}

	_createClass(Tags, [{
		key: 'onInputKey',
		value: function onInputKey(e) {
			if (this.input.value.length !== 0 && this.empty) {
				this.empty = false;
			}

			switch (e.keyCode) {
				case 8:
					if (this.state.tags.length === 0) return;

					if (this.empty) {
						this.removeTag(this.state.tags.length - 1);
					}

					if (this.input.value.length === 0) {
						this.empty = true;
					}
					break;

				case 13:
					this.addTag();
					break;
			}
		}
	}, {
		key: 'addTag',
		value: function addTag() {
			var _this2 = this;

			var value = this.input.value.trim();

			this.setState({
				tags: (0, _reactAddonsUpdate2.default)(this.state.tags, { $push: [value] })
			}, function () {
				if (typeof _this2.props.change !== 'undefined') {
					_this2.props.change(_this2.state.tags);
				}

				if (typeof _this2.props.added !== 'undefined') {
					_this2.props.added(value);
				}

				_this2.empty = true;

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
				return _react2.default.createElement(_tag2.default, {
					key: v,
					readOnly: _this4.props.readOnly,
					name: tag,
					removeTagIcon: _this4.props.removeTagIcon,
					removeTag: _this4.removeTag.bind(_this4, v) });
			});

			var tagInput = !this.props.readOnly ? _react2.default.createElement('input', {
				type: 'text',
				role: 'textbox',
				placeholder: this.props.placeholder,
				onKeyUp: this.onInputKey.bind(this),
				ref: function ref(el) {
					return _this4.input = el;
				} }) : null;

			var classNames = function classNames() {
				var classes = 'tags-container';

				return _this4.props.readOnly ? classes + ' readonly' : classes;
			};

			return _react2.default.createElement(
				'div',
				{ className: 'react-tags', id: this.props.id },
				_react2.default.createElement(
					'div',
					{ className: classNames() },
					tagItems
				),
				tagInput
			);
		}
	}, {
		key: 'empty',
		set: function set(empty) {
			map.set(this, {
				empty: empty
			});
		},
		get: function get() {
			return map.get(this).empty;
		}
	}]);

	return Tags;
}(_react.Component);

exports.default = Tags;


Tags.propTypes = {
	initialTags: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.string),
	change: _react2.default.PropTypes.func,
	added: _react2.default.PropTypes.func,
	removed: _react2.default.PropTypes.func,
	placeholder: _react2.default.PropTypes.string,
	id: _react2.default.PropTypes.string,
	readOnly: _react2.default.PropTypes.bool,
	allowDupes: _react2.default.PropTypes.bool,
	removeTagWithDeleteKey: _react2.default.PropTypes.bool,
	removeTagIcon: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.element])
};

Tags.defaultProps = {
	initialTags: [],
	placeholder: null,
	id: null,
	allowDupes: true,
	readOnly: false,
	removeTagWithDeleteKey: true,
	removeTagIcon: String.fromCharCode(215)
};