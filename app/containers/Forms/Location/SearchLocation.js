import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { showModalWithComponent, closeModal } from '../../../actions/modal';
import * as locationActions from '../../../actions/location';

import LocationTable from '../../../components/Location/LocationTable';
import EditLocation from './EditLocation';

import {
  Button,
  CircularLoader,
  Divider,
  Header,
  Label,
  TextField,
} from '../../../components/UI';

import DropdownMenu from '../../../components/DropdownMenu';
import Pagination from '../../../components/Pagination';
import Page from '../../../components/Pagination/Page';

class SearchLocation extends Component {

  constructor(props) {
    super(props);

    this.onUpdateShowFilter = this.onUpdateShowFilter.bind(this);
    this.onUpdateStateFilter = this.onUpdateStateFilter.bind(this);

    this.onPageClick = this.onPageClick.bind(this);
  }

  componentDidMount() {
    const {
      cities,
      states,
      numCities,
      numStates,
      fetchCities,
      fetchStates
    } = this.props;

    if(cities && numCities === 0) {
      fetchCities({ order: 'nome ASC', include: 'estados' });
    }

    if(states && numStates === 0) {
      fetchStates({ order: 'nome ASC'  });
    }
  }

  onUpdateStateFilter() {

  }

  onUpdateShowFilter() {

  }

  onPageClick(page) {
    console.log(page);
  }

  renderFilter() {

    const {
      isFetchingStates,
      states,
    } = this.props;
    
    const stateList = _.map(states, (state, i) => {
      return {
        id: state.id,
        text: state.nome,
      }
    });

    const showItems = _.map([25, 50, 100, -1], (item, i) => {
      return {
        id: item,
        text: item > -1 ? parseInt(item) : 'Todos'
      }
    });
    
    return (
      <div className="tnm-filter">
        <Header text="Filtro" />

        <div className="tnm-filter-group">

          <div className="tnm-filter-field">

            <Label text="Mostrar"/>
            <DropdownMenu items={showItems}
                          placeholder="25"
                          onChange={this.onUpdateShowNumber}
            /> 
          </div>
          
          <div className="tnm-filter-field">

            <Label text="Estado"/>
            <DropdownMenu items={stateList}
                          placeholder="Selecione um estado"
                          isLoading={isFetchingStates}
                          onChange={this.onUpdateStateFilter}
            /> 
          </div>
        </div>
      </div>
      
    );
  }

  render() {

    const {
      cities,
      sort,
      searchSortChange,
      isFetchingCities,
    } = this.props;
    
    return (
      <div className="tnm-main-content">
        <Header text="Pesquisar Local" />

        <Divider />
        {this.renderFilter()}
        
        <Header text="Locais" />
   
        <Divider className="section" />
        
        { isFetchingCities ?
          <CircularLoader size="small" />
        : <LocationTable cities={cities}
                         sort={sort}
                         onHeaderClick={(_sort) => { searchSortChange(_sort) }}
          />
        }

        
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => {
  const { location } = reduxState;

  const { city, state } = location;
  
  return {
    states: state.list,
    cities: city.list,
    ...location.search,
    isFetchingStates: state.isFetching,
    isFetchingCities: city.isFetching,
    numCities: city.numCities,
    numStates: state.numStates
  }
}

const mapDispatchToProps = (dispatch) => {
  const {
    fetchCities,
    fetchStates,
    searchSortChange
  } = locationActions;

  const actions = {
    fetchCities,
    fetchStates,
    showModalWithComponent,
    closeModal,
    searchSortChange
  };

  return bindActionCreators(actions, dispatch);
}

SearchLocation = connect(mapStateToProps, mapDispatchToProps)(SearchLocation);

export default SearchLocation;