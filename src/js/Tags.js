'use strict';

import React, {Component} from 'react';
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
		change: React.PropTypes.func,
		added: React.PropTypes.func,
		removed: React.PropTypes.func,
		placeholder: React.PropTypes.string,
		delimiters: React.PropTypes.arrayOf(React.PropTypes.number),
		id: React.PropTypes.string,
		readOnly: React.PropTypes.bool,
		allowDupes: React.PropTypes.bool,
		removeTagIcon: React.PropTypes.oneOfType([
			React.PropTypes.string,
			React.PropTypes.element
		])
	};

	static defaultProps = {
		initialTags: [],
		placeholder: 'Add a tag',
		delimiters: [Tags.KEYS.enter, Tags.KEYS.tab, Tags.KEYS.spacebar],
		allowDupes: true,
		readOnly: false
	};

	state = {
		tags: this.props.initialTags
	};

	constructor(props){
		super(props);
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

				if (this.props.delimiters.indexOf(e.keyCode) !== -1){
					if (Tags.KEYS.enter !== e.keyCode){
						e.preventDefault();
					}

					this.addTag();
				}

				break;
		}
	}

	addTag(){
		const value = this.input.value.trim();

		if (!this.props.allowDupes){
			if (this.state.tags.indexOf(value) >= 0) return;
		}

		this.setState({
			tags: update(this.state.tags, {$push: [value] })
		}, () => {
			if (typeof this.props.change !== 'undefined'){
				this.props.change(this.state.tags);
			}

			if (typeof this.props.added !== 'undefined'){
				this.props.added(value);
			}

			this.input.value = '';
		});
	}

	removeTag(index){
		const value = this.state.tags[index];

		this.setState({
			tags: update(this.state.tags, {$splice: [[index, 1]] })
		}, () => {
			if (typeof this.props.change !== 'undefined'){
				this.props.change(this.state.tags);
			}

			if (typeof this.props.removed !== 'undefined'){
				this.props.removed(value);
			}
		});
	}

	render(){
		const tagItems = this.state.tags.map((tag, v) => {
			return <Tag
				key={v}
				name={tag}
				readOnly={this.props.readOnly}
				removeTagIcon={this.props.removeTagIcon}
				removeTag={this.removeTag.bind(this, v)} />;
		});

		const tagInput = !this.props.readOnly ? (
			<input
				type="text"
				role="textbox"
				placeholder={this.props.placeholder}
				onKeyDown={this.onInputKey.bind(this)}
				ref={el => this.input = el} />
		) : null;

		const classNames = this.props.readOnly ? 'tags-container readonly' : 'tags-container';

		return (
			<div className="react-tags" id={this.props.id}>
				<ul className={classNames}>
					{tagItems}
				</ul>

				{tagInput}
			</div>
		);
	}
}

export default Tags;
