import React from 'react';
import _ from 'lodash';

import {
  getSubscriptioName,
  getNumStars,
  getPhoneFormatted,
  getSegmentLabels,
} from '../../utils/UserUtils';

import { 
  getFormattedDate
} from '../../utils/DateUtils';

export default function UserCard(props) {

  const {
    user
  } = props;
  
  return (
    <div className="tnm-user-card" onClick={props.onClick}>
      <div className="tnm-user-card-details-top">
        <div className="tnm-user-card-phone">
          {user.phone ? getPhoneFormatted(user.phone) : 'Não informado'}
        </div>
        <div className="tnm-user-card-email">
          {user.email ? user.email : 'Não informado'}
        </div>
        <div className="tnm-user-card-register-date">
          {user.activationDate ? getFormattedDate(user.activationDate) : '-'}
        </div>
      </div>
      <div className="tnm-user-card-chosen-segments">
        {getSegmentLabels(user.segmentoIds)}
      </div>
      <div className="tnm-user-card-details-bottom">
        <div className="tnm-user-card-device-info">
          <div className="tnm-label yellow">{getSubscriptioName(user.plano)}</div>
          {user.deviceType ? <div className="tnm-label green">{user.deviceType}</div> : null }
        </div>

        <div className="tnm-user-card-subscription">
          {getNumStars(user.plano)}
        </div>

        <div className="tnm-user-card-see-details">
          VER DETALHES
        </div>
      </div>
    </div>
  );
}