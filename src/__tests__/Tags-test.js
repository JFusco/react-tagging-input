'use strict';

jest.disableAutomock();

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Tags from '../js/Tags';

describe('Tags', () => {
	it('should render', () => {
		const tags = TestUtils.renderIntoDocument(
			<Tags />
		);

		expect(TestUtils.isCompositeComponent(tags)).toBeTruthy();
	});

	it('should build tags from an array passed as prop', () => {
		const tags = TestUtils.renderIntoDocument(
			<Tags initialTags={['hello', 'world']} />
		);

		const renderedDOM = ReactDOM.findDOMNode(tags);
		const tagContainer = renderedDOM.querySelector('.tags-container');

		expect(tagContainer.children.length).toBe(2);
	});

	it('should be read only', () => {
		const tags = TestUtils.renderIntoDocument(
			<Tags
				initialTags={['hello', 'world']}
				readOnly={true} />
		);

		const renderedDOM = ReactDOM.findDOMNode(tags);
		const tagContainer = renderedDOM.querySelector('.tags-container');

		expect(renderedDOM.getElementsByTagName('input').length).toBe(0);
		expect(renderedDOM.getElementsByTagName('div')[0].classList.contains('readonly')).toBeTruthy();
		expect(tagContainer.children[0].getElementsByTagName('a').length).toBe(0);
		expect(tagContainer.children[0].textContent).toContain('hello');
	});

	it('should render custom remove tag icon element', () => {
		const removeContent = <i className="icon-remove"></i>;

		const tags = TestUtils.renderIntoDocument(
			<Tags
				initialTags={['hello', 'world']}
				removeTagIcon={removeContent} />
		);

		const renderedDOM = ReactDOM.findDOMNode(tags);
		const tagContainer = renderedDOM.querySelector('.tags-container');

		expect(tagContainer.children[0].getElementsByTagName('i').length).toBe(1);
		expect(tagContainer.children[0].querySelector('.icon-remove')).not.toBeNull();
	});

	it('should render custom remove tag icon string', () => {
		const removeContent = 'close';

		const tags = TestUtils.renderIntoDocument(
			<Tags
				initialTags={['hello', 'world']}
				removeTagIcon={removeContent} />
		);

		const renderedDOM = ReactDOM.findDOMNode(tags);
		const tagContainer = renderedDOM.querySelector('.tags-container');

		expect(tagContainer.children[0].getElementsByTagName('a')[0].textContent).toContain('close');
	});


	it('should remove a single tag', () => {
		const tags = TestUtils.renderIntoDocument(
			<Tags initialTags={['hello', 'world']} />
		);

		const renderedDOM = ReactDOM.findDOMNode(tags);
		const tagContainer = renderedDOM.querySelector('.tags-container');

		TestUtils.Simulate.click(
			tagContainer.children[0].getElementsByTagName('a')[0]
		);

		expect(tagContainer.children.length).toBe(1);
	});

	it('should add a single tag', () => {
		const tags = TestUtils.renderIntoDocument(
			<Tags initialTags={['hello', 'world']} />
		);

		const renderedDOM = ReactDOM.findDOMNode(tags);
		const tagContainer = renderedDOM.querySelector('.tags-container');
		const input = renderedDOM.getElementsByTagName('input')[0];

		input.value = 'foo';
		TestUtils.Simulate.change(input);
		TestUtils.Simulate.keyUp(input, {key: 'Enter', keyCode: 13, which: 13});

		expect(tagContainer.children.length).toBe(3);
	});

	it('should call event added and return the tag that was just added', () => {
		const onTagAdded = jest.genMockFunction();

		const tags = TestUtils.renderIntoDocument(
			<Tags
				initialTags={['hello', 'world']}
				added={onTagAdded} />
		);

		const renderedDOM = ReactDOM.findDOMNode(tags);
		const input = renderedDOM.getElementsByTagName('input')[0];

		input.value = 'foo';
		TestUtils.Simulate.change(input);
		TestUtils.Simulate.keyUp(input, {key: 'Enter', keyCode: 13, which: 13});

		expect(onTagAdded).toBeCalledWith('foo');
	});

	it('should call event removed and return the tag that was just removed', () => {
		const onTagRemoved = jest.genMockFunction();

		const tags = TestUtils.renderIntoDocument(
			<Tags
				initialTags={['hello', 'world']}
				removed={onTagRemoved} />
		);

		const renderedDOM = ReactDOM.findDOMNode(tags);
		const tagContainer = renderedDOM.querySelector('.tags-container');

		TestUtils.Simulate.click(
			tagContainer.children[0].getElementsByTagName('a')[0]
		);

		expect(onTagRemoved).toBeCalledWith('hello');
	});

	it('should call event change and return the new tags list as an array', () => {
		const onTagsChange = jest.genMockFunction();

		const tags = TestUtils.renderIntoDocument(
			<Tags
				initialTags={['hello', 'world']}
				change={onTagsChange} />
		);

		const renderedDOM = ReactDOM.findDOMNode(tags);
		const input = renderedDOM.getElementsByTagName('input')[0];

		input.value = 'foo';
		TestUtils.Simulate.change(input);
		TestUtils.Simulate.keyUp(input, {key: 'Enter', keyCode: 13, which: 13});

		expect(onTagsChange).toBeCalledWith(['hello', 'world', 'foo']);
	});

	it('should add a placeholder to the input element', () => {
		const tags = TestUtils.renderIntoDocument(
			<Tags placeholder="add a tag" />
		);

		var input = TestUtils.findRenderedDOMComponentWithTag(tags, 'input');

		expect(input.getAttribute('placeholder')).toEqual('add a tag');
	});
});
