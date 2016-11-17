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

function NoticeTable(props) {
  const {
    notices,
    sort,
    onHeaderClick,
    onItemClick,
  } = props;

  const headers = [
    { name: 'Modalidade',         clazz: 'modality', sort: 'modalidade' },
    { name: 'Número',             clazz: 'number',   sort: 'numero' },
    { name: 'Objeto',             clazz: 'object',   sort: 'objeto' },
    { name: 'Data de Realização', clazz: 'date',     sort: 'data' },
    { name: '',                   clazz: 'actions' }
  ];

  const rows = _.map(notices, (notice, i) => {
    return (
      <TableRow key={notice.id} onClick={onItemClick.bind(this, notice)}>
        <TableCell text={getModalityName(notice.modalidade)} />
        <TableCell text={notice.numero} />
        <TableCell text={notice.objeto} />
        <TableCell text={formatDate(notice.data)} />
        <TableCell>
          <Icon className="clickable"
                name="mode_edit"
                onClick={props.onEdit.bind(this, notice)} />
          <Icon className="clickable"
                name="delete"
                onClick={props.onDelete.bind(this, notice)} />
        </TableCell>
      </TableRow>
    );
  });

  return (
    <HorizontalScroller>
      <Table>
        {renderHeader(headers, sort, onHeaderClick)}
        <TableBody>
          {rows}
        </TableBody>
      </Table>
    </HorizontalScroller>
  );
}

export default NoticeTable;