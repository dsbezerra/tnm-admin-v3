import React, { PropTypes } from 'react';

function Label(props) {
  const { text, inline } = props;

  let style = {...props.style};

  if(inline) {
    style.display = 'inline-block';
  }
  
  return (
    <label htmlFor={props.forName}
           className="tnm-label"
           style={style}>
      {text}
    </label>
  );
}

Label.propTypes = {
  text: PropTypes.string.isRequired
}

export default Label;