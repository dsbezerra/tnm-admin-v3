import React, { PropTypes } from 'react';

import Header from './Header';

function SlashHeader(props) {
  const { text, num } = props;

  var slashes = '//';
  if(num) {
    var _num = num;
    slashes = '';
    let i = 0;

    if(_num > 5)
      _num = 5;
    
    while(i < _num) {
      slashes += '/';
      ++i;
    }
  }
  
  return (
    <Header text={text}>
      <span className="slash">{slashes}</span>
    </Header>
  );
}

SlashHeader.propTypes = {
  text: PropTypes.string.isRequired,
  num: PropTypes.string
}

export default SlashHeader;