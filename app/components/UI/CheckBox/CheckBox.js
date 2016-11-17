import React, { Component, PropTypes } from 'react';

import Label from '../Label';

class CheckBox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      checked: false,
    }

    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    const { checked } = this.props;
    if(checked) {
      this.setState({
        checked,
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    const { checked } = this.props;
    if(checked != nextProps.checked) {
      this.setState({
        checked: nextProps.checked,
      });
    }
  }

  onClick(event) {
    // Set checked
    this.toggle(() => {
      // Runs parent onClick if exists
      const { checked } = this.state;
      this.props.onClick && this.props.onClick(checked);
    }); 
  }

  toggle(callback) {
    const { checked } = this.state;
    this.setState({
      checked: !checked
    }, callback);
  }
  
  render() {

    const { checked } = this.state;
    const {
      text
    } = this.props;

    const clazz = checked ? 'tnm-checkbox checked' : 'tnm-checkbox';
    
    return (
      <div className="tnm-checkbox-wrapper">
        <div className={clazz} onClick={this.onClick}>
	  <span></span>
        </div>
        <Label text={text} inline />
      </div>
    );
  }
}

CheckBox.propTypes = {
  text: PropTypes.string,
}

export default CheckBox;