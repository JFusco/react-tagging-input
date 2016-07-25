'use strict';

import React from 'react';

const Tag = props => {
	const onRemoveClick = e => {
		e.preventDefault();

		props.removeTag();
	};

	const removeIcon = !props.readOnly ? (
		<a onClick={onRemoveClick} href="#">
			{props.removeTagIcon|| String.fromCharCode(215)}
		</a>
	) : null;

	return (
		<li>
			{props.name}
			{removeIcon}
		</li>
	);
};

export default Tag;

Tag.propTypes = {
	name: React.PropTypes.string.isRequired,
	removeTag: React.PropTypes.func,
	selectedTag: React.PropTypes.bool,
	readOnly: React.PropTypes.bool,
	removeTagIcon: React.PropTypes.oneOfType([
		React.PropTypes.string,
		React.PropTypes.element
	])
};
