/**
 * @file Helpers.js
 * @description Helper/Utility Methods
 * @author Pavel Anisimov
 * @copyright Pavel Anisimov 2017-2018
 */
import Styles from '../Data/StylesData';

/**
 * @function randomFrommArray
 * @description Generates a random object from array.
 * @param {Array} arr - array of objects
 * @return {Object} - random element
 */
const RandomFrommArray = arr => arr[Math.floor(Math.random() * arr.length)];

/**
 * @function GetRandomStyle
 * @description Exported method for generating a random single style.
 * @return {Object} random style
 */
const NextArrayIndex = (length, currentIndex) => (++currentIndex === length) ? 0 : currentIndex;

/**
 * @function SetLocalStorage
 * @description Setting a value in a key in local storage.
 * @param {String} key
 * @param {*} val
 */
const SetLocalStorage = (key, val) => {
  localStorage[key] = val;
};

/**
 * @function AppendLocalStorage
 * @description Adding a value to a specific key at local storage.
 * @param {String} key
 * @param {*} val
 */
const AppendLocalStorage = (key, val) => {
  if (!localStorage[key]) {
    SetLocalStorage(key, val);
    return void(0);
  }
  const array = localStorage[key].split(',');
  if(!(val in array)) {
    array.push(val);
    localStorage[key] = array.join(',');
  }
};

/**
 * @function RemoveLocalStorage
 * @description Removing a value from specific key at local storage.
 * @param {String} key
 * @param {*} val
 */
const RemoveLocalStorage = (key, val) => {
  const array = localStorage[key].split(',');
  const index = array.indexOf(val);

  if(val in index) {
    array.splice(index, 1);
    localStorage[key] = array.join(',');
  }
};

/**
 * @function GetLocalStorage
 * @description Getting an object from Local Storage
 * @param {String} key
 */
const GetLocalStorage = key => localStorage[key];

/**
 * @function ArrayToLocalStorage
 * @description Storing an array of string to a key local storage
 * @param {String} key
 * @param {Array|*} val
 */
const ArrayToLocalStorage = (key, value) => {
  localStorage[key] = (value instanceof Array) ? value.join(',') : [value];
};

/**
 * @function ArrayFromLocalStorage
 * @description Getting an array of strings from local storage
 * @param {String} key
 */
const ArrayFromLocalStorage = key => {
  if(!localStorage[key]) {
    return [];
  }
  return localStorage[key].split(',');
};

export {
  RandomFrommArray,
  NextArrayIndex,
  SetLocalStorage,
  AppendLocalStorage,
  RemoveLocalStorage,
  GetLocalStorage,
  ArrayToLocalStorage,
  ArrayFromLocalStorage,
};