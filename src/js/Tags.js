'use strict';

import React, { Component } from 'react';
import update from 'react-addons-update';
import Tag from './Tag';

class Tags extends Component{
	static KEYS = {
		enter: 13,
		tab: 9,
		spacebar: 32,
		backspace: 8,
		left: 37,
		right: 39
	};

	static propTypes = {
		initialTags: React.PropTypes.arrayOf(React.PropTypes.string),
		onChange: React.PropTypes.func,
		onAdded: React.PropTypes.func,
		onRemoved: React.PropTypes.func,
		onInputChange: React.PropTypes.func,
		maxTags: React.PropTypes.number,
		placeholder: React.PropTypes.string,
		addKeys: React.PropTypes.arrayOf(React.PropTypes.number),
		id: React.PropTypes.string,
		readOnly: React.PropTypes.bool,
		uniqueTags: React.PropTypes.bool,
		removeTagIcon: React.PropTypes.oneOfType([
			React.PropTypes.string,
			React.PropTypes.element
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

	state = {
		tags: this.props.initialTags,
		value: ''
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
			tags: update(this.state.tags, { $push: [value] })
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
			tags: update(this.state.tags, { $splice: [[index, 1]] })
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
				aria-label={placeholder}
				placeholder={placeholder}
				onChange={this.onInputChange.bind(this)}
				onKeyDown={this.onInputKey.bind(this)}
				ref={el => this.input = el} />
		) : null;

		const classNames = readOnly ? 'tags-container readonly' : 'tags-container';

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
