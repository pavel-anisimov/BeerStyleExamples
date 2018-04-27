/**
 * @file FlashCards.js
 * @description Flashcards Application with logic
 * @author Pavel Anisimov
 * @copyright Pavel Anisimov 2017-2018
 */
import Answer from './Answer';
import Question from './Question';
import Image from './Image';
import Button from './Button';
import { GetRandomStyle } from './Helpers';

/**
 * @class FlashCards
 * @description Flashcard Class
 */
export default class FlashCards {
  /**
   * @constructor
   * @description Flashcard Application Constructor
   */
  constructor() {
    this.answer = new Answer();
    this.question = new Question();
    this.image = new Image();
    this.button = new Button();
    this.setState('');
    this.currentStyle = this.getStyle();
  }

  /**
   * @method init
   * @description binding the app logic to button. Runs the app.
   */
  init() {
    this.button.onClick(this.logic.bind(this));
  }

  /**
   * @method logic
   * @description Main application logic
   */
  logic() {
    if (this.isState('question')) {
      this.setState('answer');
      this.button.setLabel(':: Next Question ::');
      this.answer.setLabel(this.getStyle('Example'));
      this.image.show();
    } else {
      this.setState('question');
      this.image.removeImage(this.getStyle('ImageClass'));
      this.setStyle();
      this.question.setLabel('Example of <span class=style>' + this.getStyle('Style') + '</span> is ...', false);
      this.answer.setLabel('...?');
      this.button.setLabel(':: Show Answer ::');
      this.image.hide().setImage(this.getStyle('ImageClass'));
    }
  }

  /**
   * @method getState
   * @description gets the current state
   * @return {String}
   */
  getState() {
    return this.state;
  }

  /**
   * @method setState
   * @description sets the new state
   * @return {FlashCards}
   */
  setState(state) {
    this.state = state;
    return this;
  }

  /**
   * @method setStyle
   * @description sets a new random Style
   * @return {FlashCards}
   */
  setStyle() {
    this.currentStyle = GetRandomStyle();
    return this;
  }

  /**
   * @method getStyle
   * @description getting current style or its attribute
   * @param {String} key (optional)
   * @return {Object|String}
   */
  getStyle(key) {
    if (!key || !this.currentStyle || !this.currentStyle[key]) {
      return this.currentStyle;
    } else {
      return this.currentStyle[key];
    }
  }

  /**
   * @method isState
   * @description returns true if current state is the parameter passed. Used in conditional statements
   * @param {String} state
   * @return {boolean}
   */
  isState(state) {
    return this.getState() === state;
  }
}