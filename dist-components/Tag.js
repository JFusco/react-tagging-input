'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Tag = function Tag(props) {
	var onRemoveClick = function onRemoveClick(e) {
		e.preventDefault();

		props.onRemoveTag(e);
	};

	var removeIcon = !props.readOnly ? _react2.default.createElement(
		'a',
		{ onClick: onRemoveClick, href: '#' },
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