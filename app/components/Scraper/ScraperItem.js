import React from 'react';

import {
  getFormattedDate
} from '../../utils/DateUtils';

export default function ScraperItem(props) {

  const {
    scraper
  } = props;

  let statusClass = 'status';
  
  if(scraper.running) {
    statusClass += ' running';
  }
  else {
    statusClass += ' stopped';
  }
  
  return (
    <div className="tnm-scraper-item" onClick={props.onClick}>
      <div className="tnm-scraper-name">
        {scraper.name} 
      </div>
      <div className="tnm-scraper-last-run">
        {'Última execução: ' + getFormattedDate(scraper.lastRunDate, true)} 
      </div>
      <div className="tnm-scraper-info">
        <div className={statusClass}>{scraper.running ? 'EM EXECUÇÃO' : 'PARADO'}</div>
        <div className="results" onClick={props.onSeePending}>VER PENDENTES</div>
      </div>
    </div>
  );
}