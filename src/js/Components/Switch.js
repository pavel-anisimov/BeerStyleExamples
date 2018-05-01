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
   * @description Creates Generic HTML Answer Object.
   * @param {String} idSelector - optional id selector to bind the js class to DOM object
   */
  constructor(idSelector = 'switch') {
    super(idSelector);
    this.options = ['Random', 'Ordered'];
    this.setCurrentOption();
    this.onClick();
  }

  getOption(opt) {
    return this.options[opt];
  }

  getCurrentOption() {
    return this.currentOption;
  }

  setCurrentOption(opt = 0) {
    this.setLabel(this.getOption(opt));
    this.currentOption = opt;

    return this;
  }

  getMode() {
    return this.getOption(this.getCurrentOption());
  }

  isMode(mode) {
    return this.getMode() === mode;
  }

  switchOptions() {
    const nextOption = NextArrayIndex( this.options.length, this.getCurrentOption() ) ;
    this.setCurrentOption( nextOption );
    return nextOption;
  }

  onClick() {
    this.dom().addEventListener('click', () => this.switchOptions());
  }
}