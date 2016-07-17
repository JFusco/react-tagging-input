# react-tags

![npm][npm-version-image]
[![peerDependency Status][peer-dep-image]][peer-dep-url]
[![devDependency Status][dev-dep-image]][dev-dep-url]

> Simple tagging component for React projects.

## Getting Started ##

#### Installation
From the root of your project.
```sh
npm install react-tags --save
```

## Usage
Simple implementation of tags. See [options available](#options) below.
```js
import React, { Component } from 'react';
import { render } from 'react-dom';
import Tags from 'react-tags';

class Application extends Component{
	constructor(props){
		super(props);

		this.state = {
			tags: ['hello', 'world']
		}
	}

	onTagsChange(tags){
		console.log(`new tags: ${tags}`);
	}

	render(){
		return (
			<div>
				<Tags
				 initialTags={this.state.tags}
				 placeholder="Add a tag"
				 change={this.onTagsChange} />
			</div>
		);
	}
}

render(<Application />, document.getElementById('application'));
```

<a name="options"></a>
#### Options
* **[`initialTags`](#initialTags)**
* **[`placeholder`](#placeholder)**
* **[`change`](#change)**
* **[`added`](#added)**
* **[`readOnly`](#readOnly)**
* **[`removeTagWithDeleteKey`](#removeTagWithDeleteKey)**
* **[`removeTagIcon`](#removeTagIcon)**
* **[`allowDupes`](#allowDupes)**
* **[`id`](#id)**

<a name="initialTags"></a>
##### initialTags ~ optional ~ default `[]`
An `array` of tags to be passed in and rendered right away in the component
```js
const tags = ['hello', 'world'];

<Tags initialTags={tags} />
```

<a name="placeholder"></a>
##### placeholder ~ optional ~ default `null`
A `string` used as placeholder text in the tags input field
```js
<Tags placeholder="Add a tag" />
```

<a name="change"></a>
##### change ~ optional
A `function` fired anytime there is a change - returns the new `array` of tags
```js
onTagsChange(tags){
	console.log(`new tags: ${tags}`);
}

<Tags change={this.onTagsChange} />
```

<a name="added"></a>
##### added ~ optional
A `function` fired when a new tag is added - returns a `string` of the new tag
```js
onTagAdded(tag){
	console.log(`new tag: ${tags}`);
}

<Tags added={this.onTagAdded} />
```

<a name="removed"></a>
##### removed ~ optional
A `function` fired when a new tag is deleted - returns a `string` of the tag that was deleted
```js
onTagRemoved(tag){
	console.log(`deleted tag: ${tag}`);
}

<Tags removed={this.onTagRemoved} />
```

<a name="readOnly"></a>
##### readOnly ~ optional ~ default `false`
A `boolean` that sets the tag component to read only mode. No adding or removing tags and pointer events
```js
<Tags readOnly={true} />
```

<a name="removeTagWithDeleteKey"></a>
##### removeTagWithDeleteKey ~ optional ~ default `true`
A `boolean` that allows tags to be removed with the delete key when the input field is empty
```js
<Tags removeTagWithDeleteKey={true} />
```

<a name="removeTagIcon"></a>
##### removeTagIcon ~ optional ~ default `"x"`
The `element` to be used for the delete icon
```js
const removeIcon = () => {
	return (
		<i class="my-custom-icon"></i>
	);
}

<Tags removeTagsIcon={removeIcon()} />
```

<a name="allowDupes"></a>
##### allowDupes ~ optional ~ default `false`
A `boolean` that allows tags to be added more than once
```js
<Tags allowDupes={false} />
```

<a name="id"></a>
##### id ~ optional ~ default `null`
The `string` to be used for the ID of the component
```js
<Tags id="my-tags-component" />
```

## Styling
#### Installation
Import the main SCSS file in to your application SCSS files
```scss
@import "node_modules/react-tags/src/scss/react-tags";
```

There are a few variables set to `!default` that can be overriden. If you need to change it more just override the actual styles.

**Any overriden variables needs to go above the `@import` statement to take effect**
```scss
//-- Global UI
$tag-base-height
$tag-base-font-size
$tag-base-border-radius
$tag-base-font-color
$tag-base-margin
$tag-base-font-family

//-- Tags
$tag-background-color
$tag-background-hover-color
$tag-remove-color
$tag-remove-font-size
$tag-remove-hover-color

//-- Input
$tag-input-bg-color
$tag-input-border
$tag-input-placeholder-color
```

If you don't care to override variables and just want to override actual styles you may choose to import the minified compiled version of the css instead
```scss
@import "node_modules/react-tags/dist/react-tags.min.css";
```

## License ##

 * [MIT License](http://www.opensource.org/licenses/mit-license.php)

[npm-version-image]: https://img.shields.io/npm/v/npm.svg?maxAge=2592000
[dev-dep-image]: https://david-dm.org/JFusco/react-tags/dev-status.svg
[dev-dep-url]: https://david-dm.org/JFusco/react-tags#info=devDependencies
[peer-dep-image]: https://david-dm.org/JFusco/react-tags/peer-status.svg
[peer-dep-url]: https://david-dm.org/JFusco/react-tags#info=peerDependencies
