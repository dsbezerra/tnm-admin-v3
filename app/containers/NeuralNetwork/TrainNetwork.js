import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchSegments } from '../../actions/segment';
import * as neuralActions from '../../actions/neuralnetwork';

import {
  Button,
  Divider,
  Header,
  Icon,
  Label,

  TextField,
} from '../../components/UI';

import DropdownMenu from '../../components/DropdownMenu';

class TrainNetwork extends Component {

  constructor(props) {
    super(props);

    this.renderInputOutputItem = this.renderInputOutputItem.bind(this);
  }
  
  componentDidMount() {
    const {
      segments,
      fetchSegments
    } = this.props;

    if(_.isEmpty(segments)) {
      fetchSegments({ order: 'descricao ASC' });
    }
  }

  renderSegmentDropdownItems(segment) {
    return {
      id: segment.id,
      text: segment.descricao,
    }
  }

  renderInputOutputItem(i, data, segments, isFetchingSegments) {    

    const {
      onRemoveInput,
      onUpdateInput,
      onUpdateOutput,
    } = this.props;
    
    return (
      <li key={i} className="tnm-neuralNetwork-inputOutput">
        <div className="tnm-neuralNetwork-input">
          {i === 0 ? <Label>Entrada</Label> : null }
          <TextField className="dark"
                     placeholder="OBJETO DA LICITAÇÃO"
                     value={data ? data.input : null}
                     onChange={({ target }) => {
                         onUpdateInput({
                           id: data.id,
                           value: target.value
                         })
                       }}
          />
        </div>
        <div className="tnm-neuralNetwork-output">
          {i === 0 ? <Label>Saída</Label> : null }
          <DropdownMenu items={segments}
                        selected={data.output ? data.output.name : null}
                        placeholder="Selecione um segmento"
                        isLoading={isFetchingSegments}
                        onChange={(item) => {
                            onUpdateOutput({
                              id: data.id,
                              segment: {
                                id: item.id,
                                name: item.text,
                              }
                            })}}
          />
        </div>

        <Icon className="tnm-neuralNetwork-removeIcon"
              name="remove_circle_outline"
              onClick={() => { onRemoveInput(data.id) }}
        />
      </li>
    );
  }
  
  renderInputOutputList() {

    const {
      data,
      ids,
      count,
      segments,
      isFetchingSegments,
    } = this.props;

    const mappedSegments = _.map(segments, this.renderSegmentDropdownItems);
    
    const list = _.map(ids, (id, index) => {
      return this.renderInputOutputItem(index, data[id],
                                        mappedSegments,
                                        isFetchingSegments);
    });
    
    return (
      <ul key={count}>
        {list}
      </ul>
    );
  }
  
  render() {

    const {
      onAddInput,
    } = this.props;
    
    return (
      <div className="tnm-main-content">
        <Header text="Treinar Rede (Em desenvolvimento)" />
        <Divider />

        <Label>
          Para treinar a rede por favor entre com o(s) objeto(s) e seu(s) correspondente(s) segmento(s).
        </Label>

        <div className="tnm-neuralNetwork-newInput"
             onClick={() => { onAddInput(); }}>
          <Icon name="add" /> Nova Entrada
        </div>

        {this.renderInputOutputList()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.tools.neuralNetwork.train,
    segments: state.segment.list,
    isFetchingSegments: state.segment.isFetching,
  }
}

const mapDispatchToProps = (dispatch) => {

  const {
    onAddInput,
    onRemoveInput,
    onUpdateInput,
    onUpdateOutput,
  } = neuralActions;
  
  const actions = {
    fetchSegments,
    onAddInput,
    onRemoveInput,
    onUpdateInput,
    onUpdateOutput,
  };
  
  return bindActionCreators(actions, dispatch);
}

TrainNetwork = connect(mapStateToProps, mapDispatchToProps)(TrainNetwork);

export default TrainNetwork;