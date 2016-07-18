'use strict';

import React, {Component} from 'react';
import update from 'react-addons-update';
import tag from './tag';

const map = new WeakMap();

export default class Tags extends Component{
	constructor(props){
		super(props);

		this.state = {
			tags: this.props.initialTags
		};

		map.set(this, {
			empty: true
		});
	}

	onInputKey(e){
		if (this.input.value.length !== 0 && this.empty){
			this.empty = false;
		}

		switch (e.keyCode){
			case 8:
				if (this.state.tags.length === 0) return;

				if (this.empty){
					this.removeTag(this.state.tags.length - 1);
				}

				if (this.input.value.length === 0){
					this.empty = true;
				}
				break;

			case 13:
				this.addTag();
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

			this.empty = true;

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

	set empty(empty){
		map.set(this, {
			empty
		});
	}

	get empty(){
		return map.get(this).empty;
	}

	render(){
		const tagItems = this.state.tags.map((tag, v) => {
			return <tag
				key={v}
				readOnly={this.props.readOnly}
				name={tag}
				removeTagIcon={this.props.removeTagIcon}
				removeTag={this.removeTag.bind(this, v)} />;
		});

		const tagInput = !this.props.readOnly ? <input
			type="text"
			role="textbox"
			placeholder={this.props.placeholder}
			onKeyUp={this.onInputKey.bind(this)}
			ref={el => this.input = el} /> : null;

		const classNames = this.props.readOnly ? 'tags-container readonly' : 'tags-container';

		return (
			<div className="react-tags" id={this.props.id}>
				<div className={classNames}>
					{tagItems}
				</div>

				{tagInput}
			</div>
		);
	}
}

Tags.propTypes = {
	initialTags: React.PropTypes.arrayOf(React.PropTypes.string),
	change: React.PropTypes.func,
	added: React.PropTypes.func,
	removed: React.PropTypes.func,
	placeholder: React.PropTypes.string,
	id: React.PropTypes.string,
	readOnly: React.PropTypes.bool,
	allowDupes: React.PropTypes.bool,
	removeTagWithDeleteKey: React.PropTypes.bool,
	removeTagIcon: React.PropTypes.oneOfType([
		React.PropTypes.string,
		React.PropTypes.element
	])
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
