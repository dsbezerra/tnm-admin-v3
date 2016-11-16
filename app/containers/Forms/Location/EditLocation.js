import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import * as locationActions from '../../../actions/location';

import {
  Button,
  Form,
  Field,
  Fields,
  Header,
  Label,
  Loader,
  TextField,
  Message,
} from '../../../components/UI';

import DropdownMenu from '../../../components/DropdownMenu';

class EditLocation extends Component {

  constructor(props) {
    super(props);

    this.onSave = this.onSave.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }


  onSave(isSaveAndGoBack) {

    if(isSaveAndGoBack)
      this.onCancel();
  }
  
  onCancel() {
    const { router } = this.props;
    if(router) {
      router.push('/forms/location');
    }
  }

  render() {

    const {
      onUpdateEditCity,
      onUpdateEditState
    } = this.props;
    
    return (
      <div>
        <Header text="Editando " />

        <Form>

          <Fields num="two">
            <Field>
              <Label text="Cidade" />
              <TextField id="editCityNameField"
                         className="dark"
                         onChange={({ target }) => { onUpdateEditCity(target.value.trim()) }}
              />
            </Field>

            <Field>
              <Label text="Estado" />
              <DropdownMenu />
            </Field>
          </Fields>

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
        </Form>
        
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { location } = state;
  return {
    ...location.edit,
    cities: location.cities,
    states: location.states,
  }
}

const mapDispatchToProps = (dispatch) => {
  const {
    fetchAgencyById,
    onUpdateEditCity,
    onUpdateEditState,
  } = agencyActions;
  
  return bindActionCreators({
    fetchAgencyById,
    onUpdateEditName,
    onUpdateEditInitials,
  }, dispatch);
}

EditLocation = connect(mapStateToProps, mapDispatchToProps)(EditLocation);

export default EditLocation;