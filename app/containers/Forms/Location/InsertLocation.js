import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as DOMUtils from '../../../utils/DOMUtils';
import * as locationActions from '../../../actions/location';

import {
  Button,
  Divider,
  Form,
  Field,
  Fields,
  Header,
  Label,
  Message,
  TextField
} from '../../../components/UI';

import DropdownMenu from '../../../components/DropdownMenu';

class InsertLocation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      reset: false,
    };
    this.onUpdateCity = this.onUpdateCity.bind(this);
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

  onInsert(event) {
    event.preventDefault();
    
    const {
      city,
      state,
      insertLocation
    } = this.props;

    if(city.trim() && state) {
      const location = {
        city: city.trim(),
        state: state,
      };
      //insertLocation(location);
    }
    else {
      
    }    
  }

  onClear(event) {
    event.preventDefault();
    const { reset } = this.state;
    this.setState({
      reset: !reset,
    });
  }

  onUpdateCity(event) {
    const {
      city,
      state
    } = this.props;

    let location = {
      city: event.target.value.trim(),
      state,
    };

    this.props.onUpdateInsertLocation(location);
  }

  onUpdateState(newState) {
    const {
      city,
      state
    } = this.props;

    let location = {
      city,
      state: newState.id
    };

    this.props.onUpdateInsertLocation(location);
  }
  
  render() {

    const {
      states,
      isFetchingStates,
      citiesFromState,
      isInserting,
      
      onUpdateInsertLocation,
    } = this.props;

    const stateList = _.map(states, (state, i) => {
      return {
        id: state.id,
        text: state.nome,
      }
    });    
    
    return (
      <div className="tnm-main-content">
        <Header text="Novo Local"/>
        <Divider className="section" />
        <Form key={this.state.reset} onSubmit={this.onInsert}>
          <Fields num="two">
            <Field>
              <Label text="Cidade"/>
              <TextField id="insertLocationCityField"
                         className="dark"
                         onChange={this.onUpdateCity}/>
            </Field>

            <Field>
              <Label text="Estado"/>
              <DropdownMenu items={stateList}
                            placeholder="Selecione um estado"
                            isLoading={isFetchingStates}
                            onChange={this.onUpdateState}/>
            </Field>
          </Fields>
          
          <Fields num="two">
            
            <Button text="Confirmar"
                    type="dark"
                    buttonType="submit"
                    disabled={isInserting}
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
  const { location } = reduxState;

  const { state } = location;
  
  return {
    states: state.list,
    isFetchingStates: state.isFetching,
    ...location.insert,
  }
}

const mapDispatchToProps = (dispatch) => {

  const {
    fetchStates,
    onUpdateInsertLocation,
  } = locationActions;

  const actions = {
    fetchStates,
    onUpdateInsertLocation
  }
  
  return bindActionCreators(actions, dispatch);
}

InsertLocation = connect(mapStateToProps, mapDispatchToProps)(InsertLocation);

export default InsertLocation;