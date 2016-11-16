import React, { Component } from 'react';
import VelocityComponent from 'velocity-react/velocity-component';
import VelocityTransitionGroup from 'velocity-react/velocity-transition-group';
import _ from 'lodash';

import Toast from '../../components/UI/Toast/Toast';

class ToastManager extends Component {

  constructor(props) {
    super(props);
    this.state = {
      toasts: [],
      id: 0,
    };

    this.onAdd = this.onAdd.bind(this);
  }
  
  componentDidMount() {
    
  }

  onAdd() {
    const { toasts, id } = this.state;

    const newId = id + 1;

    const index = toasts.length;
    
    this.setState({
      toasts: [{ text: 'TOAST #' + newId, id: newId }, ...toasts],
      id: newId,
    });

    setTimeout(() => {
      this.onDismiss(this.state.toasts.length - 1);
    }, 2000);
  }

  onDismiss(index) {
    const { toasts } = this.state;

    const newToasts = toasts;
    newToasts.splice(index, 1);
    this.setState({
      toasts: newToasts
    })
  }

  render() {

    const {
      toasts
    } = this.state;

    const list = _.map(toasts, (toast, index) => {
      return (
        <Toast key={index}
               text={toast.text}
               onClick={this.onDismiss.bind(this, index)} />
      );
    });
    
    const mountAnimation = {
      animation: {
        opacity: [1, 0]
      },
      duration: 200
    };

    const toastAnimationProps = {
      enter: {
        animation: {
          translateY: ['0%', '100%'],
          opacity: [1, 0]
        },
        duration: 200
      },
      leave: {
        animation: {
          opacity: 0,
        },
        duration: 200
      }
    };
   
    return (
      <VelocityComponent component="div" runOnMount>
        <div className="tnm-toasts">
          <button onClick={this.onAdd} style={{ position: 'fixed', top: 0, left: 0 }}>Add</button>
          <VelocityTransitionGroup component="div" {...toastAnimationProps}>
            {list}
          </VelocityTransitionGroup>
        </div>
      </VelocityComponent>
    );
  }
}

export default ToastManager;