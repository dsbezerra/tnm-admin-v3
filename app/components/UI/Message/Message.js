import React, { PropTypes } from 'react';

import Icon from '../Icon';

const TYPES = [
  'error',
  'success',
  'info',
  'warning'
]

function Message(props) {

  const {
    type,
    title,
    message,
  } = props;

  let finalClassName = 'tnm-message';

  let icon = '';
  if(type) {
    finalClassName
      += ' ' + type
    ;

    if(type === 'error') {
      icon = 'error';
    }
    else if(type === 'success') {
      icon = 'done';
    }
    else if (type === 'info') {
      icon = 'info';
    }
    else if (type === 'warning') {
      icon = 'warning';
    }
  }

  console.log(finalClassName);
  
  return (
    <div className={finalClassName}>
      <div className="tnm-message-inner">
        <div className="tnm-message-close">
          <i className="material-icons">close</i>
        </div>

        <div className="icon">
          <i className="material-icons">{icon}</i>
        </div>

        <div className="content">
          <h3>{title}</h3>
          <p>{message}</p>
        </div>        
      </div>
    </div>
  );
}

Message.propTypes = {
  type: PropTypes.oneOf(TYPES).isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired
}

export default Message;