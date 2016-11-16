import React, { PropTypes } from 'react';

import Icon from '../Icon';

function TabArrow(props) {
  const { dir } = props;
  let finalClassName = 'tnm-tab-arrow ' + dir;
  
  return (
    <div className={finalClassName}
         onClick={props.onClick}>
      <Icon name={'keyboard_arrow_' + dir} />
    </div>
  );
}

TabArrow.propTypes = {
  dir: PropTypes.string.isRequired
}

export default TabArrow;