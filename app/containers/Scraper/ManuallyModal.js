import React, { Component } from 'react';
import VelocityComponent from 'velocity-react/velocity-component';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { ModalityOptions } from '../../data/notice';
import {
  formatDate,
} from '../../utils/NoticeUtils';

import { fetchSegments } from '../../actions/segment';

import DropdownMenu from '../../components/DropdownMenu';
import Modal from '../../components/Modal';

import {
  CheckBox,
  Label,
  Form,
  Field,
  Fields,
  TextArea,
  TextField,
  SearchableTextField,
  Select,
} from '../../components/UI';

import { slideDownFadeIn } from '../../animations';

//
// TODO(diego):
// - Implement segment section like in scraper
// - Implement agency section like in scraper
// - 
class ManuallyModal extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {
      result,
      segments,

      fetchSegments,
    } = this.props;
    
    if(result) {
      const nodes = this.getFormNodes();
      if(nodes) {
        const {
          number,
          openDate,
          amount,
          object,
          link,
        } = nodes;

        number.value = result.number;
        openDate.value = formatDate(result.openDate);
        amount.value = result.amount,
        object.value = result.description;
        link.value = result.processed ? result.processed.uri : result.download.uri;
      }
    }

    if(segments && segments.length === 0 && fetchSegments) {
      fetchSegments({
        order: 'descricao ASC',
      })
    }
  }

  getFormNodes() {
    const nodes = {
      number: this.getNode('manualInsertNumberField'),
      openDate: this.getNode('manualInsertDateField'),
      amount: this.getNode('manualInsertAmountField'),
      object: this.getNode('manualInsertObjectField'),
      link: this.getNode('manualInsertLinkField'),
    };

    return nodes;
  }

  getNode(selector) {
    return document.getElementById(selector);
  }

  mapSegments(segment, index) {
    return {
      id: segment.id,
      text: segment.descricao,
    };
  }

  renderForm() {
    const {
      result,
      segments
    } = this.props;

    return (
      <Form>
        <Field>
          <Label text="Modalidade" />
          <Select className="dark"
                  options={ModalityOptions}
                  active={result.modality >= 0 ? result.modality : null}
          />
        </Field>

        <Field>
          <Label text="Órgão" />
        </Field>

        <Fields>
          <Field>
            <Label text="Segmento" />
            <DropdownMenu items={_.map(segments, this.mapSegments)}
                          placeholder="Selecione um segmento"
                          selected={result.segment ? result.segment.name : null}
            />
          </Field>
          
          <Field>
            <Label text="Número" />
            <TextField id="manualInsertNumberField"
                       placeholder="Ex: 667/2016"
                       className="dark" />
          </Field>
        </Fields>

        <Fields>
          <Field>
            <Label text="Data de Realização" />
            <TextField id="manualInsertDateField"
                       placeholder="Ex: 29/11/2016"
                       className="dark" />
          </Field>
          
          <Field>
            <Label text="Valor Estimado" />
            <TextField id="manualInsertAmountField"
                       placeholder="Ex: 1000"
                       className="dark" />
          </Field>
        </Fields>
        
        <Field>
          <Label text="Objeto" />
          <TextArea id="manualInsertObjectField"
                    placeholder="Ex: AQUISIÇÃO DE EMPRESA ESPECIALIZADA EM BLÁ BLÁ BLÁ"
                    className="dark" />
        </Field>

        <Field>
          <CheckBox text="Exclusivo MPE"
                    checked={result.exclusive}
                    onClick={null} />
        </Field>

        <Field>
          <Label text="Link" />
          <TextField id="manualInsertLinkField"
                     placeholder="Ex: http://site-do-orgao.com/edital.pdf"
                     className="dark" />
        </Field>
      </Form>
    );
  }

  render() {
    const {
      title,

      onConfirm,
      onCancel,
    } = this.props;
    
    const buttons = [
      {
        text: this.props.confirmText || 'Inserir',
        onClick: onConfirm ? onConfirm : null
      },
      {
        text: this.props.cancelText || 'Cancelar',
        onClick: onCancel ? onCancel : null 
      },
    ];
    
    return (
      <VelocityComponent component="div"
                         {...slideDownFadeIn}
                         duration={300}
                         easing="ease-out"
                         runOnMount>
        <Modal className="tnm-results-manualModal"
               title="Nova Licitação"
               buttons={buttons}>
          {this.renderForm()}
        </Modal>
      </VelocityComponent>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    segments: state.segment.list,
  }
}

const mapDispatchToProps = (dispatch) => {
  const actions = {
    fetchSegments,
  };

  return bindActionCreators(actions, dispatch);
}

ManuallyModal = connect(mapStateToProps, mapDispatchToProps)(ManuallyModal);

export default ManuallyModal;