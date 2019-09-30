import React from 'react';
import ReactDOM from 'react-dom';

import {
  UniversalHeader,
  Chat,
  GlobalStyleSheet
 } from '@umich-lib/core';

window.benching = window.benching || [];
window.benching.push(-2);
window.benching.push(performance.now());

// ReactDOM.render(
//   <UniversalHeader/>,
//   document.querySelector('[data-is="universal-header"]')
// )

var registered = {};
registered['universal-header'] = UniversalHeader;
registered['chat'] = Chat;

var defaults = {};
defaults['chat'] = {fixed: true};

// insert the global stylesheet?
var div = document.createElement('div');
document.body.appendChild(div);
ReactDOM.render(<GlobalStyleSheet />, div);

window.benching.push(performance.now());

var components = {};
var possibles = document.querySelectorAll('[data-is]');
for(var i = 0; i < possibles.length; i++) {
	var possible = possibles[i];
	var component = possible.dataset.is;
	console.log("--", component);
	if ( registered[component] ) {
		if ( components[component] === undefined ) {
			components[component] = [];
    }
    var module = registered[component];
    ReactDOM.render(
      React.createElement(module, defaults[component]),
      possible
    )
	}
}

window.benching.push(performance.now());

fetch(`https://quod.lib.umich.edu/1x1.json?${window.benching.join(',')}`, {
  mode: 'no-cors',
  cache: 'no-cache'
})
