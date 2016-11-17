import React, { Component } from 'react';
import _ from 'lodash';

import Option from './Option';

class Select extends Component {

  constructor(props) {
    super(props);
    this.state = {
      active: -1,
    }
  }

  componentDidMount() {
    const { active } = this.props;
    if(active) {
      this.setState({
        active,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { active } = this.props;
    if(active != nextProps.active) {
      this.setState({
        active: nextProps.active,
      });
    }
  }

  setActive(index) {

    const { active } = this.state;
    
    const isActive = active === index;
    
    this.setState({
      active: isActive ? -1 : index,
    }, this.onChange);
  }

  onChange() {
    const { active } = this.state;
    this.props.onChange && this.props.onChange(active);
  }

  render() {

    const { active } = this.state;
    const { options } = this.props;

    let clazz = 'tnm-select';
    if(this.props.className) {
      clazz += ' ' + this.props.className;
    }

    const items = _.map(options, (option, index) => {
      return (
        <Option
            key={index}
            active={active === index}
            text={option.text}
            onClick={this.setActive.bind(this, index)}
        />
      );
    }); 
    
    return (
      <div className={clazz}>
        {items}
      </div>
    );
  }
}

export default Select;