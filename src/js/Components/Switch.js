/**
 * @file Switch.js
 * @description Main Switch Block
 * @author Pavel Anisimov
 * @copyright Pavel Anisimov 2017-2018
 */
import HtmlElement from './HtmlObject';
import {
  NextArrayIndex,
  ArrayFromLocalStorage,
} from '../Modules/Helpers';

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

    this.init();
  }

  /**
   * @method init
   * @description binding the app logic to the switch.
   */
  init() {
    this.setCurrentOption();
    this.onClick();
    if (ArrayFromLocalStorage('hardStyles').length && !this.hasMode('Saved')) {
      this.addMode('Saved');
    }
  }

  /**
   * @method addMode
   * @description Adding a mode to the list
   * @param {String} mode
   * @return {Switch}
   */
  addMode(mode) {
    this.options.push(mode);

    return this;
  }

  /**
   * @method hasMode
   * @description Checking if mode is in the array
   * @param {String} mode
   * @return {Boolean}
   */
  hasMode(mode) {
    return this.options.includes(mode);
  }

  /**
   * @method removeMode
   * @description Removing a mode from the list
   * @param {String} mode
   * @return {Switch}
   */
  removeMode(mode) {
    const index = this.options.indexOf(mode);

    if(index > -1) {
      this.options.splice(index, 1);
    }
    return this;
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

    if(this.isMode('Random') || this.isMode('Ordered')) {
      flashcards.addButton.enable();
      flashcards.removeButton.disable();
    } else if (this.isMode('Saved')) {
      flashcards.addButton.disable();
      flashcards.removeButton.enable();
    }
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