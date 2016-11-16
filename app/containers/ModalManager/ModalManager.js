import React, { Component } from 'react';
import _ from 'lodash';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import VelocityTransitionGroup from 'velocity-react/velocity-transition-group';

import Modal from '../../components/Modal';

import * as modalActions from '../../actions/modal';

class ModalManager extends Component {
  
  render() {

    const {
      title,
      text,
      buttons,
      visible,

      component,
      
      hideModal,
    } = this.props;

    const _buttons = buttons.length > 0 ? buttons : [{ text: 'Fechar', onClick: () => { hideModal(); }}];

    const animation = {
      enter: {
        animation: {
          opacity: [1, 0],
        },
        duration: 400,
      },
      leave: {
        animation: { opacity: 0 },
        duration: 150,
      }
    }
    
    return (
      <VelocityTransitionGroup {...animation}>
        { visible ? <div className="backdrop">
          {!_.isEmpty(component) ? component :
           <Modal title={title} buttons={_buttons}>
             {text}
           </Modal>
          }
        </div> : null }
      </VelocityTransitionGroup>      
    );
  }
}

const mapStateToProps = (state) => {
  const { modal } = state;
  return {
    ...modal
  };
}

const mapDispatchToProps = (dispatch) => {
  const {
    hideModal,
  } = modalActions;

  const actions = {
    hideModal
  };
  
  return bindActionCreators(actions, dispatch);
}

ModalManager = connect(mapStateToProps, mapDispatchToProps)(ModalManager);

export default ModalManager;