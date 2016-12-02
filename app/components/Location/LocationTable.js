import React from 'react';
import _ from 'lodash';

import {
  Icon,
  Table,
  TableHead,
  TableHeader,
  TableBody,
  TableRow,
  TableCell
} from '../UI';

import HorizontalScroller from '../Scroller/HorizontalScroller';

function LocationTable(props) {
  
  const { cities, sort } = props;

  const headers = [
    { name: 'Cidade', sort: 'nome' },
    { name: 'Estado', sort: 'estados.nome' }
  ];
  
  const locationList = _.map(cities, (city, i) => {
    return (
      <TableRow key={city.id}>
        <TableCell className="city" text={city.nome} />
        <TableCell text={city.estados.nome} />
        <TableCell>
          <Icon className="clickable" name="mode_edit" />
          <Icon className="clickable" name="delete" />
        </TableCell>
      </TableRow>
    );
  });

  return (
    <HorizontalScroller>
      <Table className="tnm-table">
        <TableHead>
          <TableRow>
            <TableHeader header="Cidade"
                         active={props.sort.property === 'nome'}
                         className="city"
                         order={sort.order}
                         onClick={props.onHeaderClick.bind(this, 'nome')}
            />
            <TableHeader header="Estado"
                         className="state notClickable"
            />
            <TableHeader header="" /> 
          </TableRow>
        </TableHead>
        <TableBody>
          {locationList}
        </TableBody>
      </Table>
    </HorizontalScroller>
  );
}

export default LocationTable;