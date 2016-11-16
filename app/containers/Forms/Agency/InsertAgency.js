import React, { Component } from 'react';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as agencyActions from '../../../actions/agency';
import { fetchCitiesFromState, fetchStates } from '../../../actions/location';

import {
  Button,
  Divider,
  Form,
  Fields,
  Field,
  Header,
  Label,
  TextField
} from '../../../components/UI';

import DropdownMenu from '../../../components/DropdownMenu';

class InsertAgency extends Component {

  constructor(props) {
    super(props);
    this.state = {
      reset: false,
    };
    
    this.onUpdateState = this.onUpdateState.bind(this);
    
    this.onInsert = this.onInsert.bind(this);
    this.onClear = this.onClear.bind(this);
  }

  componentDidMount() {
    const { states, fetchStates } = this.props;
    if(states && states.length === 0) {
      fetchStates({ order: 'nome ASC' });
    }
  }
  
  onUpdateState(state) {
    const { id } = state;
    const { fetchCitiesFromState } = this.props;
    fetchCitiesFromState(id);
  }

  onInsert(event) {
    event.preventDefault();
  }

  onClear(event) {
    const { reset } = this.state;
    this.setState({
      reset: !reset
    });

    this.props.onClear();
  }
  
  render() {

    const {
      reset
    } = this.state;
    
    const {
      isFetchingStates,
      isFetchingCitiesFromState,
      citiesFromState,
      states,

      onUpdateCity,
      onUpdateInitials,
      onUpdateName,
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
      <div className="tnm-main-content">

        <Header text="Novo Órgão"/>

        <Divider />
        
        <Form key={reset} onSubmit={this.onInsert}>
          <Fields num="two">
            <Field>
              <Label text="Sigla" />
              <TextField className="dark"
                         onChange={({ target }) => { onUpdateInitials(target.value.trim()) }}
              />
            </Field>
            <Field className="agency-name">
              <Label text="Nome" />
              <TextField className="dark"
                         onChange={({ target }) => { onUpdateName(target.value.trim()) }}
              />
            </Field>
          </Fields>

          <Fields num="two">
            <Field>
              <Label text="Estado" />
              <DropdownMenu items={stateList}
                            placeholder="Selecione um estado"
                            isLoading={isFetchingStates}
                            onChange={this.onUpdateState}
              />
            </Field>
            
            <Field>
              <Label text="Cidade" />
              <DropdownMenu items={cityList}
                            placeholder="Selecione uma cidade"
                            isLoading={isFetchingCitiesFromState}
                            onChange={(city) => { onUpdateCity(city) }}
              />
            </Field>
          </Fields>

          <Fields>
            <Button text="Confirmar"
                    type="dark"
                    buttonType="submit"
            />
            <Button text="Limpar"
                    type="dark"
                    onClick={this.onClear}
                    
            />
          </Fields>
          
        </Form>

      </div>
    );
  }
}

const mapStateToProps = (reduxState) => {
  const { agency, location } = reduxState;

  const {
    state,
    citiesFromState,
    isFetchingCitiesFromState,
  } = location;
  
  return {
    ...agency.insert,
    citiesFromState,
    states: state.list,
    isFetchingStates: state.isFetching,
    isFetchingCitiesFromState
  }
}

const mapDispatchToProps = (dispatch) => {

  const {
    onClear,
    onUpdateCity,
    onUpdateInitials,
    onUpdateName
  } = agencyActions;
  
  const actions = {
    fetchStates,
    fetchCitiesFromState,
    onClear,
    onUpdateName,
    onUpdateInitials,
    onUpdateCity
  };

  return bindActionCreators(actions, dispatch);
}

InsertAgency = connect(mapStateToProps, mapDispatchToProps)(InsertAgency);

export default InsertAgency;