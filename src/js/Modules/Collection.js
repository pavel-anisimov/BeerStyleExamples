import { NextArrayIndex } from '../Modules/Helpers'

export default class Collection {
  constructor(data){
    this.data = this.sortData(data);
    this.index = this.getLength() - 1;
  }

  getLength() {
    return this.data.length;
  }

  sortData(styles, attr = 'Id') {
    return styles.sort( (a, b) => a[attr] > b[attr] ? 1 : -1);
  }

  setIndex(index) {
    this.index = index;
    return this;
  }

  getIndex(index) {
    return this.index;
  }

  getCurrent(index = this.getIndex()) {
    return this.data[index];
  }

  getNext() {
    let index = NextArrayIndex(this.getLength(), this.getIndex());
    this.setIndex(index);
    return this.getCurrent(index);
  }

  getRandom() {
    const index = Math.floor(Math.random() * this.getLength());
    this.setIndex(index);
    return this.getCurrent(index);
  }
}