'use strict';

jest.disableAutomock();

import React from 'react';
import { findDOMNode } from 'react-dom';
import { createRenderer, Simulate, renderIntoDocument } from 'react-addons-test-utils';
import Tag from '../src/component/js/Tag';

const TAG_NAME = 'foo';

describe('Tag', () => {
	let renderer,
		tag;

	beforeEach(() => {
		renderer = createRenderer();

		renderer.render(
			<Tag
				name={TAG_NAME} />
		);

		tag = renderer.getRenderOutput();
	});

	afterEach(() => {
		renderer = null;
		tag = null;
	});

	it('should render', () => {
		expect(tag).not.toBeUndefined();
		expect(tag.type).toBe('li');
	});

	it('should render with a name', () => {
		const props = tag.props.children;

		expect(props[0]).toBe(TAG_NAME);
	});
});


describe('Tag - "readOnly"', () => {
	let renderer;

	beforeEach(() => {
		renderer = createRenderer();
	});

	afterEach(() => {
		renderer = null;
	});

	describe('when readOnly is false', () => {
		it('should render the removeTagIcon', () => {
			renderer.render(
				<Tag
					name={TAG_NAME}
					readOnly={false} />
			);

			const tag = renderer.getRenderOutput();
			const removeIcon = tag.props.children[1];

			expect(removeIcon).not.toBeNull();
			expect(removeIcon.type).toBe('a');
		});
	});

	describe('when readOnly is true', () => {
		it('should not render the removeTagIcon', () => {
			renderer.render(
				<Tag
					name={TAG_NAME}
					readOnly={true} />
			);

			const tag = renderer.getRenderOutput();

			expect(tag.props.children[1]).toBeNull();
		});
	});
});

describe('Tag - "removeTagIcon"', () => {
	let renderer;

	beforeEach(() => {
		renderer = createRenderer();
	});

	afterEach(() => {
		renderer = null;
	});

	describe('when a custom element is passed in', () => {
		it('should render the element', () => {
			const customRemoveIcon = (
				<i className="icon-remove"></i>
			);

			renderer.render(
				<Tag
					name={TAG_NAME}
					removeTagIcon={customRemoveIcon} />
			);

			const tag = renderer.getRenderOutput();
			const removeIcon = tag.props.children[1].props.children;

			expect(tag.props.children[1].type).toBe('a');
			expect(removeIcon.type).toBe('i');
			expect(removeIcon.props.className).toBe('icon-remove');
		});
	});

	describe('when a custom string is passed in', () => {
		it('should render the string', () => {
			const renderer = createRenderer();

			const customRemoveString = 'remove';

			renderer.render(
				<Tag
					name={TAG_NAME}
					removeTagIcon={customRemoveString} />
			);

			const tag = renderer.getRenderOutput();
			const removeIcon = tag.props.children[1].props.children;

			expect(tag.props.children[1].type).toBe('a');
			expect(removeIcon).toBe('remove');
		});
	});
});

describe('Tag - "onRemoveTag"', () => {
	it('should be called when clicking the remove icon', () => {
		const onRemoveClick = jest.genMockFunction();

		const tag = renderIntoDocument(
			<div>
				<Tag
					name={TAG_NAME}
					onRemoveTag={onRemoveClick} />
			</div>
		);

		const statelessTag = findDOMNode(tag).children[0];
		const removeIcon = statelessTag.getElementsByTagName('a')[0];

		Simulate.click(removeIcon);

		expect(onRemoveClick).toBeCalled();
	});
});
