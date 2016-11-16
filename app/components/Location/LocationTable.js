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

  let sortedList = cities;
  if(sort) {
    sortedList = _.sortBy(cities, [function(c) {
      const dotIndex = sort.indexOf('.');
      if(dotIndex > -1) {
        const splitted = sort.split('.');
        var index = 0, o = c;

        while(o != null && index < splitted.length) {
          o = o[splitted[index++]];
        }

        return o;
      }
      
      return c[sort]; 
    }]);
  }
  
  const locationList = _.map(sortedList, (city, i) => {
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
                         active={props.sort === 'nome'}
                         className="city"
                         onClick={props.onHeaderClick.bind(this, 'nome')}
            />
            <TableHeader header="Estado"
                         active={props.sort === 'estados.nome'}
                         className="state"
                         onClick={props.onHeaderClick.bind(this, 'estados.nome')}
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