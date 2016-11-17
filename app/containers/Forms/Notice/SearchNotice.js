import React, { Component } from 'react';
import _ from 'lodash';
import VelocityComponent from 'velocity-react/velocity-component';
import VelocityTransitionGroup from 'velocity-react/velocity-transition-group';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { ModalityOptions } from '../../../data/notice';
import {
  formatAmount,
  formatAgency,
  formatDate,
  getModalityName
} from '../../../utils/NoticeUtils';

import { showModalWithComponent, closeModal } from '../../../actions/modal';
import { fetchSegments } from '../../../actions/segment';
import * as noticeActions from '../../../actions/notice';

import {
  Button,
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

import ConfirmationModal from '../../../components/Modal/ConfirmationModal';
import DropdownMenu from '../../../components/DropdownMenu';

import NoticeTable from '../../../components/Notice/NoticeTable';
import RightDrawer from '../../../components/Drawer/RightDrawer';

import DeleteNotice from './DeleteNotice';

class SearchNotice extends Component {

  constructor(props) {
    super(props);
    this.state = {
      reset: false,
    }
    
    this.onDrawerClose = this.onDrawerClose.bind(this);

    this.onItemClick = this.onItemClick.bind(this);
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
      fetchNotices({
        order: 'data DESC',
        limit: 20,
        include: ['segmentos', {
          relation: 'orgaos',
          scope: {
            include: {
              relation: 'cidades',
              scope: {
                include: 'estados'
              }
            }
          }
        }]
      });
    }
  }
  
  onDeleteConfirm(notice) {
    // TODO(diego): Request deleteNoticeById
    console.log(notice);
    const { closeModal } = this.props;
    closeModal();
  }

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

  onItemClick(notice) {
    const { onSelectedSearchChange } = this.props;
    onSelectedSearchChange(notice);
  }

  onDelete(notice, event) {
    // Stop propagation to avoid firing TableRow click event
    event.stopPropagation();

    // Show modal with options here
    const { showModalWithComponent, closeModal } = this.props;
    showModalWithComponent(
      <ConfirmationModal title="Confirmação de Remoção"
                         onConfirm={() => { this.onDeleteConfirm(notice) }}
                         onCancel={closeModal}
      >
        <DeleteNotice notice={notice} />
      </ConfirmationModal>
    );
  }
  
  onEdit(notice, event) {

    // Stop propagation to avoid firing TableRow click event
    if(event)
      event.stopPropagation();
    
    const { onEditNoticeSet, router } = this.props;
    if(notice && onEditNoticeSet && router) {
      onEditNoticeSet(notice);
      router.push('/forms/notice/edit/' + notice.id);
    }
  }

  onDrawerClose() {
    const { onSelectedSearchChange } = this.props;
    onSelectedSearchChange({});
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
      selected,
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

    const drawerAnimationProps = {
      component: 'div',
      animation: {
        translateX: !_.isEmpty(selected) ? '0%' : '100%',
        opacity: !_.isEmpty(selected) ? 1 : 0
      },
      duration: 200,
      runOnMount: false,
    }

    const itemAnimationProps = {
      component: 'div',
      enter: {
        animation: {
          opacity: [1, 0],
          translateY: ['0%', '-20%']
        },
        duration: 400,
        delay: 200,
        easing: 'ease-in-out',
      },
      leave: {
        animation: {
          opacity: 0,
        },
        duration: 200,
        easing: 'ease-in-out',
      }
    };
    
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
                         onItemClick={this.onItemClick}
                         onEdit={this.onEdit.bind(this)}
                         onDelete={this.onDelete.bind(this)}
            />
          }
            {this.renderPagination()}
        </div>

        <VelocityComponent {...drawerAnimationProps}>
          <RightDrawer header="Detalhes da Licitação" onDrawerClose={this.onDrawerClose}>
            <Divider />
            <div className="drawer-content">

              <VelocityTransitionGroup {...itemAnimationProps}>
                { !_.isEmpty(selected) ?
                  <div className="item-group">
                    <div className="item">
                      <div className="item-header">ID da Licitação</div>
                      <div className="item-value">{selected.id}</div>
                    </div> 

                    <div className="item">
                      <Button type="primary"
                              color="red"
                              text="DELETAR"
                              onClick={this.onDelete.bind(this, selected)}
                      />
                    </div>

                    <div className="item">
                      <Button type="secondary"
                              color="blue"
                              text="EDITAR"
                              onClick={this.onEdit.bind(this, selected)}
                      />
                    </div>
                    
                  </div> : null }
              </VelocityTransitionGroup>
              
              <Divider />

              <VelocityTransitionGroup {...itemAnimationProps}>
                { !_.isEmpty(selected) ?
                  <div className="item-group">
                    <div className="item">
                      <div className="item-header">Modalidade</div>
                      <div className="item-value">{getModalityName(selected.modalidade)}</div>
                    </div>
                    
                    <div className="item">
                      <div className="item-header">Número</div>
                      <div className="item-value">{selected.numero}</div>
                    </div>
                    
                    <div className="item">
                      <div className="item-header">Data de realização</div>
                      <div className="item-value">{formatDate(selected.data)}</div>
                    </div>
                    
                    <div className="item">
                      <div className="item-header">Segmento</div>
                      <div className="item-value">{selected.segmentos.descricao}</div>
                    </div>
                    
                    <div className="item">
                      <div className="item-header">Valor estimado</div>
                      <div className="item-value">{formatAmount(selected.valor)}</div>
                    </div>
                  </div>
                  : null }
              </VelocityTransitionGroup>
              
              <Divider />

              <VelocityTransitionGroup {...itemAnimationProps}>
                { !_.isEmpty(selected.orgaos) ?
                  <div className="item">
                    <div className="item-header">Local</div>
                    <div className="item-value">
                      <p>{selected.orgaos.nome}</p>
                      <p>{`${selected.orgaos.cidades.nome} - ${selected.orgaos.cidades.estados.nome}`}</p>
                    </div>
                  </div>
                  : null }
              </VelocityTransitionGroup>
              
              <Divider />

              <VelocityTransitionGroup {...itemAnimationProps}>
                { !_.isEmpty(selected) ?
                  <div className="item">
                    <div className="item-header">Objeto</div>
                    <div className="item-value">
                      {selected.objeto}
                    </div>
                  </div>
                  : null }
              </VelocityTransitionGroup>
              
              <Divider />

              <VelocityTransitionGroup {...itemAnimationProps}>
                { !_.isEmpty(selected) ?
                  <div className="item-group">
                    <div className="item">
                      <div className="item-header">Exclusivo para MPE</div>
                      <div className="item-value">
                        <Label text={selected.exclusivo ? 'SIM' : 'NÃO'}
                               color={selected.exclusivo ? 'green' : 'red'} />
                      </div>
                    </div>
                  </div>
                  : null }
              </VelocityTransitionGroup>
              
              <Divider />
              
              <div className="item">

                <a href={selected.link} target="_blank">
                  <Button type="dark" text="VISUALIZAR EDITAL" />
                </a>
              </div>
            </div>           
            
          </RightDrawer>
        </VelocityComponent>
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
    onSelectedSearchChange,


    onEditNoticeSet,
    
  } = noticeActions;
  
  const actions = {

    showModalWithComponent,
    closeModal,
    
    fetchSegments,
    fetchNotices,
    onUpdateSearchFilter,
    onApplySearchFilter,
    onClearSearchFilter,
    onSearchPaginationChange,
    onSelectedSearchChange,

    onEditNoticeSet
  };

  return bindActionCreators(actions, dispatch);
}

SearchNotice = connect(mapStateToProps, mapDispatchToProps)(SearchNotice);

export default withRouter(SearchNotice);