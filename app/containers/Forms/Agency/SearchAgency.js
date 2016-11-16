import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { showModalWithComponent, closeModal } from '../../../actions/modal';
import * as agencyActions from '../../../actions/agency';
import { fetchStates, fetchCitiesFromState } from '../../../actions/location';

import {
  Button,
  CircularLoader,
  Divider,
  Header,
  Label,
  TextField,
} from '../../../components/UI';

import Pagination from '../../../components/Pagination';
import Page from '../../../components/Pagination/Page';

import ConfirmationModal from '../../../components/Modal/ConfirmationModal';
import DropdownMenu from '../../../components/DropdownMenu/DropdownMenu';
import AgencyTable from '../../../components/Agency/AgencyTable';

import DeleteAgency from './DeleteAgency';

class SearchAgency extends Component {

  constructor(props) {
    super(props);

    this.onPageClick = this.onPageClick.bind(this);
    this.onUpdateStateFilter = this.onUpdateStateFilter.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onDeleteConfirm = this.onDeleteConfirm.bind(this);
  }

  componentDidMount() {
    const {
      agencies,
      states,
      fetchAgencies
    } = this.props;

    if(agencies && agencies.length === 0) {
      fetchAgencies({
        order: 'nome ASC',
        include: {
          relation: 'cidades',
          scope: {
            include: {
              relation: 'estados'
            }
          }
        }
      });
    }

    if(states && states.length === 0) {
      fetchStates({ order: 'nome ASC' });
    }
  }

  onUpdateStateFilter(item) {
    const { fetchCitiesFromState } = this.props;
    if(fetchCitiesFromState && item) {
      fetchCitiesFromState(item.id);
    }
  }
  
  onEdit(agency) {
    console.log(agency);
    const { editAgencySet, router } = this.props;
    if(editAgencySet && router && agency) {
      editAgencySet(agency);
      router.push('/forms/agency/edit/' + agency.id);
    }
  }

  onDelete(agency) {
    const { showModalWithComponent, closeModal } = this.props;
    showModalWithComponent(
      <ConfirmationModal title="Confirmação de Remoção"
                         onConfirm={this.onDeleteConfirm}
                         onCancel={closeModal}
      >
        <DeleteAgency agency={agency} />
      </ConfirmationModal>
    );
  }

  onDeleteConfirm() {

  }

  onPageClick(page) {
    const {
      agencies,
      pagination,
      onPaginationChange
    } = this.props;

    const numAgencies = agencies.length;
    const numPages = numAgencies / 25;

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

    onPaginationChange(newPagination);
    
  }

  renderPagination() {
    const {
      agencies,
      pagination
    } = this.props;

    const numAgencies = agencies.length;
    const numPages = numAgencies / 25;

    const { current } = pagination;

    const next = numPages > 1 && current < numPages - 1;
    const previous = current > 0 && numPages > 1;

    const first = current > 0;
    const last = current < numPages - 1;

    let pages = [];

    for(let i = 0; i < numPages; ++i) {
      pages.push(<Page key={i}
                       text={i + 1}
                       num={i}
                       active={pagination.current === i}
                       onClick={this.onPageClick}/>);
    }

    return (
      <Pagination>
      {first ? <Page key="first"
                        text="Primeira"
                        num="first"
                        onClick={this.onPageClick}/> : null}
      {previous ? <Page key="previous"
                        text="Anterior"
                        num="previous"
                        onClick={this.onPageClick}/> : null}
      {pages}
      {next ? <Page key="next"
                    text="Próxima"
                    num="next"
                    onClick={this.onPageClick}/> : null}
      {last ? <Page key="last"
                        text="Última"
                        num="last"
                        onClick={this.onPageClick}/> : null}
      </Pagination>
    );
    
  }
  
  renderFilter() {
    const {
      isFetching,
      isFetchingCitiesFromState,
      isFetchingStates,
      citiesFromState,
      states,
    } = this.props;
    
    const stateList = _.map(states, (state, i) => {
      return {
        id: state.id,
        text: state.nome,
      }
    });

    const cityList = _.map(citiesFromState, (city, i) => {
      return {
        id: city.id,
        text: city.nome,
      }
    });
    
    return (
      <div className="tnm-filter">
        <Header text="Filtro"/>
        
        <div className="tnm-filter-group">
          
          <div className="tnm-filter-field">

            <Label text="Estado"/>
            <DropdownMenu items={stateList}
                          placeholder="Selecione um estado"
                          isLoading={isFetchingStates}
                          onChange={this.onUpdateStateFilter}
            /> 
          </div>

          <div className="tnm-filter-field">
            
            <Label text="Cidade"/>
            <DropdownMenu items={cityList}
                          placeholder="Selecione uma cidade"
                          isLoading={isFetchingCitiesFromState}
            />
            
          </div>
          
          <div className="tnm-filter-buttons">
            <Button text="Aplicar mudanças" />
            <Button text="Limpar filtro" />
          </div>
        </div>
      </div>
    );
  }

  render() {

    const {
      agencies,
      isFetching,
      sort,
      searchSortChange,
      pagination
    } = this.props;

    const agenciesList = [];

    const start = pagination.current * 25;
    let end = start + 25;

    if(end >= agencies.length) {
      end = agencies.length - 1;
    }
    
    for(let i = start; i < end; ++i) {
      agenciesList.push(agencies[i]);
    }
    
    return (
      <div className="tnm-main-content">

        <Header text="Pesquisar Órgão" />

        <Divider />
        
        {this.renderFilter()}


        <div className="tnm-section">
          <Header text="Órgãos" />
          <Divider />

          { isFetching ? <CircularLoader size="small" /> :
            <AgencyTable agencies={agenciesList}
                         sort={sort}
                         onEdit={this.onEdit}
                         onDelete={this.onDelete}
                         onHeaderClick={(_sort) => { searchSortChange(_sort) }} />
          }
            {this.renderPagination()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => {
  const { agency, location } = reduxState;

  const {
    search,
    agencies,
    isFetching
  } = agency;

  const {
    state,
    citiesFromState,
    isFetchingCitiesFromState,
  } = location;
  
  return {
    ...search,
    agencies,
    citiesFromState,
    states: state.list,
    isFetchingStates: state.isFetching,
    isFetching,
    isFetchingCitiesFromState
  }
}

const mapDispatchToProps = (dispatch) => {

  const {
    fetchAgencies,
    searchSortChange,
    onPaginationChange,
    editAgencySet
  } = agencyActions;

  const actions = {
    editAgencySet,
    searchSortChange,
    onPaginationChange,
    fetchAgencies,
    fetchCitiesFromState,
    fetchStates,
    showModalWithComponent,
    closeModal
  };
  
  return bindActionCreators(actions, dispatch);
}

SearchAgency = connect(mapStateToProps, mapDispatchToProps)(SearchAgency);

export default withRouter(SearchAgency);