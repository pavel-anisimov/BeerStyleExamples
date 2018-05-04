/**
 * @file Add.js
 * @description Button JS file with button specific behavior
 * @author Pavel Anisimov
 * @copyright Pavel Anisimov 2017-2018
 */
import Button from './Button';

/**
 * @class AddButton
 * @description Add Button Object
 * @extends HtmlElement
 */
export default class AddButton extends Button {
  /**
   * @constructor
   * @description Creates Generic AddButton Object.
   * @param {String} idSelector - id selector to bind the js class to DOM object
   */
  constructor(idSelector = 'add-button') {
    super(idSelector);
  }
}