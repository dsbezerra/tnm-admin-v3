import React, { Component, PropTypes } from 'react';

class TextField extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isTyping: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
  }
  
  componentDidMount() {
    const { inputField } = this.refs;
    if(inputField) {
      const { value } = this.props;
      if(value) {
        inputField.value = value;
      }
    }
  }

  onFocus() {
    this.props.onFocus && this.props.onFocus();
    const labelNode = this.getLabelNode();
    if(labelNode) {
      labelNode.classList.add('active');
    }
  }

  onBlur() {
    this.props.onBlur && this.props.onBlur();
    
    const labelNode = this.getLabelNode();
    if(labelNode) {
      labelNode.classList.remove('active');
    }
  }

  getLabelNode() {
    const { name } = this.props;
    if(name) {
      const input = this.refs[name];
      if(input.previousSibling) {
        const sibling = input.previousSibling;
        if(sibling.tagName === 'LABEL') {
          return sibling;
        }
      }
    }
  }

  onChange(event) {

    event.persist();
    
    const { isTyping } = this.state;
    if(isTyping) {
      console.log('I\'m typing');
      return;
    }

    this.setState({
      isTyping: true,
    }, () => {
      setTimeout(() => {
        this.props.onChange && this.props.onChange(event);
        this.setState({
          isTyping: false,
        })
      }, 500)
    });    
  }

  render() {
    const {
      placeholder,
      password
    } = this.props;

    let clazz = 'tnm-textfield';
    if(this.props.className) {
      clazz += ' ' + this.props.className;
    }
    
    return (
      <input placeholder={placeholder}
             type={password ? 'password' : 'text'}
             className={clazz}
             id={this.props.id}
             name={this.props.name}
             ref="inputField"
             style={this.props.style}
             onChange={this.onChange}
             onBlur={this.onBlur}
             onFocus={this.onFocus}
      />
    );
  } 
}

TextField.propTypes = {
  placeholder: PropTypes.string
}

TextField.defaultProps = {
  password: false
}

export default TextField;