/**
 * @file FlashCards.js
 * @description Flashcards Application with logic
 * @author Pavel Anisimov
 * @copyright Pavel Anisimov 2017-2018
 */
import Answer from '../Components/Answer';
import Question from '../Components/Question';
import Image from '../Components/Image';
import Button from '../Components/Button';
import AddButton from '../Components/AddButton';
import RemoveButton from '../Components/RemoveButton';
import Switch from '../Components/Switch';
import Collection from './Collection';
import Styles from '../Data/StylesData';

import {
  GetRandomStyle,
  GetSortedStyles,
  ArrayFromLocalStorage,
  AppendLocalStorage,
  RemoveLocalStorage,
} from './Helpers';

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
    this.addButton = new AddButton();
    this.removeButton = new RemoveButton();

    this.switch = new Switch();
    this.setState('');
    this.styles = new Collection(Styles);
    this.currentStyle = this.getStyle();

    let hardStyles = Styles.filter(style => ArrayFromLocalStorage('hardStyles').indexOf(style.Id) > -1);

    this.hardStyles = new Collection(hardStyles);

    window.flashcards = this;
  }

  /**
   * @method init
   * @description binding the app logic to button. Runs the app.
   */
  init() {
    this.button.onClick(this.logic.bind(this));
    this.addButton.onClick(this.addHardStyle.bind(this));
    this.removeButton.onClick(this.removeHardStyle.bind(this));
    this.removeButton.disable();
  }

  /**
   * @method setUpButtons
   * @description Logic to switch disability of buttons
   * @return {FlashCards}
   */
  setUpButtons() {
    if(this.switch.isMode('Random') || this.switch.isMode('Ordered')) {
      if(!ArrayFromLocalStorage().includes(this.getStyle('Id'))) {
        flashcards.addButton.enable();
      }
      flashcards.removeButton.disable();
    } else if (this.switch.isMode('Saved')) {
      flashcards.addButton.disable();
      flashcards.removeButton.enable();
    }

    return this;
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
      this.setUpButtons();
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
   * @method addHardStyle
   * @description Adding a style to a hard stile list
   * @return {FlashCards}
   */
  addHardStyle() {
    this.hardStyles.insert(this.getStyle());
    AppendLocalStorage('hardStyles', this.getStyle('Id'));
    this.addButton.disable();

    if (this.hardStyles.count()) {
      this.switch.addMode('Saved');
    }

    return this;
  }

  /**
   * @method removeHardStyle
   * @description Removing a style from a hard stile list
   * @return {FlashCards}
   */
  removeHardStyle() {
    new Promise(() => {
      this.hardStyles.remove(this.getStyle('Id'));
      RemoveLocalStorage('hardStyles', this.getStyle('Id'));
      this.removeButton.disable();
    }).then(() => {
      if (this.hardStyles.count() === 1) {
        this.switch.switchOptions();
        this.switch.removeMode('Saved');
      }
    });

    return this;
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
    switch (this.switch.getMode()) {
      case 'Random':
        this.currentStyle = this.styles.getRandom();
        break;
      case 'Ordered':
        this.currentStyle = this.styles.getNext();
        break;
      case 'Saved':
        this.currentStyle = this.hardStyles.getRandom();
        break;
      default:
        break;
    }
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