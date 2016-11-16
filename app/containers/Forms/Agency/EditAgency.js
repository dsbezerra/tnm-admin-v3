import React, { Component } from 'react';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import * as agencyActions from '../../../actions/agency';
import { fetchCitiesFromState, fetchStates } from '../../../actions/location';

import {
  Button,
  CircularLoader,
  Divider,
  Form,
  Fields,
  Field,
  Header,
  Label,
  TextField
} from '../../../components/UI';

import DropdownMenu from '../../../components/DropdownMenu';

class EditAgency extends Component {

  constructor(props) {
    super(props);

    this.onUpdateState = this.onUpdateState.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  componentDidMount() {
    const { agency, states, fetchStates, fetchAgencyById } = this.props;
    if(states && states.length === 0) {
      fetchStates({ order: 'nome ASC' });
    }
    
    if(!_.isEmpty(agency.original)) {
      this.updateFields(agency.original);
    }
    else {
      // If is a direct access, fetch single agency then fill dom inputs
      const { agencyId } = this.props.params;
      if(agencyId) {
        fetchAgencyById(agencyId, {
          include: {
            relation: 'cidades',
            scope: {
              include: {
                relation: 'estados'
              }
            }
          }
        });
      }
      else {
        this.props.router.push('/forms/agency');
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const { fetchCitiesFromState } = this.props;
    const prev = this.props.agency.original;
    const next = nextProps.agency.original;
    if(_.isEmpty(prev) && !_.isEmpty(next)) {
      // If we now have an agency to be edited
      setTimeout(() => {
        this.updateFields(next);
        fetchCitiesFromState(next.cidades.estados.id);
      });
    }
  }

  onSave(isSaveAndGoBack) {

    
    
    if(isSaveAndGoBack)
      this.onCancel();
  }

  onCancel() {
    const { router } = this.props;
    if(router) {
      router.push('/forms/agency');
    }
  }

  updateFields(agency) {
    let name = document.getElementById('editAgencyNameField');
    let initials = document.getElementById('editAgencyInitialsField');
    if(name && initials && agency) {
      name.value = agency.nome;
      initials.value = agency.sigla.toUpperCase();
    }
  }

  onUpdateState(state) {
    const { fetchCitiesFromState } = this.props;
    if(fetchCitiesFromState && state) {
      fetchCitiesFromState(state.id);
    }
  }

  findAgency() {
    const { agencies } = this.props;
    const { agencyId } = this.props.params;

    const index = _.findIndex(agencies, (agency) => {
      return agency.id === agencyId;
    });

    if(index >= 0) {
      return agencies[index];
    }

    return null;
  }

  renderForm() {
    const {
      agency,
      agencies,

      isFetchingStates,
      isFetchingCitiesFromState,
      citiesFromState,
      states,

      onEditUpdateInitials,
      onEditUpdateName,
      onEditUpdateCity
    } = this.props;

    const ag = this.findAgency();

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
    
    const city = ag ? ag.cidades : agency.original.cidades;
    const state = city ? city.estados : null;

    return (
      <div>
        <Header text={"Editando " + (ag ? ag.nome : agency.original.nome)} />
        
        <Form>

          <Fields num="two">
            <Field>
              <Label text="Estado" />
              <DropdownMenu items={stateList}
                            placeholder={(state ? state.nome : 'Selecione um estado')}
                            isLoading={isFetchingStates}
                            onChange={this.onUpdateState}
              />
            </Field>
            
            <Field>
              <Label text="Cidade" />
              <DropdownMenu items={cityList}
                            placeholder={(city ? city.nome : 'Selecione uma cidade')}
                            isLoading={isFetchingCitiesFromState}
                            onChange={(city) => { onEditUpdateCity(city) }}
              />
            </Field>
          </Fields>

          <Fields num="two">
            <Field>
              <Label text="Sigla do órgão" />
              <TextField id="editAgencyInitialsField"
                         className="dark"
                         onChange={({ target }) => { onEditUpdateInitials(target.value.trim()) }}
              />
            </Field>
            <Field className="agency-name">
              <Label text="Nome do órgão" />
              <TextField id="editAgencyNameField"
                         className="dark"
                         onChange={({ target }) => { onEditUpdateName(target.value.trim()) }}
              />
            </Field>
          </Fields>
          
          <Fields>
            <Field style={{ width: '100%' }}>

              <Button text="Salvar"
                      type="primary"
                      onClick={this.onSave.bind(this, false)}
              />

              <Button text="Salvar e voltar"
                      type="primary"
                      onClick={this.onSave.bind(this, true)}
              />
              <Button text="Cancelar"
                      onClick={this.onCancel}
              />
              
            </Field>
          </Fields>
          
        </Form>
      </div>
    );
  }

  render() {
    const {
      agency,
    } = this.props;

    return (
      <div className="tnm-main-content">
        {
          _.isEmpty(agency.original) ?
          <CircularLoader size="small" /> : this.renderForm()
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { agency, location } = state;

  const {
    citiesFromState,
    states,
    isFetchingStates,
    isFetchingCitiesFromState,
  } = location;
  
  return {
    ...agency.edit,
    agencies: agency.agencies,
    citiesFromState,
    states,
    isFetchingStates,
    isFetchingCitiesFromState
  }
}

const mapDispatchToProps = (dispatch) => {
  const {
    fetchAgencyById,
    onEditUpdateInitials,
    onEditUpdateName,
    onEditUpdateCity
  } = agencyActions;

  return bindActionCreators({
    fetchAgencyById,
    fetchStates,
    fetchCitiesFromState,
    onEditUpdateCity,
    onEditUpdateName,
    onEditUpdateInitials,
  }, dispatch);
}

EditAgency = connect(mapStateToProps, mapDispatchToProps)(EditAgency);

export default withRouter(EditAgency);