import React from 'react';

export default function Pagination(props) {
  return (
    <div className="tnm-pagination-wrapper">
      <div className="tnm-pagination">
        {props.children}
      </div>
    </div>
  );
}