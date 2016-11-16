import React, { Component } from 'react';
import _ from 'lodash';
import shortid from 'shortid';

import VelocityComponent from 'velocity-react/velocity-component';
import VelocityTransitionGroup from 'velocity-react/velocity-transition-group';

import {
  Label,
  Icon,
  SpinnerIcon,
} from '../UI';

import DropdownMenuItem from './DropdownMenuItem';

class DropdownMenu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: shortid.generate(),
      visible: false,
      selected: '',
    }

    this.onDocumentClick = this.onDocumentClick.bind(this);
    
    this.renderItems = this.renderItems.bind(this);
    this.toggleItemsVisibility = this.toggleItemsVisibility.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.isLoading && !nextProps.isLoading) {
      this.setState({
        selected: ''
      });
    }
  }

  componentDidMount() {
    document.documentElement.addEventListener('click', this.onDocumentClick);
  }

  componentWillUnmount() {
    document.documentElement.removeEventListener('click', this.onDocumentClick);
  }

  onDocumentClick(event) {    
    const { target } = event;
    if(target && target.id !== this.state.id) {
      this.setState({
        visible: false,
      });
    }
  }

  setSelected(item) {
    const { selected } = this.state;
    if(selected !== item.text)
      this.props.onChange && this.props.onChange(item);
    
    this.setState({
      selected: item.text,
      visible: false,
    });
  }

  toggleItemsVisibility() {
    const { visible } = this.state;
    this.setState({
      visible: !visible,
    });
  }

  renderItems() {

    const {
      items,
      isLoading
    } = this.props;
    
    if(items.length === 0) {
      return (
        <ul className="items">
          <DropdownMenuItem text="Sem resultados."
                            style={{ color: 'rgba(255, 255, 255, .2)'}}
          />
        </ul>
      );
    }

    const itemList = _.map(items, (item, i) => {
      return <DropdownMenuItem key={item.id}
                               text={item.text}
                               onClick={!isLoading ? this.setSelected.bind(this, item) : null}
             />
    });
    
    return (
      <ul className="items">
        {itemList}
      </ul>
    );
  }
  
  render() {

    const {
      id,
      visible,
      selected
    } = this.state;

    const {
      isLoading
    } = this.props;
    
    const animations = {
      enter: {
        animation: 'slideDown',
        duration: 200
      },
      leave: {
        animation: 'slideUp',
        duration: 100,
      },
    };

    const dropdownArrowAnim = {
      component: 'i',
      animation: {
        rotateZ: visible ? -180 : 0
      },
      duration: 1000,
      easing: 'spring',
    };
    
    return (
      <div className="tnm-dropdownmenu-wrapper">
        <div id={id}
             className="tnm-dropdown-menu"
             onClick={this.toggleItemsVisibility}>
          <Label text={selected ? selected : this.props.placeholder } inline />

          { isLoading ?
            <SpinnerIcon />
          : <VelocityComponent {...dropdownArrowAnim}>
              <Icon name="keyboard_arrow_down" />
            </VelocityComponent>
          }
        </div>
        <VelocityTransitionGroup component="div" {...animations}>
        { visible ? this.renderItems() : null }
        </VelocityTransitionGroup>
      </div>
      
    );
  }
}

export default DropdownMenu;
  
  
  