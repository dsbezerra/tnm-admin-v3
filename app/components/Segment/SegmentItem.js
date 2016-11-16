import React from 'react';

import { Icon } from '../UI';

export default function SegmentItem(props) {

  const { segment } = props;
  
  return (
    <div className="tnm-segment-item">
      <div className="tnm-segment-item-bg"
           style={{ backgroundImage: 'url(\'' + segment.bg + '\')' }}></div>
      <div className="tnm-segment-item-content">
        <div className="tnm-segment-item-icon">
          <img src={segment.icon} />
        </div>
        <div className="tnm-segment-item-name">
          {segment.name}
        </div>
      </div>
      <div className="tnm-segment-item-actions">
        <Icon name="mode_edit" onClick={props.onEditClick}/>
        <Icon name="delete" onClick={props.onDeleteClick} />
      </div>      
    </div>
  );
}