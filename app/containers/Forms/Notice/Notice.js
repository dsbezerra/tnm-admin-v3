import React, { Component } from 'react';
import VelocityTransitionGroup from 'velocity-react/velocity-transition-group';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as noticeActions from '../../../actions/notice';

import ActionList from '../../../components/ActionList';

import InsertNotice from './InsertNotice';
import SearchNotice from './SearchNotice';

class Notice extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    const {
      action,
      
      onUpdateAction
    } = this.props;
    
    const actions = [
      { id: 'insert', text: 'Inserir Licitação', icon: 'add' },
      { id: 'search', text: 'Pesquisar Licitação', icon: 'search' }
    ];

    return (
      <div className="tnm-horizontal-layout">
        
        {
          this.props.children ||
          (action ===  'insert' ? <InsertNotice /> : <SearchNotice />)
        }
        
        <ActionList actions={actions}
                    active={action}
                    onClick={action => onUpdateAction(action.id)}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { notice } = state;
  return notice;
}

const mapDispatchToProps = (dispatch) => {

  const {
    onUpdateAction
  } = noticeActions;

  const actions = {
    onUpdateAction,
  }
  
  return bindActionCreators(actions, dispatch);
}

Notice = connect(mapStateToProps, mapDispatchToProps)(Notice);

export default Notice;