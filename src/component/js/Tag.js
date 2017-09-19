// @flow

import React  from 'react';

const Tag = (props: Object) => {
  const onRemoveClick = (e: MouseEvent) => {
    e.preventDefault();

    props.onRemoveTag(e);
  };

  const removeIcon: ?React$Element<any> = !props.readOnly ? (
    <a onClick={onRemoveClick}>
      {props.removeTagIcon|| String.fromCharCode(215)}
    </a>
  ) : null;

  return (
    <li>
      {props.name}
      {removeIcon}
    </li>
  );
};

export default Tag;
