import React, { PropTypes } from 'react';

function Label(props) {
  const {
    text,
    inline,
    color,
    className,
  } = props;

  let style = {...props.style};

  let clazz = 'tnm-label';

  if(inline) {
    style.display = 'inline-block';
  }

  if(color) {
    clazz += ' ' + color;
  }

  if(className) {
    clazz += ' ' + className;
  }
  
  return (
    <label htmlFor={props.forName}
           className={clazz}
           style={style}>
      {text || props.children}
    </label>
  );
}

Label.propTypes = {
  text: PropTypes.string
}

export default Label;