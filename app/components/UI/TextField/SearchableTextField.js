import React, { Component, PropTypes } from 'react';
import VelocityTransitionGroup from 'velocity-react/velocity-transition-group';

import _ from 'lodash';

import Icon from '../Icon';
import TextField from './TextField';

class SearchableTextField extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      focused: false
    }

    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
  }

  componentDidMount() {
    const { results } = this.props;
    if(results) {
      this.setState({
        visible: results.length > 0
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    let { visible } = this.state;
    if(nextProps.results) {
      visible = nextProps.results.length > 0;
    }
    else {
      visible = false;
    }
    
    this.setState({
      visible: visible
    });
  }

  onFocus(event) {
    this.setState({
      focused: true
    });
  }

  onBlur(event) {
    this.setState({
      focused: false
    });
  }

  onItemClick(item) {

    // Pass the clicked item to a parent component
    this.props.onItemClick && this.props.onItemClick(item);
    
    // Make sure if we using ref in
    // div[.tnm-textfield-search]
    const { textfield } = this.refs;
    if(textfield) {
      // This will only work if the first child of this component
      // is a TextField component
      const input = textfield.children[0];
      if(input) {
        input.value = item[0];
      }
    }
  }

  renderSearchResults() {
    const { results } = this.props;
    const { visible, focused } = this.state;

    const animProps = {
      enter: {
        animation: { opacity: 1,/*, scaleY: 1 */},
        duration: 400
      },
      leave: {
        animation: { opacity: 0,/*, scaleY: 0*/ },
        duration: 200,
      }
    };

    const resultList = _.map(results, (item, index) => {
      return <li key={index}
                 onClick={this.onItemClick.bind(this, [item, index])}>{item}</li>;
    }); 

    const show = focused && visible;
    
    return (
      <VelocityTransitionGroup component="div" {...animProps}>
        { show ?
          <div className="tnm-textfield-search-results" ref="resultList">
            <ul>
              {resultList}
            </ul>
          </div> : null }
      </VelocityTransitionGroup>
    );
  }
  
  render() {
    const {
      placeholder,
      icon,
      customClass
    } = this.props;
    
    return (
      <div className="tnm-textfield-search" ref="textfield">
        <TextField placeholder={placeholder}
                   className={this.props.className}
                   onChange={this.props.onChange}
                   onFocus={this.onFocus}
                   onBlur={this.onBlur}
        />

        <Icon name={icon ? icon : 'search'} onClick={this.props.onIconClick} />

        {this.renderSearchResults()}
        
      </div>
    );
  }
}

SearchableTextField.propTypes = {
  placeholder: PropTypes.string
}

export default SearchableTextField;