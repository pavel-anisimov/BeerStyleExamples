/**
 * @file Button.js
 * @description Button JS file with button specific behavior
 * @author Pavel Anisimov
 * @copyright Pavel Anisimov 2017-2018
 */
import HtmlElement from './HtmlObject';

/**
 * @class Button
 * @description Button Object
 * @extends HtmlElement
 */
export default class Button extends HtmlElement {
  /**
   * @constructor
   * @description Creates Generic Button Object.
   * @param {String} idSelector - id selector to bind the js class to DOM object
   */
  constructor(idSelector = 'button') {
    super(idSelector);
  }

  /**
   * @method onClick
   * @description Wrapper method for creating a clicking event.
   * @param {Function} cb
   * @return {Button} - HTML Object
   */
  onClick(cb) {
    this.dom().addEventListener('click', cb);
    return this;
  }
}