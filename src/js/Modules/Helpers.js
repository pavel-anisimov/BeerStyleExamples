/**
 * @file Helpers.js
 * @description Helper/Utility Methods
 * @author Pavel Anisimov
 * @copyright Pavel Anisimov 2017-2018
 */
import Styles from './Styles';

/**
 * @function randomFrommArray
 * @description Generates a random object from array.
 * @param {Array} arr - array of objects
 * @return {Object} - random element
 */
const randomFrommArray = arr => arr[Math.floor(Math.random() * arr.length)];

/**
 * @function GetRandomStyle
 * @description Exported method for generating a random single style.
 * @return {Object} random style
 */
const GetRandomStyle = () => randomFrommArray(Styles);

export { GetRandomStyle };