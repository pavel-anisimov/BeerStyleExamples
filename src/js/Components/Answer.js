/**
 * @file Answer.js
 * @description Main Answer Block
 * @author Pavel Anisimov
 * @copyright Pavel Anisimov 2017-2018
 */
import HtmlElement from './HtmlObject';

/**
 * Answer Object
 * @class Answer
 * @extends HtmlElement
 */
export default class Answer extends HtmlElement {
  /**
   * @constructor
   * @description Creates Generic HTML Answer Object.
   * @param {String} idSelector - optional id selector to bind the js class to DOM object
   */
  constructor(idSelector = 'answer') {
    super(idSelector);
  }
}