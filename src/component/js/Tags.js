// @flow

import React from 'react';
import Tag from './Tag';

import '../scss/styles.scss';

type Props = {
  tags: Array<string>,
  maxTags?: number,
  placeholder?: string,
  deleteOnKeyPress?: boolean,
  addKeys?: Array<number>,
  uniqueTags?: boolean,
  readOnly?: boolean,
  onAdded?: Function,
  onRemoved?: Function,
  onInputChange?: Function,
  id?: string,
  removeTagIcon?: string | Object
};

const Tags = ({
                tags,
                maxTags = -1,
                placeholder = 'Add a tag',
                deleteOnKeyPress = true,
                addKeys = [Tags.KEYS.enter, Tags.KEYS.tab, Tags.KEYS.spacebar],
                uniqueTags = false,
                readOnly = false,
                ...props }: Props) => {

  let input: HTMLInputElement;

  const addTag = (): void => {
    const { onAdded } = props;

    if (maxTags > 0){
      if (tags.length >= maxTags) return;
    }

    if (input){
      const value = input.value.trim();

      if (uniqueTags){
        if (tags.indexOf(value) >= 0) return;
      }

      if (typeof onAdded !== 'undefined'){
        onAdded(value);
      }

      input.value = '';
    }
  };

  const removeTag = (index: number): void => {
    const { onRemoved } = props;
    const value: string = tags[index];

    if (typeof onRemoved !== 'undefined'){
      onRemoved(value, index);
    }
  };

  const onInputKey = (e: KeyboardEvent): void => {
    switch (e.keyCode){
      case Tags.KEYS.backspace:
        if (tags.length === 0 || !deleteOnKeyPress) return;

        if (input.value === ''){
          removeTag(tags.length - 1);
        }

        break;

      default:
        if (input.value === '') return;

        if (addKeys.indexOf(e.keyCode) !== -1){
          if (Tags.KEYS.enter !== e.keyCode){
            e.preventDefault();
          }

          addTag();
        }

        break;
    }
  };

  const onInputChange = (e: SyntheticInputEvent): void => {
    const value: string = e.target.value.trim();

    if (typeof props.onInputChange !== 'undefined'){
      props.onInputChange(value);
    }
  };

  const { removeTagIcon, id } = props;

  //-- Render tags
  const tagItems: Array<Tag> = tags.map((tag, v) => {
    return <Tag
      key={v}
      name={tag}
      readOnly={readOnly}
      removeTagIcon={removeTagIcon}
      onRemoveTag={removeTag.bind(this, v)} />;
  });

  //-- Render the input field
  const tagInput: ?React$Element<any> = !readOnly ? (
    <input
      type="text"
      role="textbox"
      autoComplete="off"
      aria-label={placeholder}
      placeholder={placeholder}
      onChange={onInputChange}
      onKeyDown={onInputKey}
      ref={el => input = el} />
  ) : null;

  const classNames: string = readOnly ? 'react-tags__container react-tags__container_readonly' : 'react-tags__container';

  return (
    <div className="react-tags" id={id}>
      <ul className={classNames}>
        {tagItems}
      </ul>

      {tagInput}
    </div>
  );
};

//-- Keyboard key map
Tags.KEYS = {
  enter: 13,
  tab: 9,
  spacebar: 32,
  backspace: 8,
  left: 37,
  right: 39
};

export default Tags;
