'use strict';

import React from 'react';
import { findDOMNode } from 'react-dom';
import { createRenderer, Simulate, renderIntoDocument } from 'react-addons-test-utils';
import Tags from '../src/component/js/Tags';

const TEST_TAGS = [
	'foo',
	'bar'
];

describe('Tags', () => {
	let renderer,
		tags;

	beforeEach(() => {
		renderer = createRenderer();

		renderer.render(
			<Tags
				id="test-tags"
				placeholder="Custom placeholder text"
				initialTags={TEST_TAGS} />
		);

		tags = renderer.getRenderOutput();
	});

	it('should render', () => {
		expect(tags).not.toBeUndefined();
		expect(tags.type).toBe('div');
	});

	it('should check ID of tags component', () => {
		expect(tags.type).toEqual('div');
		expect(tags.props.id).toEqual('test-tags');
	});

	it('should render custom placeholder if provided', () => {
		const input = tags.props.children[1];

		expect(input.type).toBe('input');
		expect(input.props.placeholder).toBe('Custom placeholder text');
	});

	it('should set aria-label', () => {
		const input = tags.props.children[1];

		expect(input.props['aria-label']).toBe('Custom placeholder text');
	});
});

describe('Tags - "initialTags"', () => {
	it('should render tags (shallow render)', () => {
		const renderer = createRenderer();

		const renderList = () => {
			renderer.render(
				<Tags
					initialTags={TEST_TAGS} />
			);

			const list = renderer.getRenderOutput();
			return list.props.children.filter(component => component.type == 'ul');
		};

		const items = renderList();

		expect(items[0].props.children.length).toBe(TEST_TAGS.length);
	});

	it('should render tags (DOM render)', () => {
		const tags = renderIntoDocument(
			<Tags
				initialTags={TEST_TAGS} />
		);

		const renderedDOM = findDOMNode(tags);
		const tagContainer = renderedDOM.querySelector('.react-tags__container');

		expect(tagContainer.children.length).toBe(TEST_TAGS.length);
	});
});

describe('Tags - "readOnly"', () => {
	let renderer;

	beforeEach(() => {
		renderer = createRenderer();

		renderer.render(
			<Tags
				initialTags={TEST_TAGS}
				readOnly={true} />
		);
	});

	it('should only render the tags container, not the input', () => {
		const list = renderer.getRenderOutput();
		const items = list.props.children;

		expect(items.length).toBe(2);
		expect(items[0].type).toBe('ul');
		expect(items[1]).toBeNull();
	});

	it('should add the className "readonly" to tags container', () => {
		const list = renderer.getRenderOutput();
		const items = list.props.children;

		expect(items[0].props.className).toContain('readonly');
	});
});


describe('Tags - "addKeys"', () => {
	let tags,
		input,
		tagContainer;

	beforeEach(() => {
		tags = renderIntoDocument(
			<Tags
				initialTags={TEST_TAGS}
				addKeys={[13, 9, 32, 188]} />
		);

		const renderedDOM = findDOMNode(tags);
		tagContainer = renderedDOM.querySelector('.react-tags__container');
		input = renderedDOM.getElementsByTagName('input')[0];

		input.value = TEST_TAGS[0];

		Simulate.change(input);
	});

	afterEach(() => {
		tags = null;
		input = null;
		tagContainer = null;
	});

	describe('when pressing "enter"', () => {
		it('should add a tag', () => {
			Simulate.keyDown(input, {key: 'Enter', keyCode: 13, which: 13});

			expect(tagContainer.children.length).toBe(3);
		});
	});

	describe('when pressing "tab"', () => {
		it('should add a tag', () => {
			Simulate.keyDown(input, {key: 'Tab', keyCode: 9, which: 9});

			expect(tagContainer.children.length).toBe(3);
		});
	});

	describe('when pressing "spacebar"', () => {
		it('should add a tag', () => {
			Simulate.keyDown(input, {key: 'Spacebar', keyCode: 32, which: 32});

			expect(tagContainer.children.length).toBe(3);
		});
	});

	describe('when pressing ","', () => {
		it('should add a tag', () => {
			Simulate.keyDown(input, {key: 'Comma', keyCode: 188, which: 188});

			expect(tagContainer.children.length).toBe(3);
		});
	});
});

describe('Tags - events', () => {
	let tags,
		input,
		tagContainer;

	const onTagAdded = jest.genMockFunction();
	const onTagRemoved = jest.genMockFunction();
	const onTagsChanged = jest.genMockFunction();
	const onTagsInputChange = jest.genMockFunction();

	beforeEach(() => {
		tags = renderIntoDocument(
			<Tags
				initialTags={TEST_TAGS}
				onAdded={onTagAdded}
				onRemoved={onTagRemoved}
				onChange={onTagsChanged}
				onInputChange={onTagsInputChange} />
		);

		const renderedDOM = findDOMNode(tags);
		tagContainer = renderedDOM.querySelector('.react-tags__container');
		input = renderedDOM.getElementsByTagName('input')[0];
	});

	afterEach(() => {
		tags = null;
		input = null;
		tagContainer = null;
	});

	describe('when adding a tag', () => {
		beforeEach(() => {
			input.value = TEST_TAGS[0];

			Simulate.change(input);
			Simulate.keyDown(input, {key: 'Enter', keyCode: 13, which: 13});
		});

		it('should call the "onAdded" event and return the new tag', () => {
			expect(onTagAdded).toBeCalledWith(TEST_TAGS[0]);
		});

		it('should call the "onChange" event and return the new tags list as an array', () => {
			const newArray = TEST_TAGS.concat('foo');

			expect(onTagsChanged).toBeCalledWith(newArray);
		});
	});

	describe('when removing a tag', () => {
		beforeEach(() => {
			input.value = '';

			Simulate.change(input);
			Simulate.keyDown(input, {key: 'Delete', keyCode: 8, which: 8});
		});

		it('should call the "onRemoved" event and return the tag that was removed', () => {
			expect(onTagRemoved).toBeCalledWith(TEST_TAGS[1]);
		});

		it('should call the "onChange" event and return the new tags list as an array', () => {
			expect(onTagsChanged).toBeCalledWith([TEST_TAGS[0]]);
		});
	});

	describe('when typing in the input field', () => {
		it('should call the "inputChange" and return the word as you\'re typing', () => {
			Simulate.change(input, {
				target: {
					value: 'a'
				}
			});

			expect(onTagsInputChange).toBeCalledWith('a');
		});
	});
});

describe('Tags - removing', () => {
	let tags,
		input,
		tagContainer;

	beforeEach(() => {
		tags = renderIntoDocument(
			<Tags
				initialTags={TEST_TAGS} />
		);

		const renderedDOM = findDOMNode(tags);
		tagContainer = renderedDOM.querySelector('.react-tags__container');
		input = renderedDOM.getElementsByTagName('input')[0];
	});

	afterEach(() => {
		tags = null;
		input = null;
		tagContainer = null;
	});

	describe('when the remove icon is clicked on a tag', () => {
		it('should remove a single tag', () => {
			const removeIcon = tagContainer.children[0].getElementsByTagName('a')[0];

			Simulate.click(removeIcon);

			expect(tagContainer.children[0].textContent).toContain(TEST_TAGS[1]);
			expect(tagContainer.children.length).toBe(1);
		});
	});

	describe('when the input field is empty and backspace is pressed', () => {
		it('should remove a single tag', () => {
			input.value = '';

			Simulate.change(input);
			Simulate.keyDown(input, {key: 'Delete', keyCode: 8, which: 8});

			expect(tagContainer.children.length).toBe(1);
			expect(tagContainer.children[0].textContent).toContain(TEST_TAGS[0]);
		});
	});

	describe('when the input field is not empty and backspace is pressed', () => {
		it('should not remove a tag', () => {
			input.value = 'a';

			Simulate.change(input);
			Simulate.keyDown(input, {key: 'Delete', keyCode: 8, which: 8});

			expect(tagContainer.children.length).toBe(2);
			expect(tagContainer.children[1].textContent).toContain(TEST_TAGS[1]);
		});
	});
});

describe('Tags - "uniqueTags"', () => {
	it('should allow duplicate tags to be created', () => {
		const tags = renderIntoDocument(
			<Tags
				initialTags={TEST_TAGS}
				uniqueTags={false} />
		);

		const renderedDOM = findDOMNode(tags);
		const input = renderedDOM.getElementsByTagName('input')[0];
		const tagContainer = renderedDOM.querySelector('.react-tags__container');

		input.value = TEST_TAGS[0];

		Simulate.change(input);
		Simulate.keyDown(input, {key: 'Enter', keyCode: 13, which: 13});

		expect(tagContainer.children.length).toBe(3);
		expect(tagContainer.children[2].textContent).toContain(TEST_TAGS[0]);
		expect(tagContainer.children[2].textContent).toBe(tagContainer.children[0].textContent);
	});

	it('should not allow duplicate tags to be created', () => {
		const tags = renderIntoDocument(
			<Tags
				initialTags={TEST_TAGS}
				uniqueTags={true} />
		);

		const renderedDOM = findDOMNode(tags);
		const input = renderedDOM.getElementsByTagName('input')[0];
		const tagContainer = renderedDOM.querySelector('.react-tags__container');

		input.value = TEST_TAGS[0];

		Simulate.change(input);
		Simulate.keyDown(input, {key: 'Enter', keyCode: 13, which: 13});

		expect(tagContainer.children.length).toBe(2);
	});
});

describe('Tags - "maxTags"', () => {
	describe('when maxTags is set to 3', () => {
		it('should allow no more than 3 tags to be added', () => {
			const tags = renderIntoDocument(
				<Tags
					initialTags={TEST_TAGS}
					maxTags={3} />
			);

			const renderedDOM = findDOMNode(tags);
			const input = renderedDOM.getElementsByTagName('input')[0];
			const tagContainer = renderedDOM.querySelector('.react-tags__container');

			input.value = TEST_TAGS[0];

			Simulate.change(input);
			Simulate.keyDown(input, {key: 'Enter', keyCode: 13, which: 13});

			input.value = TEST_TAGS[0];

			Simulate.keyDown(input, {key: 'Enter', keyCode: 13, which: 13});

			expect(tagContainer.children.length).toBe(3);
		});
	});
});

describe('Tags - "deleteOnKeyPress"', () => {
	describe('when deleteOnKeyPress is false', () => {
		it('should not remove tags on backspace', () => {
			const tags = renderIntoDocument(
				<Tags
					initialTags={TEST_TAGS}
					deleteOnKeyPress={false} />
			);

			const renderedDOM = findDOMNode(tags);
			const input = renderedDOM.getElementsByTagName('input')[0];
			const tagContainer = renderedDOM.querySelector('.react-tags__container');

			input.value = '';

			Simulate.change(input);
			Simulate.keyDown(input, {key: 'Delete', keyCode: 8, which: 8});

			expect(tagContainer.children.length).toBe(2);
			expect(tagContainer.children[1].textContent).toContain(TEST_TAGS[1]);
			expect(tagContainer.children.length).toBe(2);
		});
	});
});
