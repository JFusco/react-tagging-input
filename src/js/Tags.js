'use strict';

import React, { Component, PropTypes } from 'react';
import Tag from './Tag';

class Tags extends Component {
	state = {
		tags: this.props.initialTags,
		value: ''
	};

	static KEYS = {
		enter: 13,
		tab: 9,
		spacebar: 32,
		backspace: 8,
		left: 37,
		right: 39
	};

	static propTypes = {
		initialTags: PropTypes.arrayOf(PropTypes.string),
		onChange: PropTypes.func,
		onAdded: PropTypes.func,
		onRemoved: PropTypes.func,
		onInputChange: PropTypes.func,
		maxTags: PropTypes.number,
		placeholder: PropTypes.string,
		addKeys: PropTypes.arrayOf(PropTypes.number),
		id: PropTypes.string,
		readOnly: PropTypes.bool,
		uniqueTags: PropTypes.bool,
		removeTagIcon: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.element
		])
	};

	static defaultProps = {
		initialTags: [],
		maxTags: -1,
		placeholder: 'Add a tag',
		addKeys: [Tags.KEYS.enter, Tags.KEYS.tab, Tags.KEYS.spacebar],
		uniqueTags: false,
		readOnly: false
	};

	constructor(props){
		super(props);
	}

	addTag(){
		if (this.props.maxTags >= 0){
			if (this.state.tags.length >= this.props.maxTags) return;
		}

		const { uniqueTags, onChange, onAdded } = this.props;

		const value = this.input.value.trim();

		if (uniqueTags){
			if (this.state.tags.indexOf(value) >= 0) return;
		}

		this.setState({
			tags: [...this.state.tags, value]
		}, () => {
			if (typeof onChange !== 'undefined'){
				onChange(this.state.tags);
			}

			if (typeof onAdded !== 'undefined'){
				onAdded(value);
			}

			this.input.value = '';
		});
	}

	removeTag(index){
		const { onChange, onRemoved } = this.props;
		const value = this.state.tags[index];

		this.setState({
			tags: this.state.tags.filter((_, i) => i !== index)
		}, () => {
			if (typeof onChange !== 'undefined'){
				onChange(this.state.tags);
			}

			if (typeof onRemoved !== 'undefined'){
				onRemoved(value);
			}
		});
	}

	onInputKey(e){
		switch (e.keyCode){
			case Tags.KEYS.backspace:
				if (this.state.tags.length === 0) return;

				if (this.input.value === ''){
					this.removeTag(this.state.tags.length - 1);
				}

				break;

			default:
				if (this.input.value === '') return;

				if (this.props.addKeys.indexOf(e.keyCode) !== -1){
					if (Tags.KEYS.enter !== e.keyCode){
						e.preventDefault();
					}

					this.addTag();
				}

				break;
		}
	}

	onInputChange(e){
		const value = e.target.value.trim();

		if (typeof this.props.onInputChange !== 'undefined'){
			this.props.onInputChange(value);
		}

		this.setState({
			value
		});
	}

	render(){
		const { readOnly, removeTagIcon, placeholder, id } = this.props;

		const tagItems = this.state.tags.map((tag, v) => {
			return <Tag
				key={v}
				name={tag}
				readOnly={readOnly}
				removeTagIcon={removeTagIcon}
				onRemoveTag={this.removeTag.bind(this, v)} />;
		});

		const tagInput = !this.props.readOnly ? (
			<input
				type="text"
				role="textbox"
				autoComplete="off"
				aria-label={placeholder}
				placeholder={placeholder}
				onChange={::this.onInputChange}
				onKeyDown={::this.onInputKey}
				ref={el => this.input = el} />
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
	}
}

export default Tags;
