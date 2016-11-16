import React, { PropTypes } from 'react';

function Button(props) {

  const {
    text,
    type,
    buttonType
  } = props;

  let clazz = 'tnm-button';

  if(type) {
    clazz += ' ' + type;
  }
  
  return (
    <button type={buttonType ? buttonType : 'button'}
            className={clazz}
            disabled={props.disabled}
            style={props.style}
            onClick={!props.disabled ? props.onClick : null}>
      {text}
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
}

export default Button;