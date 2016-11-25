import React from 'react';

import {
  Icon,
  Label,
} from '../components/UI';

const OsTypes = {
  ALL           : 'todos',
  ANDROID       : 'android',
  IOS           : 'ios',
  WINDOWS_PHONE : 'windows_phone',
}

const SubNames = {
  subscription_trial    : 'Trial',
  subscription_basic    : 'Básico',
  subscription_default  : 'Padrão',
  subscription_premium  : 'Premium',
}

export const getPhoneFormatted = (phone) => {

  if(!phone)
    return 'Não informado';
  
  const ddd = phone.substring(2, 4);
  const phoneNumber = phone.substring(4);
  return "(" + ddd + ") " + phoneNumber;
}

export const getNumStars = (subscription) => {

  let numStars = 0;
  let stars = [];

  switch(subscription) {
    case 'subscription_basic':
      numStars = 1;
      break;
    case 'subscription_default':
      numStars = 2;
      break;
    case 'subscription_premium':
      numStars = 3;
      break;
    default:
      break;
  }

  for(let i = 0; i < numStars; i++) {
    stars.push(<Icon key={i} name="star" />);
  }

  return stars;
}

export const getSubscriptioName = (subscription) => {

  let name = 'TRIAL';
  
  switch(subscription) {
    case 'subscription_basic':
      name = 'BÁSICO';
      break;
    case 'subscription_default':
      name = 'PADRÃO'
      break;
    case 'subscription_premium':
      name = 'PREMIUM'
      break;
    default:
      break;
  }

  return name;
}

export const getSegmentLabels = (segments) => {
  const labels = [];

  for(let i = 0; i < segments.length; i++) {
    labels.push(<Label key={i} text={segments[i]} className="tnm-user-card-segment" />);
  }

  if(labels.length === 0) {
    labels.push(<Label key={0} text="NENHUM SEGMENTO ESCOLHIDO" color="red" />);
  }
  
  return labels;
}
