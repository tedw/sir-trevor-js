"use strict";

var BlockDeletion = function() {
  this._ensureElement();
  this._bindFunctions();
};

Object.assign(BlockDeletion.prototype, require('./function-bind'), require('./renderable'), {

  tagName: 'button',
  className: 'st-block-ui-btn__delete',

  attributes: {
    html: 'delete',
    'data-icon': 'close',
    'type': 'button'
  }

});

module.exports = BlockDeletion;
