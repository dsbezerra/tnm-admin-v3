import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import VelocityComponent from 'velocity-react/velocity-component';

import { ModalityOptions } from '../../../data/notice';
import * as noticeActions from '../../../actions/notice';

import ActionList from '../../../components/ActionList';
import AgencyResultItem from '../../../components/Agency/AgencyResultItem';
import DropdownMenu from '../../../components/DropdownMenu';
import TabLayout from '../../../components/TabLayout';

import { fetchSegments } from '../../../actions/segment';

import {
  Button,
  CheckBox,
  Divider,
  Form,
  Field,
  Fields,
  Header,
  Label,
  Message,
  TextArea,
  TextField,
  Select,
  SearchableTextField,
} from '../../../components/UI';

class InsertNotice extends Component {

  constructor(props) {
    super(props);

    this.state = {
      reset: false,
    }

    this.onInsertConfirm = this.onInsertConfirm.bind(this);
    this.onInsert = this.onInsert.bind(this);
    this.onClear = this.onClear.bind(this);

    this.onUpdateAgencySearch = this.onUpdateAgencySearch.bind(this);
    this.onUpdateAgency = this.onUpdateAgency.bind(this);
  }

  componentDidMount() {
    const { segments, fetchSegments } = this.props;
    if(segments && segments.length === 0) {
      fetchSegments({ order: 'descricao ASC' });
    }
  }

  onInsert(event) {
    event.preventDefault();

    alert('Show modal with confirm options');
  }

  onInsertConfirm() {}

  onClear() {
    const { reset } = this.state;
    this.setState({
      reset: !reset,
    });
  }

  onExclusiveClick() {

  }

  onUpdateAgency(agency) {
    console.log(agency);
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
  
  render() {

    const {
      segments,
      agencies,
      isSearchingAgencies,
      isFetchingSegments,
      isInserting,
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
      <div className="tnm-main-content">
        <Header text="Nova Licitação" />
        <Divider />
        <Form key={this.state.reset} onSubmit={this.onInsert}>
          <Field>
            <Label text="Modalidade" />
            <Select className="dark" options={ModalityOptions} />
          </Field>

          <Field>
            <Label text="Órgão" />
            <SearchableTextField className="dark"
                                 isLoading={isSearchingAgencies}
                                 onItemClick={this.onUpdateAgency}
                                 onChange={this.onUpdateAgencySearch}
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
              />
            </Field>
            
            <Field>
              <Label text="Número" />
              <TextField id="insertNoticeNumberField"
                         placeholder="Ex: 667/2016"
                         className="dark" />
            </Field>
            

            <Field>
              <Label text="Data de Realização" />
              <TextField id="insertNoticeDateField"
                         placeholder="Ex: 15/11/2016"
                         className="dark" />
            </Field>
            
            <Field>
              <Label text="Valor Estimado" />
              <TextField id="insertNoticeAmountField"
                         placeholder="Ex: 1000"
                         className="dark" />
            </Field>
          </Fields>

          <Field>
            <Label text="Objeto" />
            <TextArea id="insertNoticeObjectField"
                      placeholder="Ex: AQUISIÇÃO DE EMPRESA ESPECIALIZADA EM BLÁ BLÁ BLÁ"
                      className="dark" />
          </Field>

          <Field>
            <CheckBox text="Exclusivo MPE"
                      onClick={this.onExclusiveClick} />
          </Field>

          <Field>
            <Label text="Link" />
            <TextField id="insertNoticeLinkField"
                       placeholder="Ex: http://site-do-orgao.com/edital.pdf"
                       className="dark" />
          </Field>


          <Fields centered>
            <Field>
              <Button buttonType="submit"
                      type="dark"
                      text="Inserir"
              />
            </Field>
            <Field>
              <Button type="dark"
                      text="Limpar"
                      onClick={this.onClear}
              />
            </Field>
          </Fields>
          
          
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { notice, segment } = state;

  return {
    ...notice.insert,
    segments: segment.list,
    isFetchingSegments: segment.isFetching,
  }
}

const mapDispatchToProps = (dispatch) => {

  const {
    clearSearchAgencies,
    searchAgencies,
  } = noticeActions;
  
  const actions = {
    fetchSegments,
    searchAgencies,
    clearSearchAgencies
  };

  return bindActionCreators(actions, dispatch);
}

InsertNotice = connect(mapStateToProps, mapDispatchToProps)(InsertNotice);

export default InsertNotice;