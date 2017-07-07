import React, { Component } from 'react';
import { render } from 'react-dom';
import Tags from './js/Tags';

class App extends Component {
	state = {
		tags: []
	};

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
				{/* Component */}
				<Tags
					tags={this.state.tags}
					placeholder="Add a tag"
					onAdded={::this.onTagAdded}
					onRemoved={::this.onTagRemoved} />
			</div>
		);
	}
}

render(<App />, document.getElementById('application'));
