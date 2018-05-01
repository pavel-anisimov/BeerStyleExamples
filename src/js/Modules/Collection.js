/**
 * @file Collection.js
 * @description Collection of Data
 * @author Pavel Anisimov
 * @copyright Pavel Anisimov 2017-2018
 */
import { NextArrayIndex } from '../Modules/Helpers'

/**
 * @class Collection
 * @description Collection of Data and operation on it.
 */
export default class Collection {
  /**
   * @constructor
   * @description Collection Constructor
   * @param {Array} data
   */
  constructor(data){
    this.data = data;
    this.sort();
    this.index = this.getLength() - 1;
  }

  /**
   * @method count
   * @description counts the number of elements in Collection
   * @return {Number}
   */
  count() {
    return this.data.length;
  }

  /**
   * @method sort
   * @description Sorts data in a collection by an attribute.
   * @param {String} attr
   * @return {Collection}
   */
  sort(attr = 'Id') {
    this.data = this.data.sort((a, b) => a[attr] > b[attr] ? 1 : -1);
    return this;
  }

  /**
   * @method setIndex
   * @description re-setting a current index
   * @param {Number} index
   * @return {Collection}
   */
  setIndex(index) {
    this.index = index;
    return this;
  }

  /**
   * @method getIndex
   * @description returning current index
   * @return {Number}
   */
  getIndex() {
    return this.index;
  }

  /**
   * @method getCurrent
   * @description returning an element at the specific index
   * @param {Number} index - optional. Defaults to current index
   * @return {JSON}
   */
  getCurrent(index = this.getIndex()) {
    return this.data[index];
  }

  /**
   * @method getNext
   * @description returning next element and setting index for next
   * @return {JSON}
   */
  getNext() {
    let index = NextArrayIndex(this.count(), this.getIndex());
    this.setIndex(index);
    return this.getCurrent(index);
  }

  /**
   * @method getRandom
   * @description returning random element and setting index for that element
   * @return {JSON}
   */
  getRandom() {
    const index = Math.floor(Math.random() * this.count());
    this.setIndex(index);
    return this.getCurrent(index);
  }
}