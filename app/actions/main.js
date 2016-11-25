import {
  TOGGLE_NAVBAR,
  TOGGLE_ADMIN_CONTEXT_MENU,
  CHANGE_PATH,
  CHANGE_TOPBAR_TITLE,
} from '../constants/ActionTypes';

//
// Triggered when user clicks hamburguer icon or navbar shadow 
//
export function onToggleNavbar() {
  return {
    type: TOGGLE_NAVBAR,
  }
}

export function onToggleAdminContextMenu() {
  return {
    type: TOGGLE_ADMIN_CONTEXT_MENU,
  }
}

//
// Triggered when user clicks on a Navbar Item or the location pathname changes
//
export function onChangePath(path) {
  return {
    type: CHANGE_PATH,
    path,
  }
}

//
// Triggered whenever the user enters a page that contain a topbar title
//
export function onChangeTopBarTitle(title) {
  return {
    type: CHANGE_TOPBAR_TITLE,
    title
  }
}