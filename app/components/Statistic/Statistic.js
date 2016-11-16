import React from 'react';
import { Link } from 'react-router';


function getStatisticBody(props) {
  const { hoverText, text, value } = props;
  return (
    <div className="tnm-statistic">
      <div className="tnm-statistic-inner">
        <div className="tnm-statistic-content">
          <div className="tnm-statistic-value">{value}</div>
          <div className="tnm-statistic-text">{text}</div>
        </div>
        { hoverText ? <div className="tnm-statistic-hover">
          <span>{hoverText}</span>
        </div> : null }
      </div>
    </div>
  );
}

export default function Statistic(props) {

  const { pathname, href } = props;

  if(pathname) {
    return (
      <Link to={pathname}>
        {getStatisticBody(props)}
      </Link>
    );
  }

  if(href) {
    return (
      <a href={href} target="_blank">
        {getStatisticBody(props)}
      </a>
    );
  }
  
  return getStatisticBody(props);
}