'use strict';

import React, { PropTypes } from 'react';

const Tag = props => {
	const onRemoveClick = e => {
		e.preventDefault();

		props.onRemoveTag(e);
	};

	const removeIcon = !props.readOnly ? (
		<a onClick={onRemoveClick}>
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
	name: PropTypes.string.isRequired,
	onRemoveTag: PropTypes.func,
	selectedTag: PropTypes.bool,
	readOnly: PropTypes.bool,
	removeTagIcon: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element
	])
};
