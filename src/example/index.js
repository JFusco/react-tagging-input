'use strict';

import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import Tags from '../component/js/Tags';

class App extends Component {
	state = {
		tags: [],
		initialTags: ['foo', 'bar'],
		readOnlyTags: ['read', 'only', 'tags'],
		deleteTagsOne: ['delete one', 'delete two'],
		deleteTagsTwo: ['delete one', 'delete two'],
		uniqueTags: ['hello', 'world']
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

	onInitTagAdded(tag) {
		this.setState({
			initialTags: [...this.state.initialTags, tag]
		});
	}

	onInitTagRemoved(tag, index) {
		this.setState({
			initialTags: this.state.initialTags.filter((tag, i) => i !== index)
		});
	}

	onDeleteOneTagAdded(tag) {
		this.setState({
			deleteTagsOne: [...this.state.deleteTagsOne, tag]
		});
	}

	onDeleteOneTagRemoved(tag, index) {
		this.setState({
			deleteTagsOne: this.state.deleteTagsOne.filter((tag, i) => i !== index)
		});
	}

	onDeleteTwoTagAdded(tag) {
		this.setState({
			deleteTagsTwo: [...this.state.deleteTagsTwo, tag]
		});
	}

	onDeleteTwoTagRemoved(tag, index) {
		this.setState({
			deleteTagsTwo: this.state.deleteTagsTwo.filter((tag, i) => i !== index)
		});
	}

	onUniqueAdded(tag) {
		this.setState({
			uniqueTags: [...this.state.uniqueTags, tag]
		});
	}

	onUniqueRemoved(tag, index) {
		this.setState({
			uniqueTags: this.state.uniqueTags.filter((tag, i) => i !== index)
		});
	}

	render () {
		const removeIcon = <span>--</span>;

		return (
			<div className="container">
				<h1>react-tagging-input</h1>
				<p>Below are a few implementations of the component, for more options and events please see the <a href="https://github.com/JFusco/react-tagging-input/blob/master/README.md#options">README</a> file documentation</p>

				<h2>Tests</h2>
				<p>View coverage report <a href="https://jfusco.github.io/react-tagging-input/coverage/lcov-report/index.html">here</a></p>

				<div className="example">
					<h2>Default implementation</h2>

					{/* Component */}
					<div className="example__component-wrapper">
						<Tags
							tags={this.state.tags}
							onAdded={::this.onTagAdded}
							onRemoved={::this.onTagRemoved} />
					</div>

					<pre>
						{`state = {
  tags: []
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

<Tags
  tags={this.state.tags}
  onAdded={this.onTagAdded.bind(this)}
  onRemoved={this.onTagRemoved.bind(this)} />`}
					</pre>
				</div>

				<div className="example">
					<h2>Initial tags</h2>
					<p>Pass in some default tags to the component.</p>

					{/* Component */}
					<div className="example__component-wrapper">
						<Tags
							tags={this.state.initialTags}
							onAdded={::this.onInitTagAdded}
							onRemoved={::this.onInitTagRemoved} />
					</div>

					<pre>
						{`state = {
  tags: ['foo', 'bar']
}

<Tags tags={this.state.tags} />`}
					</pre>
				</div>

				<div className="example">
					<h2>Read only tags</h2>
					<p>Tags cannot be deleted or added.</p>

					{/* Component */}
					<div className="example__component-wrapper">
						<Tags
							readOnly={true}
							tags={this.state.readOnlyTags}
							onAdded={::this.onInitTagAdded}
							onRemoved={::this.onInitTagRemoved} />
					</div>

					<pre>
						{`<Tags readOnly={true} />`}
					</pre>
				</div>

				<div className="example">
					<h2>Custom delete button</h2>
					<p>Tags are able to have a custom delete element or a string.</p>

					{/* Component */}
					<div className="example__component-wrapper">
						<Tags
							removeTagIcon="delete"
							tags={this.state.deleteTagsOne}
							onAdded={::this.onDeleteOneTagAdded}
							onRemoved={::this.onDeleteOneTagRemoved} />
					</div>

					{/* Component */}
					<div className="example__component-wrapper">
						<Tags
							removeTagIcon={removeIcon}
							tags={this.state.deleteTagsTwo}
							onAdded={::this.onDeleteTwoTagAdded}
							onRemoved={::this.onDeleteTwoTagRemoved} />
					</div>

					<pre>
						{`<Tags removeTagIcon="delete" />`}
					</pre>

					<pre>
						{`//-- Custom element
const removeIcon = <span>--</span>;

<Tags removeTagIcon={removeIcon} />`}
					</pre>
				</div>

				<div className="example">
					<h2>Unique tags</h2>
					<p>The same tag can never be added twice.</p>

					{/* Component */}
					<div className="example__component-wrapper">
						<Tags
							uniqueTags={true}
							tags={this.state.uniqueTags}
							onAdded={::this.onUniqueAdded}
							onRemoved={::this.onUniqueRemoved} />
					</div>

					<pre>
						{`<Tags uniqueTags={true} />`}
					</pre>
				</div>
			</div>
		);
	}
}

render(<App />, document.getElementById('application'));
