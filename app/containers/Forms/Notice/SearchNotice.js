import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { ModalityOptions } from '../../../data/notice';

import { fetchSegments } from '../../../actions/segment';
import * as noticeActions from '../../../actions/notice';

import {
  CircularLoader,
  Divider,
  Grid,
  Header,
  Icon,
  Label,
  List,
  TextField,
  SearchableTextField,
  Select,
  CheckBox,
} from '../../../components/UI';

import Pagination from '../../../components/Pagination';
import Page from '../../../components/Pagination/Page';

import Filter from '../../../components/Filter';
import FilterGroup from '../../../components/Filter/FilterGroup';
import FilterField from '../../../components/Filter/FilterField';
import FilterButtons from '../../../components/Filter/FilterButtons';

import DropdownMenu from '../../../components/DropdownMenu';

import NoticeTable from '../../../components/Notice/NoticeTable';

class SearchNotice extends Component {

  constructor(props) {
    super(props);
    this.state = {
      reset: false,
    }
    this.onPageClick = this.onPageClick.bind(this);
    this.onDeleteConfirm = this.onDeleteConfirm.bind(this);
    this.onApplyFilter = this.onApplyFilter.bind(this);
    this.onClearFilter = this.onClearFilter.bind(this);
  }

  componentDidMount() {
    const {
      segments,
      notices,
      fetchSegments,
      fetchNotices
    } = this.props;
    
    if(segments && segments.length === 0) {
      fetchSegments({ order: 'descricao ASC' });
    }

    if(notices && notices.length === 0) {
      fetchNotices({ order: 'data DESC' });
    }
  }
  
  onDeleteConfirm() {}

  onApplyFilter() {

  }

  onClearFilter() {
    const { reset } = this.state;
    this.setState({
      reset: !reset,
    });

    this.props.onClearSearchFilter();
  }

  onUpdateSort() {
    console.log('sort');
  }

  onPageClick(page) {
    const {
      notices,
      pagination,
      onSearchPaginationChange,
    } = this.props;

    const numNotices = notices.length;
    const numPages = Math.floor(numNotices / 25);

    let newPagination = { ...pagination };
    if(page === 'first')
      newPagination.current = 0;
    else if(page === 'last')
      newPagination.current = numPages - 1;
    else if(page === 'next')
      newPagination.current += 1;
    else if(page === 'previous')
      newPagination.current -= 1;
    else 
      newPagination.current = page;

    onSearchPaginationChange(newPagination);
  }

  renderFilter() {

    const {
      segments,
      isFetchingSegments,

      onUpdateSearchFilter
    } = this.props;
    
    const segmentList = _.map(segments, (segment, i) => {
      return {
        id: segment.id,
        text: segment.descricao,
      }
    });

    return (
      <Filter key={this.state.reset}>
        <FilterField>
          <Label text="Modalidade" />
          <Select options={ModalityOptions}
                  className="dark"
                  onChange={(value) => {
                      onUpdateSearchFilter({
                        property: 'modality',
                        value
                      })
                    }}
          />
        </FilterField>
        
        <FilterGroup>
          <FilterField>
            <Label text="Segmento" />
            <DropdownMenu items={segmentList}
                          placeholder="Selecione um segmento"
                          isLoading={isFetchingSegments}
                          onChange={(value) => {
                              onUpdateSearchFilter({
                                property: 'segmentId',
                                value: value.id
                              })
                            }}
            />
          </FilterField>

          <FilterField>
            <Label text="Data de Início" />
            <TextField className="dark"
                       onChange={({ target }) => {
                           onUpdateSearchFilter({
                             property: 'startDate',
                             value: target.value,
                           })
                         }}
            />
          </FilterField>

          <FilterField>
            <Label text="Data de Término" />
            <TextField className="dark"
                       onChange={({ target }) => {
                           onUpdateSearchFilter({
                             property: 'endDate',
                             value: target.value,
                           })
                         }}
            />
          </FilterField>
        </FilterGroup>

        <FilterField>
          <CheckBox text="Exclusivo MPE"
                    onClick={(value) => {
                        onUpdateSearchFilter({
                          property: 'exclusive',
                          value: value,
                        })
                      }} />
        </FilterField>

        <FilterButtons onApply={this.onApplyFilter}
                       onClear={this.onClearFilter}
        />
      </Filter>
    );
  }

  renderPagination() {
    const {
      notices,
      pagination
    } = this.props;

    const numNotices = notices.length;
    const numPages = Math.floor(numNotices / 25);

    const { current } = pagination;

    const next = numPages > 1 && current < numPages - 1;
    const previous = current > 0 && numPages > 1;

    const first = current > 2;
    const last = current + 2 < numPages - 1;

    let pages = [];


    for (let i = current - 2; i < current + 3; ++i) {
      if(i >= 0 && i < numPages) {
        pages.push(<Page key={i}
                         text={i + 1}
                         num={i}
                         active={pagination.current === i}
                         onClick={this.onPageClick}/>);
      }
    }

    return (
      <Pagination>
        {previous ? <Page key="previous"
                          text="Anterior"
                          num="previous"
                          onClick={this.onPageClick}/> : null}
        {first ? <Page key="first"
                       text="1"
                       num="first"
                       onClick={this.onPageClick}/> : null}
        {first ? <span>...</span> : null }
        {pages}
        {last ? <span>...</span> : null }
        {last ? <Page key="last"
                      text={numPages}
                      num="last"
                      onClick={this.onPageClick}/> : null}
        {next ? <Page key="next"
                      text="Próxima"
                      num="next"
                      onClick={this.onPageClick}/> : null}
      </Pagination>
    );
  }

  render() {

    const {
      notices,
      isFetchingNotices,
      pagination,
    } = this.props;

    const noticesList = [];

    const start = pagination.current * 25;
    let end = start + 25;

    if(end >= notices.length) {
      end = notices.length - 1;
    }

    for(let i = start; i < end; ++i) {
      noticesList.push(notices[i]);
    }
    
    return (
      <div className="tnm-main-content">
        <Header text="Pesquisar Licitação" />
        <Divider />

        {this.renderFilter()}

        <div className="tnm-section">
          <Header text="Licitações" />
          <Divider />

          {
            isFetchingNotices ? <CircularLoader size="small" /> :
            <NoticeTable notices={noticesList}
                         sort="modality"
                         onHeaderClick={this.onUpdateSort}
            />
          }
            {this.renderPagination()}
        </div>
        
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { notice, segment } = state;

  return {
    ...notice.search,
    segments: segment.list,
    notices: notice.list,
    isFetchingSegments: segment.isFetching,
    isFetchingNotices: notice.isFetching,
  }
}

const mapDispatchToProps = (dispatch) => {

  const {
    fetchNotices,
    onUpdateSearchFilter,
    onApplySearchFilter,
    onClearSearchFilter,
    onSearchPaginationChange,
  } = noticeActions;
  
  const actions = {
    fetchSegments,
    fetchNotices,
    onUpdateSearchFilter,
    onApplySearchFilter,
    onClearSearchFilter,
    onSearchPaginationChange,
  };

  return bindActionCreators(actions, dispatch);
}

SearchNotice = connect(mapStateToProps, mapDispatchToProps)(SearchNotice);

export default SearchNotice;