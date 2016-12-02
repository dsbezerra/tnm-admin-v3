import React from 'react';

import {
  Icon
} from '../UI';

export default function SimplePagination(props) {

  const {
    currentPage,
    visible,
    totalItems,
    itemsPerPage,
  } = props;

  let first = currentPage * itemsPerPage + 1;
  if(first > totalItems)
    first = totalItems;
  
  let to = first + itemsPerPage - 1;
  if(to > totalItems)
    to = totalItems;
  
  const hasPrevious = currentPage > 0;
  const hasNext = to < totalItems;

  return (
    <div className="tnm-bottom-pagination">

      <div className="tnm-page-info">
        <span>{first} a {to} de {totalItems}</span>
      </div>
      
      <div className="tnm-page-arrows">
        <Icon name="keyboard_arrow_left"
              className={!hasPrevious ? 'disabled' : null}
              onClick={hasPrevious ? props.onPrevious : null}
        />
        <Icon name="keyboard_arrow_right"
              className={!hasNext ? 'disabled' : null}
              onClick={hasNext ? props.onNext : null}
        />
      </div>
    </div>
  );
}