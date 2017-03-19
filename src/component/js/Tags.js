'use strict';

import React, { PropTypes } from 'react';
import Tag from './Tag';

import '../scss/styles.scss';

const Tags = props => {
	let input = null;

	const addTag = () => {
		const { uniqueTags, onAdded, tags, maxTags } = props;

		if (maxTags > 0){
			if (tags.length >= maxTags) return;
		}

		const value = input.value.trim();

		if (uniqueTags){
			if (tags.indexOf(value) >= 0) return;
		}

		if (typeof onAdded !== 'undefined'){
			onAdded(value);
		}

		input.value = '';
	};

	const removeTag = index => {
		const { onRemoved } = props;
		const value = props.tags[index];

		if (typeof onRemoved !== 'undefined'){
			onRemoved(value, index);
		}
	};

	const onInputKey = e => {
		const { tags } = props;

		switch (e.keyCode){
			case Tags.KEYS.backspace:
				if (tags.length === 0 || !props.deleteOnKeyPress) return;

				if (input.value === ''){
					removeTag(tags.length - 1);
				}

				break;

			default:
				if (input.value === '') return;

				if (props.addKeys.indexOf(e.keyCode) !== -1){
					if (Tags.KEYS.enter !== e.keyCode){
						e.preventDefault();
					}

					addTag();
				}

				break;
		}
	};

	const onInputChange = e => {
		const value = e.target.value.trim();

		if (typeof props.onInputChange !== 'undefined'){
			props.onInputChange(value);
		}
	};

	const { readOnly, removeTagIcon, placeholder, id } = props;

	//-- Render tags
	const tagItems = props.tags.map((tag, v) => {
		return <Tag
			key={v}
			name={tag}
			readOnly={readOnly}
			removeTagIcon={removeTagIcon}
			onRemoveTag={removeTag.bind(this, v)} />;
	});

	//-- Render the input field
	const tagInput = !props.readOnly ? (
		<input
			type="text"
			role="textbox"
			autoComplete="off"
			aria-label={placeholder}
			placeholder={placeholder}
			onChange={onInputChange}
			onKeyDown={onInputKey}
			ref={el => input = el} />
	) : null;

	const classNames = readOnly ? 'react-tags__container react-tags__container_readonly' : 'react-tags__container';

	return (
		<div className="react-tags" id={id}>
			<ul className={classNames}>
				{tagItems}
			</ul>

			{tagInput}
		</div>
	);
};

//-- Keyboard key map
Tags.KEYS = {
	enter: 13,
	tab: 9,
	spacebar: 32,
	backspace: 8,
	left: 37,
	right: 39
};

//-- Property types
Tags.propTypes = {
	tags: PropTypes.arrayOf(PropTypes.string).isRequired,
	onAdded: PropTypes.func,
	onRemoved: PropTypes.func,
	onInputChange: PropTypes.func,
	maxTags: PropTypes.number,
	placeholder: PropTypes.string,
	deleteOnKeyPress: PropTypes.bool,
	addKeys: PropTypes.arrayOf(PropTypes.number),
	id: PropTypes.string,
	readOnly: PropTypes.bool,
	uniqueTags: PropTypes.bool,
	removeTagIcon: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element
	])
};

//-- Default properties
Tags.defaultProps = {
	maxTags: -1,
	placeholder: 'Add a tag',
	deleteOnKeyPress: true,
	addKeys: [Tags.KEYS.enter, Tags.KEYS.tab, Tags.KEYS.spacebar],
	uniqueTags: false,
	readOnly: false
};

export default Tags;
