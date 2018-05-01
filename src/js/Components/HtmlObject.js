/**
 * @file HtmlElement.js
 * @description Main HTML object file
 * @author Pavel Anisimov
 * @copyright Pavel Anisimov 2017-2018
 */

/**
 * @class HtmlElement
 * @description HtmlElement Object
 */
export default class HtmlElement {
  /**
   * @constructor
   * @description Create Generic HTML Object.
   * @param {String} idSelector - id selector to bind the js class to DOM object
   */
  constructor(idSelector) {
    this.htmlObject = document.getElementById(idSelector);
  }

  /**
   * @method dom
   * @description Init method with list of procedures to be called upon creation of the object.
   * @return {Object} - HTML Object
   */
  dom() {
    return this.htmlObject;
  }

  /**
   * @method setLabel
   * @description Setting an inner label (text) of the object. Depending on 2nd boolean parameter can set label as text or html
   * @param {String} label
   * @param {Boolean} text
   * @return {HtmlElement}
   */
  setLabel(label, text = true) {
    if (text) {
      this.dom().innerText = label;
    } else {
      this.dom().innerHTML = label;
    }
    return this;
  }

  /**
   * @method hide
   * @description Hiding an object by adding 'hidden' class (display:none)
   * @return {HtmlElement}
   */
  hide() {
    this.dom().classList.add('hidden');
    return this;
  }

  /**
   * @method show
   * @description Showing an object by removing 'hidden' class (display:none)
   * @return {HtmlElement}
   */
  show() {
    this.dom().classList.remove('hidden');
    return this;
  }

}