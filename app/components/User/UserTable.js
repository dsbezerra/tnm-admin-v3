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

import {
  getSubscriptioName,
  getNumStars,
  getPhoneFormatted,
  getSegmentLabels,
} from '../../utils/UserUtils';

import { 
  getFormattedDate
} from '../../utils/DateUtils';

import HorizontalScroller from '../Scroller/HorizontalScroller';

function renderHeader(headers, sort, onHeaderClick) {

  const list = _.map(headers, (header, i) => {
    return (
      <TableHeader key={i} header={header.name}
                   className={header.clazz}
                   active={sort.property === header.sort}
                   order={sort.order}
                   onClick={onHeaderClick.bind(this, header.sort)}
      />
    );
  });

  return (
    <TableHead>
      <TableRow>
        {list}
      </TableRow>
    </TableHead>
  );
}

function UsersTable(props) {
  const {
    users,
    sort,
    onHeaderClick,
    onItemClick,
  } = props;

  const headers = [
    { name: 'Telefone',            clazz: 'phone',              sort: 'phone' },
    { name: 'E-mail',              clazz: 'email',              sort: 'email' },
    { name: 'Plano',               clazz: 'subscription',       sort: 'plano' },
    { name: 'Data de Registro',    clazz: 'activationDate',     sort: 'activationDate' },
    { name: 'SO',                  clazz: 'os',                 sort: 'deviceType' },
    { name: 'Segmentos',           clazz: 'segments' }
  ];
  
  const rows = _.map(users, (user, i) => {
    const stars = getNumStars(user.plano);
    return (
      <TableRow key={user.id} onClick={onItemClick.bind(this, user)}>
        <TableCell text={getPhoneFormatted(user.phone)} />
        <TableCell text={user.email ? user.email : 'Não informado'} />
        <TableCell>
          {stars.length === 0 ? 'Trial' : stars}
        </TableCell>
        <TableCell text={getFormattedDate(user.activationDate, true)} />
        <TableCell text={user.deviceType} />
        <TableCell className="segments">
          {getSegmentLabels(user.segmentoIds)}
        </TableCell>
      </TableRow>
    );
  });

  return (
    <HorizontalScroller>
      <Table className="user">
        {renderHeader(headers, sort, onHeaderClick)}
        <TableBody>
          {rows}
        </TableBody>
      </Table>
    </HorizontalScroller>
  );
}

export default UsersTable;