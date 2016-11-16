/* localStorage alias */ 
let lStorage = {};

/**
 * Checks if the HTML5 Web Storage is supported by the browser
 */
const checkSupport = () => {
  try {
    const storage = window.localStorage,
          testItem = "__test__";

    storage.setItem(testItem, testItem);
    storage.removeItem(testItem);

    lStorage = storage;
    
    return true;
  } catch (e) {
    return false;
  }
}

const isSupported = checkSupport();

/**
 * Gets an item value from localStorage
 */
export const getItem = (item) => {
  if(isSupported) {
    try {
      const itemStringified = localStorage.getItem(item);
      const parsed = JSON.parse(itemStringified);
      return parsed;
    }
    catch (e) {
      return false;
    }
  }
  return false;
}

/**
 * Sets a value to a item in localStorage
 */
export const setItem = (item, value) => {
  if(isSupported) {
    try {
      const stringified = JSON.stringify(value);
      lStorage.setItem(item, stringified);
      return true;
    }
    catch (e) {
      return false;
    }
  }
  return false;
}

/**
 * Removes an item from localStorage
 */
export const removeItem = (item) => {
  if(isSupported) {
    try {
      lStorage.removeItem(item);
      return true;
    }
    catch (e) {
      return false;
    }
  }
  return false;
}