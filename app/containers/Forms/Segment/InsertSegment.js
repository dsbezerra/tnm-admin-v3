import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as DOMUtils from '../../../utils/DOMUtils';
import { showModalWithComponent, closeModal } from '../../../actions/modal';
import * as segmentActions from '../../../actions/segment';

import {
  Button,
  Divider,
  Form,
  Field,
  Fields,
  Header,
  Label,
  TextField,
  Message,
} from '../../../components/UI'; 


import ConfirmationModal from '../../../components/Modal/ConfirmationModal';

class InsertSegment extends Component {

  constructor(props) {
    super(props);

    this.onInsertConfirm = this.onInsertConfirm.bind(this);
    this.onInsert = this.onInsert.bind(this);
    this.onClear = this.onClear.bind(this);
  }
  
  componentDidMount() {
    this.updateFormFieldsIfNeeded();
  }

  componentWillReceiveProps(nextProps) {    
    if(!nextProps.name) 
      this.resetFormFields();
  }

  onInsert(event) {
    event.preventDefault();
    const { name } = this.props;

    if(!name.trim()) {
      // TODO(diego): Validation errors
      return;
    }
    
    const { showModalWithComponent, closeModal } = this.props;
    showModalWithComponent(
      <ConfirmationModal title="Confirmação de Inserção"
                         onConfirm={this.onInsertConfirm}
                         onCancel={closeModal}
      >
        <p>
          O segmento <span className="highlight white">{name}</span> será inserido no banco de dados.
        </p>
        <br/>
        <p>
          Tem certeza de que quer continuar?
        </p>
      </ConfirmationModal>
    );
  }

  onInsertConfirm() {
    const { name } = this.props;
    if(name) {
      const { insertSegment } = this.props;
      insertSegment({ name: name });
    }
    else {
      // Send message input empty
    }
  }

  onClear(event) {
    event.preventDefault();
    this.resetFormFields();
  }

  updateFormFieldsIfNeeded(props) {
    const { name } = props || this.props;
    const textField = this.getNameField();
    if(name && textField) {
      textField.value = name;
    }
    else if(textField) {
      textField.focus();
    }
  }

  resetFormFields() {
    const { onUpdateInsertName } = this.props;
    const field = this.getNameField();
    if(field) {
      field.value = '';
      onUpdateInsertName('');
    }
  }

  getNameField() {
    const element = DOMUtils.getElementById('insertSegmentNameField');
    return element;
  }

  render() {

    const {
      isInserting,
      onUpdateInsertName
    } = this.props;
    
    return (
      <div className="tnm-main-content">
        <Header text="Novo Segmento"/>
        <Divider />
        <Form onSubmit={this.onInsert}>
          <Field>
            <Label text="Segmento"/>
            <TextField id="insertSegmentNameField"
                       className="dark"
                       onChange={({ target }) => { onUpdateInsertName(target.value.trim()) }}/>
          </Field>

          <Fields centered>
            <Button text="Inserir"
                    disabled={isInserting}
                    type="dark"
                    onClick={this.onInsert}
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

const mapStateToProps = (state) => {
  const { segment } = state;
  return segment.insert;
}

const mapDispatchToProps = (dispatch) => {
  const {
    insertSegment,
    onUpdateInsertName
  } = segmentActions;

  const actions = {
    insertSegment,
    showModalWithComponent,
    closeModal,
    onUpdateInsertName,
  };
  
  return bindActionCreators(actions, dispatch);
}

InsertSegment = connect(mapStateToProps, mapDispatchToProps)(InsertSegment);

export default InsertSegment;