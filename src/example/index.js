'use strict';

import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import Tags from '../component/js/Tags';

class App extends Component {
	static defaultProps = {
		tags: ['hello', 'world']
	};

	static propTypes = {
		tags: PropTypes.arrayOf(PropTypes.string)
	};

	onTagsChange(tags){
		console.log(`new tags: ${tags}`);
	}

	render () {
		return (
			<div>

				{/* Component */}
				<Tags
					initialTags={this.props.tags}
					placeholder="Add a tag"
					onChange={::this.onTagsChange} />
			</div>
		);
	}
}

render(<App />, document.getElementById('application'));
