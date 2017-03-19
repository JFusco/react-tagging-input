'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import Tags from '../../src/component/js/Tags';

class App extends Component {
	state = {
		tags: this.props.tags
	};

	constructor(props){
		super(props);
	}

	onTagAdded(tag) {
		this.setState({
			tags: [...this.state.tags, tag]
		});
	}

	onTagRemoved(tag, index) {
		this.setState({
			tags: this.state.tags.filter((tag, i) => i !== index)
		});
	}

	render () {
		return (
			<div>
				<Tags
					{...this.props}
					{...this.state}
					onAdded={::this.onTagAdded}
					onRemoved={::this.onTagRemoved} />
			</div>
		);
	}
}

export default App;
