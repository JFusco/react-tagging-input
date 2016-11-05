'use strict';

import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import Tags from '../component/js/Tags';

class App extends Component {
	state = {
		tags: []
	};

	static defaultProps = {
		tags: ['hello', 'world']
	};

	static propTypes = {
		tags: PropTypes.arrayOf(PropTypes.string)
	};

	onTagsChange(tags){
		this.setState({
			tags
		});
	}

	render () {
		const removeIcon = <span>--</span>;

		return (
			<div className="container">
				<h1>react-tagging-input</h1>
				<p>Below are a few implementations of the component, for more options and events please see the <a href="https://github.com/JFusco/react-tagging-input/blob/master/README.md#options">README</a> file documentation</p>

				<div className="example">
					<h2>Default tags</h2>
					<p>No properties are required to make this component work.</p>

					{/* Component */}
					<div className="example__component-wrapper">
						<Tags />
					</div>

					<pre>
						{`<Tags />`}
					</pre>
				</div>

				<div className="example">
					<h2>Initial tags</h2>
					<p>Pass in some default tags to the component.</p>

					{/* Component */}
					<div className="example__component-wrapper">
						<Tags initialTags={this.props.tags} />
					</div>

					<pre>
						{`static defaultProps = {
	tags: ['hello', 'world']
};

<Tags initialTags={this.props.tags} />`}
					</pre>
				</div>

				<div className="example">
					<h2>Read only tags</h2>
					<p>Tags cannot be deleted or added.</p>

					{/* Component */}
					<div className="example__component-wrapper">
						<Tags readOnly={true} initialTags={this.props.tags} />
					</div>

					<pre>
						{`<Tags readOnly={true} initialTags={this.props.tags} />`}
					</pre>
				</div>

				<div className="example">
					<h2>Custom delete button</h2>
					<p>Tags are able to have a custom delete element or a string.</p>

					{/* Component */}
					<div className="example__component-wrapper">
						<Tags removeTagIcon="delete" initialTags={this.props.tags} />
					</div>

					{/* Component */}
					<div className="example__component-wrapper">
						<Tags removeTagIcon={removeIcon} initialTags={this.props.tags} />
					</div>

					<pre>
						{`<Tags removeTagIcon="delete" initialTags={this.props.tags} />`}
					</pre>

					<pre>
						{`//-- Custom element
const removeIcon = <span>--</span>;

<Tags removeTagIcon={removeIcon} initialTags={this.props.tags} />`}
					</pre>
				</div>

				<div className="example">
					<h2>Unique tags</h2>
					<p>The same tag can never be added twice.</p>

					{/* Component */}
					<div className="example__component-wrapper">
						<Tags uniqueTags={true} />
					</div>

					<pre>
						{`<Tags uniqueTags={true} />`}
					</pre>
				</div>

				<div className="example">
					<h2>Change event</h2>
					<p>Can listen for change event and pass back the new state of tags.</p>

					{/* Component */}
					<div className="example__component-wrapper">
						<Tags onChange={::this.onTagsChange} />
					</div>

					<pre>
						{`<Tags onChange={::this.onTagsChange} />

tags: ${this.state.tags}`}
					</pre>
				</div>
			</div>
		);
	}
}

render(<App />, document.getElementById('application'));
