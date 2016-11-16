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

function renderHeader(props, headers) {

  const list = _.map(headers, (header, i) => {
    return (
      <TableHeader key={i} header={header.name}
                   className={header.clazz}
                   active={props.sort === header.sort}
                   onClick={props.onHeaderClick.bind(this, header.sort)}/>
    );
  })

  return list;
}

function renderHeaders(header, i) {
  return (
    <TableHeader key={i} header={header.name} className={header.clazz} onClick={props.o}/> 
  );
}

function renderAgencies(agency, i) {
  
}

function AgencyTable(props) {

  const { agencies, sort } = props;

  const headers = [
    { name: 'Sigla', clazz: 'initials', sort: 'sigla' },
    { name: 'Nome', clazz: 'agency', sort: 'nome'},
    { name: 'Cidade', clazz: 'city' , sort: 'cidades.nome'},
    { name: 'Estado', clazz: 'state', sort: 'cidades.estados.nome'},
    { name: '', clazz: 'actions' },
  ];

  let sortedList = agencies;
  if(sort) {
    sortedList = _.sortBy(agencies, [function(a) {
      const dotIndex = sort.indexOf('.');
      if(dotIndex > -1) {
        const splitted = sort.split('.');
        var index = 0, o = a;

        while(o != null && index < splitted.length) {
          o = o[splitted[index++]];
        }

        return o;
      }
      
      return a[sort]; 
    }]);
  }


  const agencyList = _.map(sortedList, (agency, i) => {
    return (
      <TableRow key={agency.id}>
        <TableCell className="initials" text={agency.sigla.toUpperCase()} />
        <TableCell text={agency.nome} />
        <TableCell text={agency.cidades.nome} />
        <TableCell text={agency.cidades.estados.nome} />
        <TableCell>
          <Icon className="clickable" name="mode_edit" onClick={props.onEdit.bind(this, agency)} />
          <Icon className="clickable" name="delete" onClick={props.onDelete.bind(this, agency)}/>
        </TableCell>
      </TableRow>
    );
  });
  
  return (
    <HorizontalScroller>
      <Table className="tnm-table">
        <TableHead>
          <TableRow>
            {renderHeader(props, headers)}
          </TableRow>
        </TableHead>
        
        <TableBody>
          {agencyList}
        </TableBody>
      </Table>
    </HorizontalScroller>
  );
}

export default AgencyTable;