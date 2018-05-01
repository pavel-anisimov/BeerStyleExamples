/**
 * @file Switch.js
 * @description Main Switch Block
 * @author Pavel Anisimov
 * @copyright Pavel Anisimov 2017-2018
 */
import HtmlElement from './HtmlObject';
import { NextArrayIndex } from '../Modules/Helpers';

/**
 * Switch Object
 * @class Switch
 * @extends HtmlElement
 */
export default class Switch extends HtmlElement {
  /**
   * @constructor
   * @description Creates Generic Switch Button Object.
   * @param {String} idSelector - optional id selector to bind the js class to DOM object
   */
  constructor(idSelector = 'switch') {
    super(idSelector);
    this.options = ['Random', 'Ordered'];
    this.setCurrentOption();
    this.onClick();
  }

  /**
   * @method getOption
   * @description Reads an array of options and returns selected option (1 or 2)
   * @param {Number} opt - option
   * @return {String} - Option (Random|Ordered)
   */
  getOption(opt) {
    return this.options[opt];
  }

  /**
   * @method getCurrentOption
   * @description Returns current selected option.
   * @return {Number} - Option (0|1)
   */
  getCurrentOption() {
    return this.currentOption;
  }

  /**
   * @method setCurrentOption
   * @description Setting current option and changing the label. By default set an option to 0.
   * @param {Number} opt
   * @return {Switch}
   */
  setCurrentOption(opt = 0) {
    this.setLabel(this.getOption(opt));
    this.currentOption = opt;

    return this;
  }

  /**
   * @method getMode
   * @description Returns current mode (Random|Ordered)
   * @return {String}
   */
  getMode() {
    return this.getOption(this.getCurrentOption());
  }

  /**
   * @method isMode
   * @description Checks if current mode true or false
   * @param {String} mode
   * @return {Boolean}
   */
  isMode(mode) {
    return mode === this.getMode();
  }

  /**
   * @method switchOptions
   * @description Switching to a next option in sequence 0 => 1, 1 => 2
   * @return {String}
   */
  switchOptions() {
    const nextOption = NextArrayIndex(this.options.length, this.getCurrentOption()) ;
    this.setCurrentOption(nextOption);
    return nextOption;
  }

  /**
   * @method onClick
   * @description Wrapper method for creating a clicking event.
   * @return {Switch} - HTML Object
   */
  onClick() {
    this.dom().addEventListener('click', () => this.switchOptions());
    return this;
  }
}