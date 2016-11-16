import React from 'react';
import _ from 'lodash';

import {
  formatDate,
  getModalityName,
} from '../../utils/NoticeUtils';

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

function renderHeader(headers, sort, onHeaderClick) {

  const list = _.map(headers, (header, i) => {
    return (
      <TableHeader key={i} header={header.name}
                   className={header.clazz}
                   active={sort === header.sort}
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

function renderRows(notice, i) {
  return (
    <TableRow key={notice.id}>
      <TableCell text={getModalityName(notice.modalidade)} />
      <TableCell text={notice.numero} />
      <TableCell text={notice.objeto} />
      <TableCell text={formatDate(notice.data)} />
      <TableCell>
        <Icon className="clickable" name="mode_edit" />
        <Icon className="clickable" name="delete" />
      </TableCell>
    </TableRow>
  );
}

function NoticeTable(props) {
  const { notices, sort, onHeaderClick } = props;

  const headers = [
    { name: 'Modalidade',         clazz: 'modality', sort: 'modalidade' },
    { name: 'Número',             clazz: 'number',   sort: 'numero' },
    { name: 'Objeto',             clazz: 'object',   sort: 'objeto' },
    { name: 'Data de Realização', clazz: 'date',     sort: 'data' },
    { name: '',                   clazz: 'actions' }
  ];

  return (
    <HorizontalScroller>
      <Table>
        {renderHeader(headers, sort, onHeaderClick)}
        <TableBody>
          {_.map(notices, renderRows)}
        </TableBody>
      </Table>
    </HorizontalScroller>
  );
}

export default NoticeTable;