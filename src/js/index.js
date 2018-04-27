/**
 * @file index.js
 * @description Entry Point for FlashCards app
 * @author Pavel Anisimov
 * @copyright Pavel Anisimov 2017-2018
 */
import FlashCards from './Modules/FlashCards';

(flashCards => {
  flashCards.init();
})(new FlashCards());
