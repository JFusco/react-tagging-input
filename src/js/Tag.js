'use strict';

import React from 'react';

const Tag = props => {
	const onRemoveClick = e => {
		e.preventDefault();

		props.removeTag();
	};

	const removeIcon = () => {
		if (props.readOnly) return null;

		return (
			<a onClick={onRemoveClick} href="#">
				{props.removeTagIcon}
			</a>
		);
	};

	return (
		<span>
			{/* Tag name */}
			{props.name}
			{/* Tag remove icon */}
			{removeIcon()}
		</span>
	);
};

export default Tag;

Tag.propTypes = {
	name: React.PropTypes.string.isRequired,
	removeTag: React.PropTypes.func,
	readOnly: React.PropTypes.bool,
	removeTagIcon: React.PropTypes.oneOfType([
		React.PropTypes.string,
		React.PropTypes.element
	])
};
