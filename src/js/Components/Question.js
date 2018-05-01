/**
 * @file Question.js
 * @description Main Question
 * @author Pavel Anisimov
 * @copyright Pavel Anisimov 2017-2018
 */
import HtmlElement from './HtmlObject';

/**
 * Question Object
 * @class Question
 * @extends HtmlElement
 */
export default class Question extends HtmlElement {
  /**
   * @constructor
   * @description Creates Generic HTML Question Object.
   * @param {String} idSelector - optional id selector to bind the js class to DOM object
   */
  constructor(idSelector = 'question') {
    super(idSelector);
  }
}