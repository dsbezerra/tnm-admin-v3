import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { onChangeTopBarTitle, onChangePath } from '../../actions/main';

import TrainNetwork from './TrainNetwork';

class NeuralNetwork extends Component {

  constructor(props) {
    super(props);
  }
  
  componentDidMount() {

    const {
      onChangeTopBarTitle,
      onChangePath,
    } = this.props;

    if(onChangePath)
      onChangePath(location.pathname);
    
    if(onChangeTopBarTitle)
      onChangeTopBarTitle('Rede Neural');
  }
  
  render() {

    return (
      <div className="tnm-horizontal-layout"
           style={{marginTop: '50px', padding: '15px'}}>

        <TrainNetwork />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.tools.neuralNetwork,
  }
}

const mapDispatchToProps = (dispatch) => {

  const actions = {
    onChangeTopBarTitle,
    onChangePath,
  };

  return bindActionCreators(actions, dispatch);
}

NeuralNetwork = connect(mapStateToProps, mapDispatchToProps)(NeuralNetwork);

export default NeuralNetwork;