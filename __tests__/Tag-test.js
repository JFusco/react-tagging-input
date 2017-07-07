import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Tag from '../src/component/js/Tag';

const TAG_NAME = 'foo';

describe('Tag', () => {
	it('should render', () => {
		const component = renderer.create(
			<Tag
				name={TAG_NAME} />
		).toJSON();

		expect(component).toMatchSnapshot();
	});
});

describe('Tag - "readOnly"', () => {
	describe('when false', () => {
		it('should render the removeTagIcon', () => {
			const component = shallow(
				<Tag
					name={TAG_NAME}
					readOnly={false} />
			);

			expect(component.find('a')).toHaveLength(1);
			expect(component.find('a').text()).toEqual(String.fromCharCode(215));

			expect(toJson(component)).toMatchSnapshot();
		});
	});

	describe('when true', () => {
		it('should not render the removeTagIcon', () => {
			const component = shallow(
				<Tag
					name={TAG_NAME}
					readOnly={true} />
			);

			expect(component.find('a')).toHaveLength(0);

			expect(toJson(component)).toMatchSnapshot();
		});
	});
});

describe('Tag - "removeTagIcon"', () => {
	describe('when a custom element is passed in', () => {
		it('should render the element', () => {
			const customRemoveIcon = (
				<i className="icon-remove"></i>
			);

			const component = renderer.create(
				<Tag
					name={TAG_NAME}
					removeTagIcon={customRemoveIcon} />
			).toJSON();

			expect(component).toMatchSnapshot();
		});
	});

	describe('when a custom string is passed in', () => {
		it('should render the string', () => {
			const customRemoveString = 'remove';

			const component = renderer.create(
				<Tag
					name={TAG_NAME}
					removeTagIcon={customRemoveString} />
			).toJSON();

			expect(component).toMatchSnapshot();
		});
	});
});

describe('Tag - "onRemoveTag"', () => {
	it('should be called when clicking the remove icon', () => {
		const onRemoveClick = jest.fn();

		const component = shallow(
			<Tag
				name={TAG_NAME}
				onRemoveTag={onRemoveClick} />
		);

		component.find('a').simulate('click', {
			preventDefault() {}
		});

		expect(onRemoveClick).toBeCalled();
	});
});
