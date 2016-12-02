import {
  NEURAL_ADD_INPUT,
  NEURAL_REMOVE_INPUT,
  NEURAL_UPDATE_INPUT,
  NEURAL_UPDATE_OUTPUT
} from '../constants/ActionTypes';

export function onAddInput() {
  return {
    type: NEURAL_ADD_INPUT,
  }
}

export function onRemoveInput(id) {
  return {
    type: NEURAL_REMOVE_INPUT,
    id,
  }
}

export function onUpdateInput(data) {
  return {
    type: NEURAL_UPDATE_INPUT,
    data,
  }
}

export function onUpdateOutput(data) {
  return {
    type: NEURAL_UPDATE_OUTPUT,
    data,
  }
}
