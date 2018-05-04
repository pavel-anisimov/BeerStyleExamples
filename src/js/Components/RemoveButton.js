/**
 * @file Add.js
 * @description Button JS file with button specific behavior
 * @author Pavel Anisimov
 * @copyright Pavel Anisimov 2017-2018
 */
import Button from './Button';

/**
 * @class RemoveButton
 * @description Add Button Object
 * @extends HtmlElement
 */
export default class RemoveButton extends Button {
  /**
   * @constructor
   * @description Creates Generic RemoveButton Object.
   * @param {String} idSelector - id selector to bind the js class to DOM object
   */
  constructor(idSelector = 'remove-button') {
    super(idSelector);
  }
}