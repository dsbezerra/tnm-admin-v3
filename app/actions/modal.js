import {
  SHOW_MODAL,
  SHOW_MODAL_WITH_COMPONENT,
  HIDE_MODAL,
  CLOSE_MODAL,
  SET_MODAL,
  SET_MODAL_TEXT,
  SET_MODAL_TITLE,
  RESET_MODAL
} from '../constants/ActionTypes';

export function showModal() {
  return {
    type: SHOW_MODAL,
  }
}

export function showModalWithComponent(component) {
  return {
    type: SHOW_MODAL_WITH_COMPONENT,
    component
  }
}

export function hideModal() {
  return {
    type: HIDE_MODAL
  }
}

export function closeModal() {
  return {
    type: CLOSE_MODAL
  }
}

export function setModalTitle(title) {
  return {
    type: SET_MODAL_TITLE,
    title,
  }
}

export function setModalText(text) {
  return {
    type: SET_MODAL_TEXT,
    text
  }
}

export function resetModal() {
  return {
    type: RESET_MODAL
  }
}