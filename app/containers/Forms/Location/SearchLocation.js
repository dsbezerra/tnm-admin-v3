import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { showModalWithComponent, closeModal } from '../../../actions/modal';
import * as locationActions from '../../../actions/location';

import LocationTable from '../../../components/Location/LocationTable';
import EditLocation from './EditLocation';

import { toggleSortOrder } from '../../../utils/FilterUtils';

import {
  Button,
  CircularLoader,
  Divider,
  Header,
  Label,
  TextField,
} from '../../../components/UI';

import {
  Filter,
  FilterGroup,
  FilterField,
  FilterButtons,
} from '../../../components';

import DropdownMenu from '../../../components/DropdownMenu';
import Pagination from '../../../components/Pagination';
import Page from '../../../components/Pagination/Page';

class SearchLocation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      resetFilter: false,
    };
    
    this.onPageClick = this.onPageClick.bind(this);
    this.onApplyFilter = this.onApplyFilter.bind(this);
    this.onClearFilter = this.onClearFilter.bind(this);

    this.onHeaderClick = this.onHeaderClick.bind(this);
  }

  componentDidMount() {
    const {
      sort,
      limit,
      cities,
      states,
      numCities,
      numStates,
      fetchCities,
      fetchStates
    } = this.props;

    if(cities && numCities === 0) {
      fetchCities({
        order: `${sort.property} ${sort.order}`,
        limit: limit,
        include: 'estados',
      });
    }

    if(states && numStates === 0) {
      fetchStates({ order: 'nome ASC'  });
    }
  }

  onPageClick(page) {
    console.log(page);
  }

  onApplyFilter() {
    const {
      sort,
      filter,
      limit,
      fetchCities
    } = this.props;

    fetchCities({
      order: `${sort.property} ${sort.order}`,
      limit: limit,
      where: {
        ...filter,
      },
      include: 'estados',
    });
  }
  
  onClearFilter() {
    const { resetFilter } = this.state;
    this.setState({
      resetFilter: !resetFilter,
    });

    this.props.onClearSearchFilter();
  }

  onHeaderClick(property) {

    if(!property)
      return;

    const {
      sort,
      limit,
      filter,
      fetchCities,
      onChangeSort,
    } = this.props;

    let order = sort.property === property ? toggleSortOrder(sort.order) : 'DESC';
   
    onChangeSort({
      property: property,
      order: order,
    });

    fetchCities({
      order: `${property} ${order}`,
      limit: limit,
      where: {
        ...filter,
      },
      include: 'estados'
    });
  }

  renderFilter() {

    const {
      isFetchingStates,
      states,

      onUpdateSearchLimit,
      onUpdateSearchFilter,
    } = this.props;
    
    const stateList = _.map(states, (state, i) => {
      return {
        id: state.id,
        text: state.nome,
      }
    });

    const showItems = _.map([10, 25, 50], (item, i) => {
      return {
        id: item,
        text: item + '',
      }
    });
    
    return (
      <Filter key={this.state.resetFilter}>
        <FilterGroup>
          <FilterField>
            <Label text="Mostrar"/>
            <DropdownMenu items={showItems}
                          placeholder="10"
                          onChange={(value) => {
                              onUpdateSearchLimit(value.id)
                            }}
            />
          </FilterField>
          
          <FilterField>
            <Label text="Estado"/>
            <DropdownMenu items={stateList}
                          placeholder="Selecione um estado"
                          isLoading={isFetchingStates}
                          onChange={(value) => {
                              onUpdateSearchFilter({
                                property: 'estadoId',
                                value: value.id,
                              })
                            }}
            /> 
          </FilterField>

          <FilterButtons onApply={this.onApplyFilter}
                         onClear={this.onClearFilter}
          />
        </FilterGroup>
        
        
      </Filter>      
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
                         onHeaderClick={this.onHeaderClick}
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
    ...location.search,
    states: state.list,
    cities: city.list,
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
    
    onChangeSort,
    onUpdateSearchLimit,
    onUpdateSearchFilter,
    onClearSearchFilter,
    
  } = locationActions;

  const actions = {
    fetchCities,
    fetchStates,

    onChangeSort,
    onUpdateSearchLimit,
    onUpdateSearchFilter,
    onClearSearchFilter,
    
    showModalWithComponent,
    closeModal,
  };

  return bindActionCreators(actions, dispatch);
}

SearchLocation = connect(mapStateToProps, mapDispatchToProps)(SearchLocation);

export default SearchLocation;