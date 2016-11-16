import React, { Component } from 'react';
import _ from 'lodash';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import * as DOMUtils from '../../../utils/DOMUtils';
import * as segmentActions from '../../../actions/segment';

import {
  Button,
  Divider,
  Form,
  Field,
  Fields,
  Header,
  Label,
  Loader,
  TextField,
  Message,
} from '../../../components/UI'; 

class EditSegment extends Component {

  constructor(props) {
    super(props);
    this.onCancel = this.onCancel.bind(this);
  }
  
  componentDidMount() {
    const { segment, fetchSegmentById } = this.props;
    if(!_.isEmpty(segment.original)) {
      this.fillFields(segment.original);
    }
    else {
      const { segmentId } = this.props.params;
      if(segmentId) {
        fetchSegmentById(segmentId);
      }
      else {
        this.props.router.push('/forms/segment');
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const prev = this.props.segment.original;
    const next = nextProps.segment.original;
    if(_.isEmpty(prev) && !_.isEmpty(next)) {
      setTimeout(() => {
        this.fillFields(next);
      }, 0);
    }
  }

  onSave(isSaveAndGoBack) {

    
    
    if(isSaveAndGoBack)
      this.onCancel();
  }

  onCancel() {
    const { router } = this.props;
    if(router) {
      router.push('/forms/segment');
    }
  }

  fillFields(segment) {
    const textField = this.getNameField();
    if(textField) {
      textField.value = segment.descricao;
      textField.focus();
    }
  }

  findSegment() {
    const { segments } = this.props;
    const { segmentId } = this.props.params;

    const index = _.findIndex(segments, (cat) => {
      return cat.id === segmentId;
    });

    if(index >= 0) {
      return segments[index];
    }

    return null;
  }

  getNameField() {
    return document.getElementById('editSegmentNameField');
  }

  renderForm() {

    const {
      segment,
      segments,
      onUpdateEditName
    } = this.props;

    const cat = this.findSegment();
    
    return (
      <div>
        <Header text={"Editando " + (cat ? cat.descricao : segment.original.descricao) }/>
        <Divider />
        <Form>

          <Field>
            <Label text="Nome do segmento"/>
            <TextField id="editSegmentNameField"
                       className="dark"
                       onChange={({ target }) => { onUpdateEditName(target.value.trim()) }}/>
          </Field>

          <Fields centered>
            <Button text="Salvar"
                    type="dark"
                    onClick={this.onSave.bind(this, false)}
            />

            <Button text="Salvar e voltar"
                    type="dark"
                    onClick={this.onSave.bind(this, true)}
            />
            <Button text="Cancelar"
                    type="dark"
                    onClick={this.onCancel}
            />
          </Fields>
          
        </Form>
      </div>
    );
  }
  
  render() {

    const {
      segment,
    } = this.props;
    
    return (
      <div className="tnm-main-content">

        { _.isEmpty(segment.original) ? <Loader /> : this.renderForm() }
      </div>          
    );
  }
}

const mapStateToProps = (state) => {
  const { segment } = state;
  return {
    ...segment.edit,
    segments: segment.segments,
  }
}

const mapDispatchToProps = (dispatch) => {
  const {
    fetchSegmentById,
    onUpdateEditName,
  } = segmentActions;

  return bindActionCreators({
    fetchSegmentById,
    onUpdateEditName
  }, dispatch);
}

EditSegment = connect(mapStateToProps, mapDispatchToProps)(EditSegment);

export default withRouter(EditSegment);