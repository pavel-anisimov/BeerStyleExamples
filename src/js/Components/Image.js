/**
 * @file Image.js
 * @description Image JS file with image specific behavior. In reality, just a div parameter with an image as a background
 * @author Pavel Anisimov
 * @copyright Pavel Anisimov 2017-2018
 */
import HtmlElement from './HtmlObject';

/**
 * @class Image
 * @description Image Object
 * @extends HtmlElement
 */
export default class Image extends HtmlElement {
  /**
   * @constructor
   * @description Creates Generic Image Object.
   * @param {string} idSelector - id selector to bind the js class to DOM object
   */
  constructor(idSelector = 'image') {
    super(idSelector);
  }

  /**
   * @method setImage
   * @description sets the class that contains an image as the background
   * @param {String} imgClass
   * @return {Image}
   */
  setImage(imgClass) {
    this.dom().classList.add(imgClass);
    return this;
  }

  /**
   * @method removeImage
   * @description removes the class that contains an image as the background
   * @param {String} imgClass
   * @return {Image}
   */
  removeImage(imgClass) {
    this.dom().classList.remove(imgClass);
    return this;
  }
}