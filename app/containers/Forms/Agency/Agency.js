import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as agencyActions from '../../../actions/agency';

import ActionList from '../../../components/ActionList';

import InsertAgency from './InsertAgency';
import SearchAgency from './SearchAgency';

class Agency extends Component {

  constructor(props) {
    super(props);
    this.onActionClick = this.onActionClick.bind(this);
  }

  onActionClick(action) {
    
  }
  
  render() {
    const {
      agencies,      
      action,
      
      onUpdateAction
    } = this.props;

    const actions = [
      { id: 'insert', text: 'Inserir Órgão', icon: 'add' },
      { id: 'search', text: 'Pesquisar Órgão', icon: 'search' }
    ];
    
    return (
      <div className="tnm-horizontal-layout">
        {
          this.props.children ||
          (action === 'insert' ? <InsertAgency /> : <SearchAgency />)
        }
        <ActionList actions={actions}
                    active={action}
                    onClick={action => onUpdateAction(action.id)} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { agency } = state;
  return {
    agencies: agency.agencies,
    isFetching: agency.isFetching,
    action: agency.action,
  };
}

const mapDispatchToProps = (dispatch) => {

  const {
    onUpdateAction
  } = agencyActions;

  const actions = {
    onUpdateAction
  };
  
  return bindActionCreators(actions, dispatch);
}

Agency = connect(mapStateToProps, mapDispatchToProps)(Agency);

export default Agency;