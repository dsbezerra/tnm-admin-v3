import React, { Component } from 'react';
import VelocityTransitionGroup from 'velocity-react/velocity-transition-group';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as segmentActions from '../../../actions/segment';

import ActionList from '../../../components/ActionList';

import InsertSegment from './InsertSegment';
import SearchSegment from './SearchSegment';

class Segment extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {}
  
  render() {
    const {
      action,
      segments,
      
      onUpdateAction
    } = this.props;
    
    const actions = [
      { id: 'insert', text: 'Inserir Segmento', icon: 'add' },
      { id: 'search', text: 'Pesquisar Segmento', icon: 'search' }
    ];

    return (
      <div className="tnm-horizontal-layout">
        
        {
          this.props.children ||
          (action ===  'insert' ? <InsertSegment /> : <SearchSegment />)
        }
        
        <ActionList actions={actions}
                    active={action}
                    onClick={action => onUpdateAction(action.id)}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { segment } = state;
  return segment;
}

const mapDispatchToProps = (dispatch) => {

  const {
    onUpdateAction
  } = segmentActions;

  const actions = {
    onUpdateAction,
  }
  
  return bindActionCreators(actions, dispatch);
}

Segment = connect(mapStateToProps, mapDispatchToProps)(Segment);

export default Segment;