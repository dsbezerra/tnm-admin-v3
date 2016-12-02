import React, { PropTypes } from 'react';

function Icon(props) {

  const { name, tooltipText } = props;

  let clazz = 'material-icons tnm-icon';
  
  if(props.className) {
    clazz += ' ' + props.className;
  }
  
  return (
    <i className={clazz}
       style={props.style}
       onClick={props.onClick}>
      {name}
    </i>
  );
}

Icon.propTypes = {
  name: PropTypes.string.isRequired
}

export default Icon;