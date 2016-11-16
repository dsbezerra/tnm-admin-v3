import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as locationActions from '../../../actions/location';

import ActionList from '../../../components/ActionList';

import InsertLocation from './InsertLocation';
import SearchLocation from './SearchLocation';

class Location extends Component {

  constructor(props) {
    super(props);
  }
  
  render() {

    const {
      action,
      cities,
      states,
      onUpdateAction
    } = this.props;

    const actions = [
      { id: 'insert', text: 'Inserir Local', icon: 'add' },
      { id: 'search', text: 'Pesquisar Local', icon: 'search' }
    ];
    
    return (
      <div className="tnm-horizontal-layout">
        {
          this.props.children ||
          (action === 'insert' ? <InsertLocation /> : <SearchLocation />)
        }

        <ActionList actions={actions}
                    active={action}
                    onClick={action => onUpdateAction(action.id)}/>
        
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { location } = state;
  return location;
}

const mapDispatchToProps = (dispatch) => {

  const {
    fetchCities,
    fetchStates,
    onUpdateAction
  } = locationActions;

  const actions = {
    fetchCities,
    fetchStates,
    onUpdateAction
  }
  
  return bindActionCreators(actions, dispatch);
}

Location = connect(mapStateToProps, mapDispatchToProps)(Location);

export default Location;