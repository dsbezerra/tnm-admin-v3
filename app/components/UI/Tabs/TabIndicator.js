import React, { PropTypes } from 'react';

function TabIndicator(props) {
  const { leftX, width } = props;

  const style = {
    width: width,
    left: leftX
  }
  
  return (
    <span className="tnm-tab-indicator"
          style={style}>
    </span>
  );
}

TabIndicator.propTypes = {
  leftX: PropTypes.string.isRequired
}

TabIndicator.defaultProps = {
  leftX: '0px'
}

export default TabIndicator;