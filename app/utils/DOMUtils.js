import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import _ from 'lodash';

/**
 * Sets the style's attribute value
 * @param selector string Element selector
 * @param attribute string Attribute name
 * @param value string|number Attribute value
 */
export const setStyleAttributeValue = (selector, attribute, value) => {
  if(!canUseDOM)
    return;
  
  const node = document.querySelector(selector);
  if(typeof node.style[attribute] !== 'undefined'
     && typeof node.style[attribute] !== 'null') {
    node.style[attribute] = value;
  }
  else {
    throw new Error('Invalid Attribute');
  }
}

/**
 * Wrapper for getElementById
 */
export const getElementById = (id) => {
  if(!canUseDOM)
    return;
  
  return document.getElementById(id);
}

/**
 * Disables scroll of element
 */
export const disableScrollFrom = (selector) => {
  if(selector && canUseDOM) {
    setStyleAttributeValue(selector, 'overflow', 'hidden');
  }
}

/**
 * Enables scroll of element
 */
export const enableScrollFrom = (selector) => {
  if(selector && canUseDOM) {
    setStyleAttributeValue(selector, 'overflow', 'visible');
  }
}