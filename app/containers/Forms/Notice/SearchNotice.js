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


import Filter from '../../../components/Filter';
import FilterGroup from '../../../components/Filter/FilterGroup';
import FilterField from '../../../components/Filter/FilterField';
import FilterButtons from '../../../components/Filter/FilterButtons';

import DropdownMenu from '../../../components/DropdownMenu';

class SearchNotice extends Component {

  constructor(props) {
    super(props);
    this.state = {
      reset: false,
    }
    
    this.onDeleteConfirm = this.onDeleteConfirm.bind(this);
    this.onApplyFilter = this.onApplyFilter.bind(this);
    this.onClearFilter = this.onClearFilter.bind(this);
  }

  componentDidMount() {
    const { segments, fetchSegments } = this.props;
    if(segments && segments.length === 0) {
      fetchSegments({ order: 'descricao ASC' });
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

  render() {

    const {
      isFetching
    } = this.props;

    return (
      <div className="tnm-main-content">
        <Header text="Pesquisar Licitação" />
        <Divider />

        {this.renderFilter()}

        <div className="tnm-section">
          <Header text="Licitações" />
          <Divider />

          {
            isFetching ? <CircularLoader size="small" /> :
            "Tabela de Licitações"
          }
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
    isFetchingSegments: segment.isFetching,
  }
}

const mapDispatchToProps = (dispatch) => {

  const {
    onUpdateSearchFilter,
    onApplySearchFilter,
    onClearSearchFilter,
  } = noticeActions;
  
  const actions = {
    fetchSegments,
    onUpdateSearchFilter,
    onApplySearchFilter,
    onClearSearchFilter,
  };

  return bindActionCreators(actions, dispatch);
}

SearchNotice = connect(mapStateToProps, mapDispatchToProps)(SearchNotice);

export default SearchNotice;