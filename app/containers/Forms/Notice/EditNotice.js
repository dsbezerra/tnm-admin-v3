import React, { Component } from 'react';
import _ from 'lodash';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import * as noticeActions from '../../../actions/notice';
import { fetchSegments } from '../../../actions/segment';

import {
  formatDate,
  getModalityName
} from '../../../utils/NoticeUtils';

import { ModalityOptions } from '../../../data/notice';

import AgencyResultItem from '../../../components/Agency/AgencyResultItem';
import DropdownMenu from '../../../components/DropdownMenu';

import {
  Button,
  CheckBox,
  Divider,
  Form,
  Field,
  Fields,
  Header,
  Label,
  Loader,
  Message,
  TextArea,
  TextField,
  Select,
  SearchableTextField,
} from '../../../components/UI';

class EditNotice extends Component {

  constructor(props) {
    super(props);
    this.onCancel = this.onCancel.bind(this);
    this.onUpdateAgencySearch = this.onUpdateAgencySearch.bind(this);
  }

  componentDidMount() {
    const {
      notice,
      segments,
      fetchNoticeById,
      fetchSegments
    } = this.props;

    if(segments && segments.length === 0) {
      fetchSegments({ order: 'descricao ASC' });
    }
    
    if(!_.isEmpty(notice.original)) {
      // Fill form fields
      this.fillFields(notice.original);
    }
    else {
      const { noticeId } = this.props.params;
      if(noticeId) {
        fetchNoticeById(noticeId, {
          include: ['segmentos', 'orgaos']
        });
      }
      else {
        this.props.router.push('/forms/notice');
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const prev = this.props.notice.original;
    const next = nextProps.notice.original;
    if(_.isEmpty(prev) && !_.isEmpty(next)) {
      setTimeout(() => {
        this.fillFields(next);
      }, 0);
    }
  }

  fillFields(notice) {
    const nodes = this.getFormNodes();
    if(nodes) {
      nodes.agency.value = notice.orgaos.nome;
      nodes.number.value = notice.numero;
      nodes.date.value = formatDate(notice.data);
      nodes.amount.value = notice.valor;
      nodes.object.value = notice.objeto;
    }
  }

  getFormNodes() {
    const agency = document.getElementById('editNoticeAgencyField');
    const number = document.getElementById('editNoticeNumberField');
    const date = document.getElementById('editNoticeDateField');
    const amount = document.getElementById('editNoticeAmountField');
    const object = document.getElementById('editNoticeObjectField');

    return ({
      agency,
      number,
      date,
      amount,
      object
    });
  }
  
  onSave(isSaveAndGoBack) {

    
    
    if(isSaveAndGoBack)
      this.onCancel();
  }

  onCancel() {
    const { router } = this.props;
    if(router) {
      router.push('/forms/notice');
    }
  }

  onUpdateAgencySearch(event) {    
    const { target }  = event;
    const size = target.value.length;
    if(size >= 2) {
      const filter = {
        where: {
          sigla: {
            regexp: '^' + target.value.toLowerCase()
          }
        },
        include: {
          relation: 'cidades',
          scope: {
            include: {
              relation: 'estados'
            }
          }
        }
      };
      
      this.props.searchAgencies(filter);
    }
    else {
      this.props.clearSearchAgencies();
    }
    
  }

  renderForm() {

    const {
      agencies,
      notice,
      notices,
      segments,
      isFetchingSegments,
      isSearchingAgencies,
    } = this.props;

    const segmentList = _.map(segments, (segment, i) => {
      return {
        id: segment.id,
        text: segment.descricao,
      }
    });

    const agencyList = _.map(agencies, (agency, i) => {
      return <AgencyResultItem
                 key={agency.id}
                 item={agency}
                 value={agency.nome}
             />
    });
    
    return (
      <div>
        <Header text={"Editando " + (getModalityName(notice.original.modalidade) + ' - ' + notice.original.numero)} />
        <Divider />

        <Form>
          <Field>
            <Label text="Modalidade" />
            <Select className="dark"
                    options={ModalityOptions}
                    active={notice.edited ? notice.edited.modalidade : null}
            />
          </Field>

          <Field>
            <Label text="Órgão" />
            <SearchableTextField id="editNoticeAgencyField"
                                 className="dark"
                                 onChange={this.onUpdateAgencySearch}
                                 isLoading={isSearchingAgencies}                     
            >
              {agencyList}
            </SearchableTextField>
          </Field>

          <Fields>
            <Field>
              <Label text="Segmento" />
              <DropdownMenu items={segmentList}
                            placeholder="Selecione um segmento"
                            isLoading={isFetchingSegments}
                            selected={notice.edited ? notice.edited.segmentos.descricao : null}
                            
              />
            </Field>
            
            <Field>
              <Label text="Número" />
              <TextField id="editNoticeNumberField"
                         placeholder="Ex: 667/2016"
                         className="dark" />
            </Field>
            

            <Field>
              <Label text="Data de Realização" />
              <TextField id="editNoticeDateField"
                         placeholder="Ex: 15/11/2016"
                         className="dark" />
            </Field>
            
            <Field>
              <Label text="Valor Estimado" />
              <TextField id="editNoticeAmountField"
                         placeholder="Ex: 1000"
                         className="dark" />
            </Field>
          </Fields>

          <Field>
            <Label text="Objeto" />
            <TextArea id="editNoticeObjectField"
                      placeholder="Ex: AQUISIÇÃO DE EMPRESA ESPECIALIZADA EM BLÁ BLÁ BLÁ"
                      className="dark" />
          </Field>

          <Field>
            <CheckBox text="Exclusivo MPE"
                      checked={notice.edited ? notice.edited.exclusivo : null}
                       />
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
      notice
    } = this.props;

    return (
      <div className="tnm-main-content">
        {_.isEmpty(notice.original) ? <Loader /> : this.renderForm()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { notice, segment } = state;
  return {
    ...notice.edit,
    notices: notice.list,
    segments: segment.list,
    isFetchingSegments: segment.isFetching,
    isSearchingAgencies: notice.insert.isSearchingAgencies,
    agencies: notice.insert.agencies,
  }
}

const mapDispatchToProps = (dispatch) => {
  const {
    fetchNoticeById,
    clearSearchAgencies,
    searchAgencies,
  } = noticeActions;

  const actions = {
    fetchNoticeById,
    fetchSegments,
    clearSearchAgencies,
    searchAgencies,
  };
  
  return bindActionCreators(actions, dispatch);
}

EditNotice = connect(mapStateToProps, mapDispatchToProps)(EditNotice);

export default withRouter(EditNotice);